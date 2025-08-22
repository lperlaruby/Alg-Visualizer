// Merge sort with visualization steps
import { SortingStep } from '@/types';

export function mergeSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Starting state
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting merge sort..."
    });

    // Merge two sorted subarrays
    const merge = (left: number, mid: number, right: number) => {
        const tempArray = new Array(right - left + 1);
        let i = left;
        let j = mid + 1;
        let k = 0;

        // Compare and merge
        while (i <= mid && j <= right) {
            // Show comparison
            steps.push({
                comparingIndices: [i, j],
                swappingIndices: [],
                sortedIndices: [],
                description: `Comparing ${arr[i]} with ${arr[j]}`
            });

            // Take smaller element
            if (arr[i] <= arr[j]) {
                tempArray[k] = arr[i];
                i++;
            } else {
                tempArray[k] = arr[j];
                j++;
            }
            k++;
        }

        // Copy remaining left elements
        while (i <= mid) {
            tempArray[k] = arr[i];
            i++;
            k++;
        }

        // Copy remaining right elements
        while (j <= right) {
            tempArray[k] = arr[j];
            j++;
            k++;
        }

        const arrayChanges = [];
        for (let idx = 0; idx < k; idx++) {
            arr[left + idx] = tempArray[idx];
            arrayChanges.push({ index: left + idx, value: tempArray[idx] });
        }

        // Show merged result
        steps.push({
            arrayChanges,
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: right - left + 1}, (_, index) => left + index),
            description: `Merged subarray from ${left} to ${right}`
        });
    };

    // Recursive divide and conquer
    const mergeSortHelper = (left: number, right: number) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            // Show division
            steps.push({
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [],
                description: `Dividing array from ${left} to ${right} at ${mid}`
            });
            
            mergeSortHelper(left, mid);
            mergeSortHelper(mid + 1, right);
            merge(left, mid, right);
        }
    };

    mergeSortHelper(0, arr.length - 1);

    // Done!
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: arr.length}, (_, index) => index),
        description: "Array is now sorted!"
    });

    return steps;
} 