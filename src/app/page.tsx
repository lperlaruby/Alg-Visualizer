"use client" // this is a client component

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import SortingVisualizer from "@/components/SortingVisualizer";
import Header from "@/components/Header";
import { bubbleSort, SortingStep } from '@/algorithms/bubbleSort';
import { selectionSort } from '@/algorithms/selectionSort';
import { insertionSort } from '@/algorithms/insertionSort';
import { mergeSort } from '@/algorithms/mergeSort';
import { quickSort } from '@/algorithms/quickSort';

export default function HomePage() {
  // all the state we need
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  // Add new state for visualization
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [description, setDescription] = useState<string>("");

  // Add new state for managing steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  // function to handle the algorithm change
  const handleAlgorithmChange = useCallback((algorithm: string) => {
    console.log("Algorithm changed to:", algorithm);
    setSelectedAlgorithm(algorithm);
  }, []);
  // function to handle the array size change
  const handleArraySizeChange = useCallback((size: number) => {
    console.log("Array size changed to:", size);
    //create a new array with the new size
    generateNewArray(size);
  }, []);
  
  // function to handle the speed change
  const handleSpeedChange = useCallback((speed: number) => {
    console.log("Speed changed to:", speed);
    setSpeed(speed);
  }, []);
  // function to generate a new array
  const generateNewArray = useCallback((size?: number) => {
    const newSize = size || arraySize;
    const newArray = Array.from({ length: newSize }, () => 
        Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    // Reset visualization state
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    console.log('Generated new array:', newArray);
  }, [arraySize]);

// function to handle the generate array button
const handleGenerateArray = useCallback(() => {
    generateNewArray();
}, [generateNewArray]);

// function to handle the start sort button
const handleStartSort = useCallback(() => {
    console.log('Starting sort with algorithm:', selectedAlgorithm);
    setIsSorting(true);
    setCurrentStepIndex(0);
    
    let steps: SortingStep[] = [];
    
    switch (selectedAlgorithm) {
        case 'bubble':
            steps = bubbleSort(array);
            break;
        case 'selection':
            steps = selectionSort(array);
            break;
        case 'insertion':
            steps = insertionSort(array);
            break;
        case 'merge':
            steps = mergeSort(array);
            break;
        case 'quick':
            steps = quickSort(array);
            break;
        default:
            steps = bubbleSort(array);
    }
    
    setSortingSteps(steps);
    
    const animateSort = () => {
        if (currentStepIndex < steps.length - 1) {
            setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
                animateSort();
            }, 2000 / speed);
        } else {
            setIsSorting(false);
        }
    };
    
    animateSort();
}, [selectedAlgorithm, array, speed, currentStepIndex]);

// function to handle the reset button
const handleReset = useCallback(() => {
    console.log('Resetting...');
    setIsSorting(false);
    setCurrentStepIndex(0);
    setSortingSteps([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setDescription("");
    generateNewArray();
}, [generateNewArray]);

// intial array when component mounts
useEffect(() => {
  generateNewArray();
}, []);

// Add useEffect to update visualization based on current step
useEffect(() => {
    if (sortingSteps.length > 0 && currentStepIndex < sortingSteps.length) {
        const currentStep = sortingSteps[currentStepIndex];
        setComparingIndices(currentStep.comparingIndices);
        setSwappingIndices(currentStep.swappingIndices);
        setSortedIndices(currentStep.sortedIndices);
        setDescription(currentStep.description);
    }
}, [currentStepIndex, sortingSteps]);

    return (
       <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f7f7f7', //light background    
       }}>
        <Header />
        <div style={{ 
          display: 'flex',
          flex: 1,
        }}>
          <Sidebar
              onAlgorithmChange={handleAlgorithmChange}
              onArraySizeChange={handleArraySizeChange}
              onSpeedChange={handleSpeedChange}
              onGenerateArray={handleGenerateArray}
              onStartSort={handleStartSort}
              onReset={handleReset}
              isSorting={isSorting}
          />
          <main style={{
            flex: 1,
            background: '#fff',
            margin: 40,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <SortingVisualizer 
              array={array}
              isSorting={isSorting}
              selectedAlgorithm={selectedAlgorithm}
              comparingIndices={comparingIndices}
              swappingIndices={swappingIndices}
              sortedIndices={sortedIndices}
              description={description}
            />
          </main>
        </div>
       </div>
    );
}