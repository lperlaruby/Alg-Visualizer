// Quick Sort - pick a pivot and partition around it, very fast in practice
import { SortingStep } from './bubbleSort';

export function quickSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // copy to avoid mutating original
    
    // Initial step - show starting state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting quick sort..."
    });

    // partition function - puts pivot in right place and returns its position
    const partition = (low: number, high: number): number => {
        const pivot = arr[high]; // pick the last element as pivot
        let i = low - 1; // index for elements smaller than pivot

        // Show pivot selection - highlight what we chose as pivot
        steps.push({
            array: [...arr],
            comparingIndices: [high],
            swappingIndices: [],
            sortedIndices: [],
            description: `Selected pivot: ${pivot} at position ${high}`
        });

        // go through all elements and put smaller ones to the left
        for (let j = low; j < high; j++) {
            // Show comparison with pivot - highlight what we're comparing
            steps.push({
                array: [...arr],
                comparingIndices: [j, high],
                swappingIndices: [],
                sortedIndices: [],
                description: `Comparing ${arr[j]} with pivot ${pivot}`
            });

            // if current element is smaller than pivot, swap it to left side
            if (arr[j] < pivot) {
                i++; // move the boundary for smaller elements
                
                if (i !== j) {
                    // Show swap - highlight the swapping operation
                    steps.push({
                        array: [...arr],
                        comparingIndices: [],
                        swappingIndices: [i, j],
                        sortedIndices: [],
                        description: `Swapping ${arr[i]} and ${arr[j]}`
                    });

                    [arr[i], arr[j]] = [arr[j], arr[i]]; // do the swap

                    // Show result after swap - display the new state
                    steps.push({
                        array: [...arr],
                        comparingIndices: [],
                        swappingIndices: [],
                        sortedIndices: [],
                        description: `Swapped elements`
                    });
                }
            }
        }

        // Place pivot in correct position - put it after all smaller elements
        if (i + 1 !== high) {
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [i + 1, high],
                sortedIndices: [],
                description: `Placing pivot ${pivot} in final position`
            });

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // swap pivot to its final spot

            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [i + 1],
                description: `Pivot ${pivot} is now in correct position`
            });
        } else {
            // pivot was already in the right place
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [i + 1],
                description: `Pivot ${pivot} is already in correct position`
            });
        }

        return i + 1; // return the pivot's final position
    };

    // recursive helper function - this does the divide and conquer
    const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
            // Show partition range - highlight what section we're working on
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [],
                description: `Partitioning subarray from ${low} to ${high}`
            });

            const pi = partition(low, high); // get pivot position
            
            // Recursively sort left and right parts - pivot is already in place
            quickSortHelper(low, pi - 1); // sort left side of pivot
            quickSortHelper(pi + 1, high); // sort right side of pivot
        }
    };

    quickSortHelper(0, arr.length - 1); // start the recursive process

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
  