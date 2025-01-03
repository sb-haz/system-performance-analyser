interface CodeImplementations {
    [algorithm: string]: {
        [language: string]: string;
    }
}

export const sortImplementations: CodeImplementations = {
    'BUBBLE': {
        JAVA: `public static void JavaBubbleSort(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                int temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
            }
        }
    }
}`,
        PYTHON: `def PythonBubbleSort(nums):
    n = len(nums)
    for i in range(n):
        for j in range(0, n - i - 1):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]`,

        JAVASCRIPT: `function JavaScriptBubbleSort(nums) {
    const n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
}`,

        CSHARP: `public static void DotNetBubbleSort(int[] nums) {
    int n = nums.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                int temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
            }
        }
    }
}`
    },

    'INSERTION': {
        JAVA: `public static void JavaInsertionSort(int[] nums) {
    int n = nums.length;
    for (int i = 1; i < n; i++) {
        int key = nums[i];
        int j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
}`,

        PYTHON: `def PythonInsertionSort(nums):
    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1
        nums[j + 1] = key`,

        JAVASCRIPT: `function JavaScriptInsertionSort(nums) {
    for (let i = 1; i < nums.length; i++) {
        let key = nums[i];
        let j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
}`,

        CSHARP: `public static void DotNetInsertionSort(int[] nums) {
    for (int i = 1; i < nums.Length; i++) {
        int key = nums[i];
        int j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
}`
    },

    'SELECTION': {
        JAVA: `public static void JavaSelectionSort(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (nums[j] < nums[minIdx]) {
                minIdx = j;
            }
        }
        int temp = nums[minIdx];
        nums[minIdx] = nums[i];
        nums[i] = temp;
    }
}`,

        PYTHON: `def PythonSelectionSort(nums):
    for i in range(len(nums)):
        min_idx = i
        for j in range(i + 1, len(nums)):
            if nums[j] < nums[min_idx]:
                min_idx = j
        nums[i], nums[min_idx] = nums[min_idx], nums[i]`,

        JAVASCRIPT: `function JavaScriptSelectionSort(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIdx]) {
                minIdx = j;
            }
        }
        [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]];
    }
}`,

        CSHARP: `public static void DotNetSelectionSort(int[] nums) {
    for (int i = 0; i < nums.Length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[j] < nums[minIdx]) {
                minIdx = j;
            }
        }
        int temp = nums[minIdx];
        nums[minIdx] = nums[i];
        nums[i] = temp;
    }
}`
    },

    'MERGE': {
        JAVA: `public static void JavaMergeSort(int[] nums) {
    if (nums.length < 2) return;
    
    int mid = nums.length / 2;
    int[] left = new int[mid];
    int[] right = new int[nums.length - mid];
    
    System.arraycopy(nums, 0, left, 0, mid);
    System.arraycopy(nums, mid, right, 0, nums.length - mid);
    
    JavaMergeSort(left);
    JavaMergeSort(right);
    merge(nums, left, right);
}

private static void merge(int[] nums, int[] left, int[] right) {
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            nums[k++] = left[i++];
        } else {
            nums[k++] = right[j++];
        }
    }
    while (i < left.length) nums[k++] = left[i++];
    while (j < right.length) nums[k++] = right[j++];
}`,

        PYTHON: `def PythonMergeSort(nums):
    if len(nums) < 2:
        return nums
        
    mid = len(nums) // 2
    left = nums[:mid]
    right = nums[mid:]
    
    PythonMergeSort(left)
    PythonMergeSort(right)
    
    i = j = k = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            nums[k] = left[i]
            i += 1
        else:
            nums[k] = right[j]
            j += 1
        k += 1
        
    while i < len(left):
        nums[k] = left[i]
        i += 1
        k += 1
        
    while j < len(right):
        nums[k] = right[j]
        j += 1
        k += 1`,

        JAVASCRIPT: `function JavaScriptMergeSort(nums) {
    if (nums.length < 2) return nums;
    
    const mid = Math.floor(nums.length / 2);
    const left = nums.slice(0, mid);
    const right = nums.slice(mid);
    
    JavaScriptMergeSort(left);
    JavaScriptMergeSort(right);
    merge(nums, left, right);
}

function merge(nums, left, right) {
    let i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            nums[k++] = left[i++];
        } else {
            nums[k++] = right[j++];
        }
    }
    while (i < left.length) nums[k++] = left[i++];
    while (j < right.length) nums[k++] = right[j++];
}`,

        CSHARP: `public static void DotNetMergeSort(int[] nums) {
    if (nums.Length < 2) return;
    
    int mid = nums.Length / 2;
    int[] left = new int[mid];
    int[] right = new int[nums.Length - mid];
    
    Array.Copy(nums, 0, left, 0, mid);
    Array.Copy(nums, mid, right, 0, nums.Length - mid);
    
    DotNetMergeSort(left);
    DotNetMergeSort(right);
    Merge(nums, left, right);
}

private static void Merge(int[] nums, int[] left, int[] right) {
    int i = 0, j = 0, k = 0;
    while (i < left.Length && j < right.Length) {
        if (left[i] <= right[j]) {
            nums[k++] = left[i++];
        } else {
            nums[k++] = right[j++];
        }
    }
    while (i < left.Length) nums[k++] = left[i++];
    while (j < right.Length) nums[k++] = right[j++];
}`
    },

    'QUICK': {
        JAVA: `public static void JavaQuickSort(int[] nums) {
    quickSort(nums, 0, nums.length - 1);
}

private static void quickSort(int[] nums, int low, int high) {
    if (low < high) {
        int pi = partition(nums, low, high);
        quickSort(nums, low, pi - 1);
        quickSort(nums, pi + 1, high);
    }
}

private static int partition(int[] nums, int low, int high) {
    int pivot = nums[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (nums[j] < pivot) {
            i++;
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
    }
    
    int temp = nums[i + 1];
    nums[i + 1] = nums[high];
    nums[high] = temp;
    
    return i + 1;
}`,

        PYTHON: `def PythonQuickSort(nums):
    def quickSort(nums, low, high):
        if low < high:
            pi = partition(nums, low, high)
            quickSort(nums, low, pi - 1)
            quickSort(nums, pi + 1, high)
            
    def partition(nums, low, high):
        pivot = nums[high]
        i = low - 1
        
        for j in range(low, high):
            if nums[j] < pivot:
                i += 1
                nums[i], nums[j] = nums[j], nums[i]
                
        nums[i + 1], nums[high] = nums[high], nums[i + 1]
        return i + 1
        
    quickSort(nums, 0, len(nums) - 1)`,

        JAVASCRIPT: `function JavaScriptQuickSort(nums) {
    function quickSort(nums, low, high) {
        if (low < high) {
            const pi = partition(nums, low, high);
            quickSort(nums, low, pi - 1);
            quickSort(nums, pi + 1, high);
        }
    }
    
    function partition(nums, low, high) {
        const pivot = nums[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (nums[j] < pivot) {
                i++;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
        
        [nums[i + 1], nums[high]] = [nums[high], nums[i + 1]];
        return i + 1;
    }
    
    quickSort(nums, 0, nums.length - 1);
}`,

        CSHARP: `public static void DotNetQuickSort(int[] nums) {
    void QuickSort(int[] nums, int low, int high) {
        if (low < high) {
            int pi = Partition(nums, low, high);
            QuickSort(nums, low, pi - 1);
            QuickSort(nums, pi + 1, high);
        }
    }
    
    int Partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (nums[j] < pivot) {
                i++;
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
        
        int temp = nums[i + 1];
        nums[i + 1] = nums[high];
        nums[high] = temp;
        
        return i + 1;
    }
    
    QuickSort(nums, 0, nums.Length - 1);
}`
    }
};