from src.algorithms.binary_search import BinarySearch
from src.algorithms.linear_search import LinearSearch
from src.algorithms.jump_search import JumpSearch
from src.algorithms.interpolation_search import InterpolationSearch

# func ran in lambda
def handle_request(event, context):
    algorithm_map = {
        'LINEAR': LinearSearch(),
        'BINARY': BinarySearch(),
        'JUMP': JumpSearch(),
        'INTERPOLATION': InterpolationSearch()
    }

    algorithm = algorithm_map[event['algorithm']]
    return algorithm.handle_request(event, context)