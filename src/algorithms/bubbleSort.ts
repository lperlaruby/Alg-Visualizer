// bubble sort algorithm
export interface SortingStep {
    array: number[];
    comparingIndices: number[];
    swappingIndices: number[];
    sortedIndices: number[];
    description: string;
}

export function bubbleSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // making a copy to avoid mutating original
    
    // the initial step
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "Starting bubble sort..."
    });

    const n = arr.length;
    
    // outer loop to number of passes
    for (let i = 0; i < n - 1; i++) {
        // inner loop to compare adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            // shows which elements is being comparing
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index), // Elements from end are sorted
                description: `Comparing elements at positions ${j} and ${j + 1}`
            });

            // if need to swap, show the swap
            if (arr[j] > arr[j + 1]) {
                // show swapping state
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                    description: `Swapping ${arr[j]} and ${arr[j + 1]}`
                });

                //swap the elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // show result after swap
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                    description: `Swapped ${arr[j + 1]} and ${arr[j]}`
                });
            }
        }
    }

    // final step showing sorted array
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index), // All elements are sorted
        description: "Array is now sorted!"
    });

    return steps;
}