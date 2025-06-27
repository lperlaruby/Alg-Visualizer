// Algorithm code snippets for display in the CodeDisplay component

export const getAlgorithmCode = (selectedAlgorithm: string): string => {
  switch (selectedAlgorithm) {
    case 'bubble':
      return `// bubble sort algorithm - the classic simple sorting method
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
}`;
    case 'selection':
      return `// selection sort - find the minimum and place it at the beginning
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
}`;
    case 'insertion':
      return `// insertion sort - build the final array one item at a time
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
}`;
    case 'merge':
      return `// merge sort - divide and conquer approach
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
}`;
    case 'quick':
      return `// quick sort - pick a pivot and partition around it
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
}`;
    default:
      return '// select an algorithm to view its code';
  }
}; 