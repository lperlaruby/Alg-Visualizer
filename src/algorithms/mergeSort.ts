// Merge Sort
import { SortingStep } from './bubbleSort';

export function mergeSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Initial step
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting merge sort..."
    });

    const merge = (left: number, mid: number, right: number) => {
        const tempArray = new Array(right - left + 1);
        let i = left;
        let j = mid + 1;
        let k = 0;

        while (i <= mid && j <= right) {
            // Show comparison
            steps.push({
                array: [...arr],
                comparingIndices: [i, j],
                swappingIndices: [],
                sortedIndices: [],
                description: `Comparing ${arr[i]} with ${arr[j]}`
            });

            if (arr[i] <= arr[j]) {
                tempArray[k] = arr[i];
                i++;
            } else {
                tempArray[k] = arr[j];
                j++;
            }
            k++;
        }

        while (i <= mid) {
            tempArray[k] = arr[i];
            i++;
            k++;
        }

        while (j <= right) {
            tempArray[k] = arr[j];
            j++;
            k++;
        }

        // Copy back to original array
        for (let i = 0; i < k; i++) {
            arr[left + i] = tempArray[i];
        }

        // Show merged result
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: right - left + 1}, (_, index) => left + index),
            description: `Merged subarray from ${left} to ${right}`
        });
    };

    const mergeSortHelper = (left: number, right: number) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            // Show division
            steps.push({
                array: [...arr],
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

    // Final step
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: arr.length}, (_, index) => index),
        description: "Array is now sorted!"
    });

    return steps;
} 