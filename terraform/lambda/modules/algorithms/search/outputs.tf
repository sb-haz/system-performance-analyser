output "function_arns" {
  description = "Map of Lambda function ARNs"
  value = {
    for k, v in aws_lambda_function.search_functions : k => v.arn
  }
}