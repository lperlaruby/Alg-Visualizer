import { SortingStep } from './bubbleSort';

export function selectionSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array]; // copy the array so we don't mess up the original
  
  // starting step - show the initial state
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    description: "starting selection sort..."
  });

  const n = arr.length;
  
  // main loop - find the minimum and put it in the right place
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // assume current position has the minimum
    
    // finding the minimum element in unsorted portion - scan through remaining elements
    for (let j = i + 1; j < n; j++) {
      // show comparison - highlight what we're comparing
      steps.push({
        array: [...arr],
        comparingIndices: [minIndex, j],
        swappingIndices: [],
        sortedIndices: Array.from({length: i}, (_, index) => index),
        description: `comparing ${arr[minIndex]} with ${arr[j]}`
      });
      
      // if we found a smaller element, update our minimum
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // swapping if minimum is not already in position - only swap if needed
    if (minIndex !== i) {
      // show swap - highlight the elements being swapped
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [i, minIndex],
        sortedIndices: Array.from({length: i}, (_, index) => index),
        description: `swapping ${arr[i]} with minimum ${arr[minIndex]}`
      });
      
      // do the actual swap
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      // show result - display the new state after swap
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: i + 1}, (_, index) => index),
        description: `moved ${arr[minIndex]} to position ${i}`
      });
    } else {
      // element is already in correct position - no swap needed
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: i + 1}, (_, index) => index),
        description: `${arr[i]} is already in correct position`
      });
    }
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
