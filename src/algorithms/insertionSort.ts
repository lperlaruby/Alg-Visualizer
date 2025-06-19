// Insertion Sort - build the sorted array one element at a time
import { SortingStep } from './bubbleSort';

export function insertionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // copy to avoid mutating original
    
    // Initial step - show starting state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting insertion sort..."
    });

    const n = arr.length;
    
    // main loop - start from second element and insert each one into sorted portion
    for (let i = 1; i < n; i++) {
        const current = arr[i]; // this is the element we want to insert
        let j = i - 1; // start comparing with the element before
        
        // Show the current element being inserted - highlight what we're working with
        steps.push({
            array: [...arr],
            comparingIndices: [i],
            swappingIndices: [],
            sortedIndices: Array.from({length: i}, (_, index) => index),
            description: `Inserting ${current} into sorted portion`
        });
        
        // keep shifting elements until we find the right spot for current
        while (j >= 0) {
            // Show comparison - highlight what we're comparing
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => index),
                description: `Comparing ${current} with ${arr[j]}`
            });
            
            // if the element we're comparing is bigger, we need to shift it
            if (arr[j] > current) {
                // Show shift - highlight the shifting operation
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `Shifting ${arr[j]} to the right`
                });
                
                arr[j + 1] = arr[j]; // shift the element
                j--; // move back one position
                
                // Show result after shift - display the new state
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `Shifted element, continuing search`
                });
            } else {
                break; // found the right spot, stop shifting
            }
        }
        
        // Insert the current element - put it in its final position
        arr[j + 1] = current;
        
        // Show final position - display where we put the element
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: i + 1}, (_, index) => index),
            description: `Inserted ${current} at position ${j + 1}`
        });
    }
    
    // Final step - we're all done!
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index),
        description: "Array is now sorted!"
    });
    
    return steps;
}