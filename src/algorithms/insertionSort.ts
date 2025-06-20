// insertion sort - build the sorted array one element at a time
import { SortingStep } from './bubbleSort';

export function insertionSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // copy to avoid mutating original
    
    // initial step - show starting state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "starting insertion sort..."
    });

    const n = arr.length;
    
    // main loop - start from second element and insert each one into sorted portion
    for (let i = 1; i < n; i++) {
        const current = arr[i]; // this is the element we want to insert
        let j = i - 1; // start comparing with the element before
        
        // show the current element being inserted - highlight what we're working with
        steps.push({
            array: [...arr],
            comparingIndices: [i],
            swappingIndices: [],
            sortedIndices: Array.from({length: i}, (_, index) => index),
            description: `inserting ${current} into sorted portion`
        });
        
        // keep shifting elements until we find the right spot for current
        while (j >= 0) {
            // show comparison - highlight what we're comparing
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => index),
                description: `comparing ${current} with ${arr[j]}`
            });
            
            // if the element we're comparing is bigger, we need to shift it
            if (arr[j] > current) {
                // show shift - highlight the shifting operation
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `shifting ${arr[j]} to the right`
                });
                
                arr[j + 1] = arr[j]; // shift the element
                j--; // move back one position
                
                // show result after shift - display the new state
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => index),
                    description: `shifted element, continuing search`
                });
            } else {
                break; // found the right spot, stop shifting
            }
        }
        
        // insert the current element - put it in its final position
        arr[j + 1] = current;
        
        // show final position - display where we put the element
        steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array.from({length: i + 1}, (_, index) => index),
            description: `inserted ${current} at position ${j + 1}`
        });
    }
    
    // final step - we're all done!
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index),
        description: "array is now sorted!"
    });
    
    return steps;
}