// Code snippets for display
import { Language } from '@/types';

const algorithmCodeSnippets = {
  typescript: {
    bubble: `// Bubble sort implementation
export function bubbleSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    const n = arr.length;
    
    // Each pass bubbles largest element to end
    for (let i = 0; i < n - 1; i++) {
        // Compare adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            // Swap if out of order
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return steps;
}`,
    selection: `// Selection sort implementation
export function selectionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find minimum in unsorted part
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Move minimum to front
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return steps;
}`,
    insertion: `// Insertion sort implementation
export function insertionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        
        // Shift larger elements right

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
    
    return steps;
}`,
    merge: `// Merge sort implementation
export function mergeSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Merge two sorted arrays
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
    
    // Recursive divide and conquer
    const mergeSortHelper = (arr: number[]): number[] => {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = mergeSortHelper(arr.slice(0, mid));
        const right = mergeSortHelper(arr.slice(mid));
        
        return merge(left, right);
    };
    
    return steps;
}`,
    quick: `// Quick sort implementation
export function quickSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Partition around pivot
    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;

        // Move smaller elements left
        for (let j = low; j < high; j++) {
            // Partition step
            if (arr[j] < pivot) {
                i++;
                
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
        }

        // Place pivot in final position
        if (i + 1 !== high) {
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        }

        return i + 1;
    };

    // Recursive helper
    const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            
            // Sort partitions
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    };

    quickSortHelper(0, arr.length - 1);
    
    return steps;
}`,
    default: '// select an algorithm to view its code'
  },
  python: {
    bubble: `# Bubble sort implementation
def bubble_sort(array):
    """
    Bubble sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    n = len(arr)
    steps = []
    
    # Each pass bubbles largest element to end
    for i in range(n - 1):
        # Compare adjacent elements
        for j in range(n - i - 1):
            # Swap if out of order
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return steps`,
    selection: `# Selection sort implementation
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
        
        # Find minimum in unsorted part
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Move minimum to front
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return steps`,
    insertion: `# Insertion sort implementation
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
        
        # Shift larger elements right

        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = current
    
    return steps`,
    merge: `# Merge sort implementation
def merge_sort(array):
    """
    Merge sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    steps = []
    
    def merge(left, right):
        """Merge two sorted arrays"""
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
        
        # Add remaining
        result.extend(left[left_index:])
        result.extend(right[right_index:])
        return result
    
    def merge_sort_helper(arr):
        """Recursive divide and conquer"""
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2
        left = merge_sort_helper(arr[:mid])
        right = merge_sort_helper(arr[mid:])
        
        return merge(left, right)
    
    return steps`,
    quick: `# Quick sort implementation
def quick_sort(array):
    """
    Quick sort algorithm implementation
    Returns a list of steps for visualization
    """
    arr = array.copy()
    steps = []
    
    def partition(low, high):
        """Partition around pivot"""
        pivot = arr[high]
        i = low - 1
        
        # Move smaller elements left
        for j in range(low, high):
            # Partition step
            if arr[j] < pivot:
                i += 1
                
                if i != j:
                    arr[i], arr[j] = arr[j], arr[i]
        
        # Place pivot in final position
        if i + 1 != high:
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
        
        return i + 1
    
    def quick_sort_helper(low, high):
        """Recursive helper"""
        if low < high:
            pi = partition(low, high)
            
            # Sort partitions
            quick_sort_helper(low, pi - 1)
            quick_sort_helper(pi + 1, high)
    
    quick_sort_helper(0, len(arr) - 1)
    
    return steps`,
    default: '# select an algorithm to view its code'
  }
};

export const getAlgorithmCode = (selectedAlgorithm: string, language: Language = 'typescript'): string => {
  const languageSnippets = algorithmCodeSnippets[language];
  return languageSnippets[selectedAlgorithm as keyof typeof languageSnippets] || languageSnippets.default;
}; 