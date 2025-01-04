###########################################
# VPC and Networking
###########################################

# create a vpc (virtual private cloud) - this is our isolated network in aws
resource "aws_vpc" "main_vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_hostnames = true  # allow dns hostnames in vpc
  enable_dns_support = true  # enable dns support in vpc

  tags = {
    Name = "main-vpc"
  }
}

# create public subnets - these can access internet directly
# we create one in each availability zone for redundancy
resource "aws_subnet" "public_subnets" {
  count = length(var.azs) # e.g. = 3
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = var.public_subnets[count.index]
  availability_zone = var.azs[count.index]

  map_public_ip_on_launch = true  # automatically assign public ips to resources in these subnets

  tags = {
    Name = "public-subnet-${count.index + 1}"
  }
}

# create private subnets - these can't be accessed from internet directly
# we create one in each availability zone for redundancy
resource "aws_subnet" "private_subnets" {
  count = length(var.azs)
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = var.azs[count.index]

  tags = {
    Name = "private-subnet-${count.index + 1}"
  }
}

# create internet gateway - this allows our public subnets to access internet
resource "aws_internet_gateway" "main_igw" {
  vpc_id = aws_vpc.main_vpc.id

  tags = {
    Name = "main-igw"
  }
}

# create elastic ip - this is needed for nat gateway
resource "aws_eip" "main_nat" {
  domain = "vpc"
}

# create nat gateway - this lets private subnets access internet (but not other way around)
resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.main_nat.id
  subnet_id = aws_subnet.public_subnets[0].id  # put nat gateway in first public subnet

  tags = {
    Name = "main-nat"
  }
}

# create public route table - this defines routing rules for public subnets
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main_vpc.id

  route {
    cidr_block = "0.0.0.0/0"  # send all internet traffic
    gateway_id = aws_internet_gateway.main_igw.id  # through the internet gateway
  }

  tags = {
    Name = "public-rt"
  }
}

# create private route table - this defines routing rules for private subnets
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main_vpc.id

  route {
    cidr_block = "0.0.0.0/0"  # send all internet traffic
    nat_gateway_id = aws_nat_gateway.main.id  # through the nat gateway
  }

  tags = {
    Name = "private-rt"
  }
}

# associate public subnets with public route table
resource "aws_route_table_association" "public" {
  count = length(var.azs)
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

# associate private subnets with private route table
resource "aws_route_table_association" "private" {
  count = length(var.azs)
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private.id
}

###########################################
# Common IAM Roles
###########################################

# create role that allows ecs to run our tasks
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# attach ecs execution policy - allows tasks to write logs to cloudwatch
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# attach ecr read policy - allows tasks to pull container images from ecr
resource "aws_iam_role_policy_attachment" "ecs_task_execution_ecr_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

###########################################
# Orchestrator service on fargate
# Setup ecs cluster and alb
###########################################

module "fargate_service" {
  source = "./modules/fargate"

  # pass in the VPC and subnet IDs from your networking setup
  vpc_id             = aws_vpc.main_vpc.id
  private_subnet_ids = aws_subnet.private_subnets[*].id
  public_subnet_ids = aws_subnet.public_subnets[*].id

  # pass in the ECS execution role ARN we created
  ecs_task_execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  # pass in ECR repository URL
  ecr_repository_url = "${var.aws_account_id}.dkr.ecr.eu-west-2.amazonaws.com/systembench_repo"
}