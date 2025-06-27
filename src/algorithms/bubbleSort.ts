// bubble sort algorithm - efficient implementation with delta changes
import { SortingStep } from '@/types';

export function reconstructArrayAtStep(initialArray: number[], steps: SortingStep[], stepIndex: number): number[] {
    const result = [...initialArray];
    for (let i = 0; i <= stepIndex; i++) {
        steps[i].arrayChanges?.forEach(change => {
            result[change.index] = change.value;
        });
    }
    return result;
}

export function bubbleSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting bubble sort..."
    });

    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                description: `Comparing elements at positions ${j} and ${j + 1}`
            });

            if (arr[j] > arr[j + 1]) {
                steps.push({
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                    description: `Swapping ${arr[j]} and ${arr[j + 1]}`
                });

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                steps.push({
                    arrayChanges: [
                        { index: j, value: arr[j] },
                        { index: j + 1, value: arr[j + 1] }
                    ],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                    description: `Swapped elements`
                });
            }
        }
    }

    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index),
        description: "Array is now sorted!"
    });

    return steps;
}