from src.base_search import BaseSearch
from typing import List

class BinarySearch(BaseSearch):
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1

        while left <= right:
            self.iterations += 1
            mid = left + (right - left) // 2

            self.comparisons += 1  # nums[mid] == target
            if nums[mid] == target:
                return mid

            self.comparisons += 1  # nums[mid] < target
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return -1