// Merge Sort - divide and conquer approach, very efficient
import { SortingStep } from './bubbleSort';

export function mergeSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // copy to avoid mutating original
    
    // Initial step - show starting state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting merge sort..."
    });

    // merge function - combines two sorted subarrays into one sorted array
    const merge = (left: number, mid: number, right: number) => {
        const tempArray = new Array(right - left + 1); // temporary array to hold merged result
        let i = left; // index for left subarray
        let j = mid + 1; // index for right subarray
        let k = 0; // index for temp array

        // merge the two subarrays by comparing elements
        while (i <= mid && j <= right) {
            // Show comparison - highlight what we're comparing
            steps.push({
                array: [...arr],
                comparingIndices: [i, j],
                swappingIndices: [],
                sortedIndices: [],
                description: `Comparing ${arr[i]} with ${arr[j]}`
            });

            // take the smaller element from either subarray
            if (arr[i] <= arr[j]) {
                tempArray[k] = arr[i];
                i++;
            } else {
                tempArray[k] = arr[j];
                j++;
            }
            k++;
        }

        // copy remaining elements from left subarray if any
        while (i <= mid) {
            tempArray[k] = arr[i];
            i++;
            k++;
        }

        // copy remaining elements from right subarray if any
        while (j <= right) {
            tempArray[k] = arr[j];
            j++;
            k++;
        }

        // Copy back to original array - put merged result back
        for (let i = 0; i < k; i++) {
            arr[left + i] = tempArray[i];
        }

        // Show merged result - display the sorted subarray
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: right - left + 1}, (_, index) => left + index),
            description: `Merged subarray from ${left} to ${right}`
        });
    };

    // recursive helper function - this does the divide and conquer
    const mergeSortHelper = (left: number, right: number) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2); // find middle point
            
            // Show division - highlight how we're splitting the array
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [],
                description: `Dividing array from ${left} to ${right} at ${mid}`
            });
            
            mergeSortHelper(left, mid); // sort left half
            mergeSortHelper(mid + 1, right); // sort right half
            merge(left, mid, right); // merge the two sorted halves
        }
    };

    mergeSortHelper(0, arr.length - 1); // start the recursive process

    // Final step - we're all done!
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: arr.length}, (_, index) => index),
        description: "Array is now sorted!"
    });

    return steps;
} 