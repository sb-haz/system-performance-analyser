from abc import ABC, abstractmethod
import time
from datetime import datetime
import logging
from typing import List, Dict, Any

# base class search algos will use
class BaseSearch(ABC):
    EXECUTION_STATUS_SUCCESS = "SUCCESS"
    EXECUTION_STATUS_FAIL = "FAILED"
    SEARCH_STATUS_FOUND = "FOUND"
    SEARCH_STATUS_NOT_FOUND = "NOT_FOUND"

    def __init__(self):
        self.iterations = 0
        self.comparisons = 0

    def handle_request(self, event: Dict[str, Any], context: Any) -> Dict[str, Any]:
        current_time = datetime.utcnow()

        try:
            # reset counters
            self.iterations = 0
            self.comparisons = 0

            array = event.get('array', '')
            target = event.get('target', '')

            # validate user input
            if not array or not target:
                raise ValueError("Missing array or target")

            # convert array and perform search
            nums = [int(x) for x in array.split(',')]
            target_num = int(target)

            start_time = time.perf_counter()
            search_result = self.search(nums, target_num)
            time_taken = time.perf_counter() - start_time

            return {
                'timestamp': current_time.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                'timestampRaw': int(current_time.timestamp() * 1000),
                'array': array,
                'target': target,
                'algorithm': event.get('algorithm', ''),
                'language': event.get('language', ''),
                'memorySize': event.get('memorySize', ''),
                'region': event.get('region', ''),
                'iterations': self.iterations,
                'comparisons': self.comparisons,
                'timeTaken': time_taken,
                'cost': 0.0,
                'executionStatus': self.EXECUTION_STATUS_SUCCESS,
                'searchStatus': self.SEARCH_STATUS_FOUND if search_result != -1 else self.SEARCH_STATUS_NOT_FOUND,
                'foundIndex': search_result
            }

        except Exception as e:
            # if error return failed result
            logging.error(f"Search failed: {str(e)}")
            return {
                'timestamp': current_time.isoformat(),
                'timestampRaw': int(current_time.timestamp() * 1000),
                'array': event.get('array', ''),
                'target': event.get('target', ''),
                'algorithm': event.get('algorithm', ''),
                'language': event.get('language', ''),
                'memorySize': event.get('memorySize', ''),
                'region': event.get('region', ''),
                'iterations': 0,
                'comparisons': 0,
                'timeTaken': 0.0,
                'cost': 0.0,
                'executionStatus': self.EXECUTION_STATUS_FAIL,
                'searchStatus': self.SEARCH_STATUS_NOT_FOUND,
                'foundIndex': -1
            }

    @abstractmethod
    def search(self, nums: List[int], target: int) -> int:
        pass