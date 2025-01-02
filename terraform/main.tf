provider "aws" {
  region = var.aws_region
}

# Create IAM role for Lambda functions
resource "aws_iam_role" "lambda_role" {
  name = "search_algorithm_lambda_role"

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

# Attach basic Lambda execution policy
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

# Call the search module
module "search_lambdas" {
  source   = "./modules/algorithm_lambdas/search"
  role     = aws_iam_role.lambda_role.arn  # Changed from role_arn to role
}