import { SortingStep } from './bubbleSort';

export function selectionSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    description: "Starting selection sort..."
  });

  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    //findng the minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      // Show comparison
      steps.push({
        array: [...arr],
        comparingIndices: [minIndex, j],
        swappingIndices: [],
        sortedIndices: Array.from({length: i}, (_, index) => index),
        description: `Comparing ${arr[minIndex]} with ${arr[j]}`
      });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // swapping if minimum is not already in position
    if (minIndex !== i) {
      // show swap
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [i, minIndex],
        sortedIndices: Array.from({length: i}, (_, index) => index),
        description: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`
      });
      
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      // show result
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: i + 1}, (_, index) => index),
        description: `Moved ${arr[minIndex]} to position ${i}`
      });
    } else {
      // element is already in correct position
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: i + 1}, (_, index) => index),
        description: `${arr[i]} is already in correct position`
      });
    }
  }
  
  // final step
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({length: n}, (_, index) => index),
    description: "Array is now sorted!"
  });
  
  return steps;
}
