// bubble sort algorithm - the classic simple sorting method
export interface SortingStep {
    array: number[];
    comparingIndices: number[];
    swappingIndices: number[];
    sortedIndices: number[];
    description: string;
}

export function bubbleSort(array: number[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array]; // making a copy to avoid mutating original array
    
    // the initial step - show the starting state
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        description: "starting bubble sort..."
    });

    const n = arr.length;
    
    // outer loop to number of passes - each pass puts the largest element in place
    for (let i = 0; i < n - 1; i++) {
        // inner loop to compare adjacent elements - bubble up the largest value
        for (let j = 0; j < n - i - 1; j++) {
            // shows which elements is being comparing - highlight the current pair
            steps.push({
                array: [...arr],
                comparingIndices: [j, j + 1],
                swappingIndices: [],
                sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index), // elements from end are sorted
                description: `comparing elements at positions ${j} and ${j + 1}`
            });

            // if need to swap, show the swap - only swap if left is bigger than right
            if (arr[j] > arr[j + 1]) {
                // show swapping state - highlight the elements being swapped
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [j, j + 1],
                    sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                    description: `swapping ${arr[j]} and ${arr[j + 1]}`
                });

                // swap the elements - the actual swap operation
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // show result after swap - display the new state
                steps.push({
                    array: [...arr],
                    comparingIndices: [],
                    swappingIndices: [],
                    sortedIndices: Array.from({length: i}, (_, index) => n - 1 - index),
                    description: `swapped ${arr[j + 1]} and ${arr[j]}`
                });
            }
        }
    }

    // final step showing sorted array - we're done!
    steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: n}, (_, index) => index), // all elements are sorted
        description: "array is now sorted!"
    });

    return steps;
}