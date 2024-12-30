interface CodeImplementations {
    [algorithm: string]: {
        [language: string]: string;
    }
}

export const searchImplementations: CodeImplementations = {

    // LINEAR SEARCH
    'linear': {

        java: `public static int JavaLinearSearch(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            return i;
        }
    }
    return -1;
 }`,

        python: `def PythonLinearSearch(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1`,

        javascript: `function JavaScriptLinearSearch(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;
 }`,

        csharp: `public static int DotNetLinearSearch(int[] nums, int target) {
    for (int i = 0; i < nums.Length; i++) {
        if (nums[i] == target) {
            return i;
        }
    }
    return -1;
 }`
    },

    // BINARY SEARCH
    'binary': {

        java: `public static int JavaBinarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
 }`,

        python: `def PythonBinarySearch(nums, target):
    left = 0
    right = len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,

        javascript: `function JavaScriptBinarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
 }`,

        csharp: `public static int DotNetBinarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.Length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
 }`
    },

    // JUMP SEARCH
    'jump': {

        java: `public static int JavaJumpSearch(int[] nums, int target) {
    int n = nums.length;
    int step = (int) Math.floor(Math.sqrt(n));
    
    int prev = 0;
    while (nums[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
 
    while (nums[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
 
    if (nums[prev] == target) return prev;
    return -1;
 }`,

        python: `def PythonJumpSearch(nums, target):
    n = len(nums)
    step = int(n ** 0.5)
    
    prev = 0
    while nums[min(step, n) - 1] < target:
        prev = step
        step += int(n ** 0.5)
        if prev >= n:
            return -1
            
    while nums[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
            
    if nums[prev] == target:
        return prev
    return -1`,

        javascript: `function JavaScriptJumpSearch(nums, target) {
    const n = nums.length;
    const step = Math.floor(Math.sqrt(n));
    
    let prev = 0;
    while (nums[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
 
    while (nums[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
 
    if (nums[prev] === target) return prev;
    return -1;
 }`,

        csharp: `public static int DotNetJumpSearch(int[] nums, int target) {
    int n = nums.Length;
    int step = (int)Math.Floor(Math.Sqrt(n));
    
    int prev = 0;
    while (nums[Math.Min(step, n) - 1] < target) {
        prev = step;
        step += (int)Math.Floor(Math.Sqrt(n));
        if (prev >= n) return -1;
    }
 
    while (nums[prev] < target) {
        prev++;
        if (prev == Math.Min(step, n)) return -1;
    }
 
    if (nums[prev] == target) return prev;
    return -1;
 }`
    },

    // INTERPOLATION SEARCH
    'interpolation': {

        java: `public static int JavaInterpolationSearch(int[] nums, int target) {
    int low = 0;
    int high = nums.length - 1;
    
    while (low <= high && target >= nums[low] && target <= nums[high]) {
        if (low == high) {
            if (nums[low] == target) return low;
            return -1;
        }
        
        int pos = low + (((high - low) * 
            (target - nums[low])) / (nums[high] - nums[low]));
        
        if (nums[pos] == target) return pos;
        if (nums[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
 }`,

        python: `def PythonInterpolationSearch(nums, target):
    low = 0
    high = len(nums) - 1
    
    while (low <= high and target >= nums[low] and target <= nums[high]):
        if low == high:
            if nums[low] == target:
                return low
            return -1
            
        pos = low + ((high - low) * 
            (target - nums[low]) // (nums[high] - nums[low]))
            
        if nums[pos] == target:
            return pos
        elif nums[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`,

        javascript: `function JavaScriptInterpolationSearch(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    
    while (low <= high && target >= nums[low] && target <= nums[high]) {
        if (low === high) {
            if (nums[low] === target) return low;
            return -1;
        }
        
        const pos = low + Math.floor(((high - low) * 
            (target - nums[low])) / (nums[high] - nums[low]));
            
        if (nums[pos] === target) return pos;
        if (nums[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
 }`,

        csharp: `public static int DotNetInterpolationSearch(int[] nums, int target) {
    int low = 0;
    int high = nums.Length - 1;
    
    while (low <= high && target >= nums[low] && target <= nums[high]) {
        if (low == high) {
            if (nums[low] == target) return low;
            return -1;
        }
        
        int pos = low + ((high - low) * 
            (target - nums[low]) / (nums[high] - nums[low]));
            
        if (nums[pos] == target) return pos;
        if (nums[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
 }`
    }
};