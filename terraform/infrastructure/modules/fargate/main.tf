# create ecs cluster
resource "aws_ecs_cluster" "main" {
  name = "systembench-cluster"
}

# alb security group
resource "aws_security_group" "alb" {
  name   = "alb-sg"
  vpc_id = var.vpc_id

  # incoming
  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outgoing
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# fargate security group
resource "aws_security_group" "fargate" {
  name   = "fargate-sg"
  vpc_id = var.vpc_id

  # incoming allow 8080
  ingress {
    from_port = 8080
    to_port   = 8080
    protocol  = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  # outgoing
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# alb
resource "aws_lb" "main" {
  name               = "systembench-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.alb.id]
  subnets            = var.public_subnet_ids
}

# what alb should target
resource "aws_lb_target_group" "main" {
  name        = "systembench-tg"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  # check spring boot health endpoint
  health_check {
    path                = "/api/v1/actuator/health"
    healthy_threshold   = 2
    unhealthy_threshold = 10
  }
}

# alb listener
resource "aws_lb_listener" "main" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
}

# create cloudwatch log group that ecs will log to
resource "aws_cloudwatch_log_group" "systembench_logs" {
  name              = "/ecs/systembench"
  retention_in_days = 30
}

# ecs task definition
resource "aws_ecs_task_definition" "main" {
  family             = "systembench"
  network_mode       = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                = 256
  memory             = 512
  execution_role_arn = var.ecs_task_execution_role_arn
  task_role_arn = var.ecs_task_role_arn

  container_definitions = jsonencode([
    {
      name  = "systembench"
      image = "${var.ecr_repository_url}:latest"
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/systembench"
          "awslogs-region"        = "eu-west-2"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

# ecs service
resource "aws_ecs_service" "main" {
  name            = "systembench-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets = var.private_subnet_ids
    security_groups = [aws_security_group.fargate.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = "systembench"
    container_port   = 8080
  }

  # auto scaling
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
}

# auto scaling
resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = 3
  min_capacity       = 1
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.main.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "ecs_policy" {
  name               = "cpu-auto-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value       = 70
    scale_in_cooldown  = 300
    scale_out_cooldown = 300

    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}