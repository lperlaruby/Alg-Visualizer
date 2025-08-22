// Quick sort with visualization
import { SortingStep } from '@/types';

export function quickSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Starting state
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting quick sort..."
    });

    // Partition around pivot
    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;

        // Show pivot
        steps.push({
            comparingIndices: [high],
            swappingIndices: [],
            sortedIndices: [],
            description: `Selected pivot: ${pivot} at position ${high}`
        });

        // Partition elements
        for (let j = low; j < high; j++) {
            // Compare with pivot
            steps.push({
                comparingIndices: [j, high],
                swappingIndices: [],
                sortedIndices: [],
                description: `Comparing ${arr[j]} with pivot ${pivot}`
            });

            // Move smaller elements left
            if (arr[j] < pivot) {
                i++;
                
                if (i !== j) {
                    // Show swap
                    steps.push({
                        comparingIndices: [],
                        swappingIndices: [i, j],
                        sortedIndices: [],
                        description: `Swapping ${arr[i]} and ${arr[j]}`
                    });

                    [arr[i], arr[j]] = [arr[j], arr[i]];

                    // After swap
                    steps.push({
                        arrayChanges: [
                            { index: i, value: arr[i] },
                            { index: j, value: arr[j] }
                        ],
                        comparingIndices: [],
                        swappingIndices: [],
                        sortedIndices: [],
                        description: "Swapped"
                    });
                }
            }
        }

        // Place pivot in final position
        if (i + 1 !== high) {
            steps.push({
                comparingIndices: [],
                swappingIndices: [i + 1, high],
                sortedIndices: [],
                description: `Placing pivot ${pivot} in final position`
            });

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

            steps.push({
                arrayChanges: [
                    { index: i + 1, value: arr[i + 1] },
                    { index: high, value: arr[high] }
                ],
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [i + 1],
                description: `Pivot ${pivot} is now in correct position`
            });
        } else {
            // Pivot already in place
            steps.push({
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [i + 1],
                description: `Pivot ${pivot} is already in correct position`
            });
        }

        return i + 1;
    };

    // Recursive helper
    const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
            // Show partition range
            steps.push({
                comparingIndices: [],
                swappingIndices: [],
                sortedIndices: [],
                description: `Partitioning subarray from ${low} to ${high}`
            });

            const pi = partition(low, high);
            
            // Sort left and right
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    };

    quickSortHelper(0, arr.length - 1);

    // Done!
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: arr.length}, (_, index) => index),
        description: "Array is now sorted!"
    });

    return steps;
}
  