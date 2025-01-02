public class InterpolationSearch extends BaseSearch {

    @Override
    protected int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high && target >= nums[low] && target <= nums[high]) {
            iterations++;
            comparisons += 3; // target >= nums[low] && target <= nums[high]

            if (low == high) {
                comparisons++; // nums[low] == target
                if (nums[low] == target) return low;
                return -1;
            }

            int pos = low + (((high - low) *
                    (target - nums[low])) / (nums[high] - nums[low]));

            comparisons++; // nums[pos] == target
            if (nums[pos] == target) return pos;

            comparisons++; // nums[pos] < target
            if (nums[pos] < target) low = pos + 1;
            else high = pos - 1;
        }

        return -1;
    }

}