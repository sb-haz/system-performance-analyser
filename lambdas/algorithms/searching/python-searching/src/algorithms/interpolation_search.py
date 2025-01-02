from src.base_search import BaseSearch
from typing import List

class InterpolationSearch(BaseSearch):
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1
        
        while left <= right and target >= nums[left] and target <= nums[right]:
            self.iterations += 1
            
            # interpolation search
            if right == left:
                pos = left
            else:
                pos = left + ((right - left) * (target - nums[left])) // (nums[right] - nums[left])
            
            if pos < 0 or pos >= len(nums):
                break
                
            self.comparisons += 1
            if nums[pos] == target:
                return pos
            
            self.comparisons += 1
            if nums[pos] < target:
                left = pos + 1
            else:
                right = pos - 1
                
        return -1