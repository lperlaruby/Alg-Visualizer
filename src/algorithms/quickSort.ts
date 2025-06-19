// Quick Sort
import { SortingStep } from './bubbleSort';

export function quickSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Initial step
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting quick sort..."
    });

    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;

        // Show pivot selection
        steps.push({
            array: [...arr],
            comparingIndices: [high],
            swappingIndices: [],
            sortedIndices: [],
            description: `Selected pivot: ${pivot} at position ${high}`
        });

        for (let j = low; j < high; j++) {
            // Show comparison with pivot
            steps.push({
                array: [...arr],
                comparingIndices: [j, high],
                swappingIndices: [],
                sortedIndices: [],
                description: `Comparing ${arr[j]} with pivot ${pivot}`
            });

            if (arr[j] < pivot) {
                i++;
                
                if (i !== j) {
                    // Show swap
                    steps.push({
                        array: [...arr],
                        comparingIndices: [],
                        swappingIndices: [i, j],
                        sortedIndices: [],
                        description: `Swapping ${arr[i]} and ${arr[j]}`
                    });

                    [arr[i], arr[j]] = [arr[j], arr[i]];

                    // Show result after swap
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

        // Place pivot in correct position
        if (i + 1 !== high) {
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [i + 1, high],
                sortedIndices: [],
                description: `Placing pivot ${pivot} in final position`
            });

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [i + 1],
                description: `Pivot ${pivot} is now in correct position`
            });
        } else {
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [i + 1],
                description: `Pivot ${pivot} is already in correct position`
            });
        }

        return i + 1;
    };

    const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
            // Show partition range
            steps.push({
                array: [...arr],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [],
                description: `Partitioning subarray from ${low} to ${high}`
            });

            const pi = partition(low, high);
            
            // Recursively sort left and right parts
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    };

    quickSortHelper(0, arr.length - 1);

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
  