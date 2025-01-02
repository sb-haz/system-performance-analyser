public class BinarySearch extends BaseSearch {

    @Override
    protected int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            iterations++;
            int mid = left + (right - left) / 2;

            comparisons++; // nums[mid] == target
            if (nums[mid] == target) return mid;

            comparisons++; // nums[mid] < target
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    }

}