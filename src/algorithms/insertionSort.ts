// Insertion sort with step tracking
import { SortingStep } from '@/types';

export function insertionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting insertion sort..."
    });

    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const current = arr[i];
        let j = i - 1;
        
        steps.push({
            comparingIndices: [i],
            swappingIndices: [],
            sortedIndices: Array.from({length: i}, (_, index) => index),
            description: `Inserting ${current} into sorted portion`
        });
        
        const arrayChanges = [];
        while (j >= 0) {
            steps.push({
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => index),
                description: `Comparing ${current} with ${arr[j]}`
            });
            
            if (arr[j] > current) {
                steps.push({
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `Shifting ${arr[j]} to the right`
                });
                
                arr[j + 1] = arr[j];
                arrayChanges.push({ index: j + 1, value: arr[j] });
                j--;
                
                steps.push({
                    arrayChanges: [...arrayChanges],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `Shifted element, continuing search`
                });
            } else {
                break;
            }
        }
        
        arr[j + 1] = current;
        arrayChanges.push({ index: j + 1, value: current });
        
        steps.push({
            arrayChanges: [...arrayChanges],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: i + 1}, (_, index) => index),
            description: `Inserted ${current} at position ${j + 1}`
        });
    }
    
    steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index),
        description: "Array is now sorted!"
    });
    
    return steps;
}