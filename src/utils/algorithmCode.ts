// Algorithm code snippets for display in the CodeDisplay component
import { Language } from '@/types';

const algorithmCodeSnippets = {
  typescript: {
    bubble: `// bubble sort algorithm - the classic simple sorting method
export function bubbleSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // making a copy to avoid mutating original array
    
    const n = arr.length;
    
    // outer loop to number of passes - each pass puts the largest element in place
    for (let i = 0; i < n - 1; i++) {
        // inner loop to compare adjacent elements - bubble up the largest value
        for (let j = 0; j < n - i - 1; j++) {
            // if need to swap, show the swap - only swap if left is bigger than right
            if (arr[j] > arr[j + 1]) {
                // swap the elements - the actual swap operation
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return steps;
}`,
    selection: `// selection sort - find the minimum and place it at the beginning
export function selectionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // find the minimum element in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // swap the found minimum with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return steps;
}`,
    insertion: `// insertion sort - build the final array one item at a time
export function insertionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        
        // move elements that are greater than current
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
    
    return steps;
}`,
    merge: `// merge sort - divide and conquer approach
export function mergeSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // merge function to combine two sorted arrays
    const merge = (left: number[], right: number[]): number[] => {
        let result: number[] = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    };
    
    // recursive merge sort function
    const mergeSortHelper = (arr: number[]): number[] => {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = mergeSortHelper(arr.slice(0, mid));
        const right = mergeSortHelper(arr.slice(mid));
        
        return merge(left, right);
    };
    
    return steps;
}`,
    quick: `// quick sort - pick a pivot and partition around it
export function quickSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // partition function - puts pivot in right place and returns its position
    const partition = (low: number, high: number): number => {
        const pivot = arr[high]; // pick the last element as pivot
        let i = low - 1; // index for elements smaller than pivot

        // go through all elements and put smaller ones to the left
        for (let j = low; j < high; j++) {
            // if current element is smaller than pivot, swap it to left side
            if (arr[j] < pivot) {
                i++; // move the boundary for smaller elements
                
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]]; // do the swap
                }
            }
        }

        // place pivot in correct position
        if (i + 1 !== high) {
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        }

        return i + 1; // return the pivot's final position
    };

    // recursive helper function - this does the divide and conquer
    const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high); // get pivot position
            
            // recursively sort left and right parts
            quickSortHelper(low, pi - 1); // sort left side of pivot
            quickSortHelper(pi + 1, high); // sort right side of pivot
        }
    };

    quickSortHelper(0, arr.length - 1); // start the recursive process
    
    return steps;
}`,
    default: '// select an algorithm to view its code'
  },
  python: {
    bubble: `# bubble sort algorithm - the classic simple sorting method
def bubble_sort(array):
    """
    Bubble sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()  # making a copy to avoid mutating original array
    n = len(arr)
    steps = []
    
    # outer loop to number of passes - each pass puts the largest element in place
    for i in range(n - 1):
        # inner loop to compare adjacent elements - bubble up the largest value
        for j in range(n - i - 1):
            # if need to swap, show the swap - only swap if left is bigger than right
            if arr[j] > arr[j + 1]:
                # swap the elements - the actual swap operation
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return steps`,
    selection: `# selection sort - find the minimum and place it at the beginning
def selection_sort(array):
    """
    Selection sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    n = len(arr)
    steps = []
    
    for i in range(n - 1):
        min_index = i
        
        # find the minimum element in the unsorted portion
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # swap the found minimum with the first element        
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return steps`,
    insertion: `# insertion sort - build the final array one item at a time
def insertion_sort(array):
    """
    Insertion sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    n = len(arr)
    steps = []
    
    for i in range(1, n):
        current = arr[i]
        j = i - 1
        
        # move elements that are greater than current
        # to one position ahead of their current position
        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = current
    
    return steps`,
    merge: `# merge sort - divide and conquer approach
def merge_sort(array):
    """
    Merge sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    steps = []
    
    def merge(left, right):
        """Merge function to combine two sorted arrays"""
        result = []
        left_index = 0
        right_index = 0
        
        while left_index < len(left) and right_index < len(right):
            if left[left_index] <= right[right_index]:
                result.append(left[left_index])
                left_index += 1
            else:
                result.append(right[right_index])
                right_index += 1
        
        # add remaining elements
        result.extend(left[left_index:])
        result.extend(right[right_index:])
        return result
    
    def merge_sort_helper(arr):
        """Recursive merge sort function"""
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2
        left = merge_sort_helper(arr[:mid])
        right = merge_sort_helper(arr[mid:])
        
        return merge(left, right)
    
    return steps`,
    quick: `# quick sort - pick a pivot and partition around it
def quick_sort(array):
    """
    Quick sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    steps = []
    
    def partition(low, high):
        """Partition function - puts pivot in right place and returns its position"""
        pivot = arr[high]  # pick the last element as pivot
        i = low - 1  # index for elements smaller than pivot
        
        # go through all elements and put smaller ones to the left
        for j in range(low, high):
            # if current element is smaller than pivot, swap it to left side
            if arr[j] < pivot:
                i += 1  # move the boundary for smaller elements
                
                if i != j:
                    arr[i], arr[j] = arr[j], arr[i]  # do the swap
        
        # place pivot in correct position
        if i + 1 != high:
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
        
        return i + 1  # return the pivot's final position
    
    def quick_sort_helper(low, high):
        """Recursive helper function - this does the divide and conquer"""
        if low < high:
            pi = partition(low, high)  # get pivot position
            
            # recursively sort left and right parts
            quick_sort_helper(low, pi - 1)  # sort left side of pivot
            quick_sort_helper(pi + 1, high)  # sort right side of pivot
    
    quick_sort_helper(0, len(arr) - 1)  # start the recursive process
    
    return steps`,
    default: '# select an algorithm to view its code'
  }
};

export const getAlgorithmCode = (selectedAlgorithm: string, language: Language = 'typescript'): string => {
  const languageSnippets = algorithmCodeSnippets[language];
  return languageSnippets[selectedAlgorithm as keyof typeof languageSnippets] || languageSnippets.default;
}; 