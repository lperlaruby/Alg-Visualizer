import { SortingStep } from '@/types';

export function selectionSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  
  steps.push({
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    description: "Starting selection sort..."
  });

  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        comparingIndices: [minIndex, j],
        swappingIndices: [],
        sortedIndices: Array.from({length: i}, (_, index) => index),
        description: `Comparing ${arr[minIndex]} with ${arr[j]}`
      });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      steps.push({
        comparingIndices: [],
        swappingIndices: [i, minIndex],
        sortedIndices: Array.from({length: i}, (_, index) => index),
        description: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`
      });
      
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      steps.push({
        arrayChanges: [
          { index: i, value: arr[i] },
          { index: minIndex, value: arr[minIndex] }
        ],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: i + 1}, (_, index) => index),
        description: `Moved ${arr[i]} to position ${i}`
      });
    } else {
      steps.push({
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({length: i + 1}, (_, index) => index),
        description: `${arr[i]} is already in correct position`
      });
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
