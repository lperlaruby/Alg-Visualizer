// Type definitions

export interface SortingStep {
    arrayChanges?: { index: number; value: number }[];
    comparingIndices: number[];
    swappingIndices: number[];
    sortedIndices: number[];
    description: string;
}

export type AlgorithmType = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick'; 
export type Language = 'typescript' | 'python'; 