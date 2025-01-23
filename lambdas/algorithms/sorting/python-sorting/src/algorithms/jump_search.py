from src.base_search import BaseSearch
from typing import List
import math

class JumpSearch(BaseSearch):
    def search(self, nums: List[int], target: int) -> int:
        n = len(nums)
        step = int(math.sqrt(n))
        
        # finding block where element is present (if exists)
        prev = 0
        while prev < n:
            self.iterations += 1
            
            jump = min(prev + step, n)
            self.comparisons += 1
            if nums[jump - 1] >= target:
                break
                
            prev = jump
            
        # linear search in block
        while prev < n:
            self.iterations += 1
            self.comparisons += 1
            
            if nums[prev] == target:
                return prev
            
            prev += 1
            if prev == min(jump, n):
                break
                
        return -1