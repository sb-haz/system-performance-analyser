public class LinearSearch extends BaseSearch {

    @Override
    protected int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            iterations++; // each loop iteration
            comparisons++; // nums[i] == target comparison
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}