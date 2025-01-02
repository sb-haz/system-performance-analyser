from src.base_search import BaseSearch
from typing import List

class LinearSearch(BaseSearch):
    def search(self, nums: List[int], target: int) -> int:
        for i in range(len(nums)):
            self.iterations += 1
            self.comparisons += 1
            
            if nums[i] == target:
                return i
                
        return -1