// Insertion Sort
import { SortingStep } from './bubbleSort';

export function insertionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    // Initial step
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting insertion sort..."
    });

    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const current = arr[i];
        let j = i - 1;
        
        // Show the current element being inserted
        steps.push({
            array: [...arr],
            comparingIndices: [i],
            swappingIndices: [],
            sortedIndices: Array.from({length: i}, (_, index) => index),
            description: `Inserting ${current} into sorted portion`
        });
        
        while (j >= 0) {
            // Show comparison
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => index),
                description: `Comparing ${current} with ${arr[j]}`
            });
            
            if (arr[j] > current) {
                // Show shift
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `Shifting ${arr[j]} to the right`
                });
                
                arr[j + 1] = arr[j];
                j--;
                
                // Show result after shift
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `Shifted element, continuing search`
                });
            } else {
                break;
            }
        }
        
        // Insert the current element
        arr[j + 1] = current;
        
        // Show final position
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: i + 1}, (_, index) => index),
            description: `Inserted ${current} at position ${j + 1}`
        });
    }
    
    // Final step
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index),
        description: "Array is now sorted!"
    });
    
    return steps;
}