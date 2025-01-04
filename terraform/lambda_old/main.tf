#################################################
#                    CORE                       #
#################################################

provider "aws" {
  region = var.aws_region
}

#################################################
#                   LAMBDA                      #
#################################################

# create an iam role that lambda functions can use
# allows lambda to execute and access aws services
resource "aws_iam_role" "lambda_role" {
  name = "algorithm_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# basic permissions that all lambda functions need
# attach to the iam role we just made
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

# module to create lambda functions for search implementations
module "search_lambdas" {
  source   = "moduleslgorithm_lambdas/search"
  role     = aws_iam_role.lambda_role.arn
}

# module to create lambda functions for sort implementations
module "sort_lambdas" {
  source   = "moduleslgorithm_lambdas/sort"
  role     = aws_iam_role.lambda_role.arn
}

#################################################
#                  FARGATE                      #
#################################################