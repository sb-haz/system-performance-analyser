from handler import handle_request
import json

# mock request
test_event = {
    "array": "1,2,3,4,5,6,7,8,9,10",
    "target": "7",
    "algorithm": "BINARY",
    "language": "PYTHON",
    "memorySize": "MB_128",
    "region": "EU-WEST-2"
}

# mock context object
class MockContext:
    function_name = "test-function"
    memory_limit_in_mb = 128
    invoked_function_arn = "test:arn"

# run main request handler
result = handle_request(test_event, MockContext())
print(json.dumps(result, indent=2))