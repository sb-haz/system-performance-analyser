public class JumpSearch extends BaseSearch {

    @Override
    protected int search(int[] nums, int target) {
        int n = nums.length;
        if (n == 0) return -1;

        // best jump step size
        int step = (int) Math.floor(Math.sqrt(n));

        // finding block where element is present (if it's present)
        int prev = 0;
        while (prev < n && nums[Math.min(step, n) - 1] < target) {
            iterations++;          // iterations in first pass
            comparisons++;        // nums[min] < target
            prev = step;
            step += (int) Math.floor(Math.sqrt(n));
            if (prev >= n) return -1;
        }

        // linear search to find target in block beginning with prev
        while (prev < Math.min(step, n)) {
            iterations++;         // iterations in linear search
            comparisons++;       // nums[prev] == target
            if (nums[prev] == target) return prev;
            prev++;
        }

        return -1;
    }

}