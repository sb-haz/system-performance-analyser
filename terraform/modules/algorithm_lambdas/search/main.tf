locals {
  memory_sizes = [128, 256, 512, 1024, 2048]

  language_configs = {
    java = {
      runtime     = "java17"
      handler     = "HandleSearch::handleRequest"
      source_path = "${path.root}/../lambdas/algorithms/searching/java-searching/build/libs/java-searching-1.0-SNAPSHOT.jar"
    }
    python = {
      runtime     = "python3.9"
      handler     = "handler.handle_request"
      source_path = "${path.root}/../lambdas/algorithms/searching/python-searching/python-searching.zip"
    }
  }
}

resource "aws_lambda_function" "search_functions" {
  for_each = {
    for pair in setproduct(keys(local.language_configs), local.memory_sizes) :
    "${pair[0]}-search-${pair[1]}" => {
      language = pair[0]
      memory   = pair[1]
    }
  }

  filename      = lookup(local.language_configs[each.value.language], "source_path")
  function_name = each.key
  role          = var.role
  handler       = lookup(local.language_configs[each.value.language], "handler")
  runtime       = lookup(local.language_configs[each.value.language], "runtime")
  memory_size   = each.value.memory
  timeout       = 30

  tags = {
    Algorithm = "search"
    Language  = each.value.language
    Memory    = each.value.memory
  }
}