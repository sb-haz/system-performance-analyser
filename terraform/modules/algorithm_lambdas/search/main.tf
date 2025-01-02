locals {
  # memory sizes for lambda functions in MB
  memory_sizes = [128, 256, 512, 1024, 2048]
  # relative path to compiled jar
  jar_path = "${path.root}/../lambdas/algorithms/searching/java-searching/build/libs/java-searching-1.0-SNAPSHOT.jar"
}

resource "aws_lambda_function" "search_functions" {
  # create one lambda function per memory size (6 in total)
  # java-search-128
  # java-search-256
  # java-search-512
  # java-search-1024
  # java-search-2048
  # java-search-10240
  # generate map of memory sizes, string values
  for_each = toset([for size in local.memory_sizes : tostring(size)])

  # lambda config
  filename = local.jar_path
  function_name = "java-search-${each.value}" # creates name e.g. java-search-128
  role = var.role # iam role arn passed from parent module
  handler  = "HandleSearch::handleRequest"  # entry class n method
  # runtime config
  memory_size = tonumber(each.value) # convert string back to nums
  timeout = 30 # execution time limit
  runtime = "java17"

  # tags for organisation
  tags = {
    Algorithm = "search"
    Language  = "java"
    Memory    = each.value
  }
}