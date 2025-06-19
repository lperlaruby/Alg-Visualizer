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
  // all the state we need to track everything
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  // Add new state for visualization - need to track what's happening at each step
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [description, setDescription] = useState<string>("");

  // Add new state for managing steps - this will hold all the animation frames
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  // function to handle the algorithm change - user picked a different sorting method
  const handleAlgorithmChange = useCallback((algorithm: string) => {
    console.log("Algorithm changed to:", algorithm);
    setSelectedAlgorithm(algorithm);
  }, []);
  
  // function to handle the array size change - user wants bigger or smaller array
  const handleArraySizeChange = useCallback((size: number) => {
    console.log("Array size changed to:", size);
    //create a new array with the new size
    generateNewArray(size);
  }, []);
  
  // function to handle the speed change - user wants faster or slower animation
  const handleSpeedChange = useCallback((speed: number) => {
    console.log("Speed changed to:", speed);
    setSpeed(speed);
  }, []);
  
  // function to generate a new array - creates random numbers for visualization
  const generateNewArray = useCallback((size?: number) => {
    const newSize = size || arraySize;
    const newArray = Array.from({ length: newSize }, () => 
        Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    // Reset visualization state - clear all the colors and descriptions
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    console.log('Generated new array:', newArray);
  }, [arraySize]);

// function to handle the generate array button - user clicked the button
const handleGenerateArray = useCallback(() => {
    generateNewArray();
}, [generateNewArray]);

// function to handle the start sort button - this is where the magic happens
const handleStartSort = useCallback(() => {
    console.log('Starting sort with algorithm:', selectedAlgorithm);
    setIsSorting(true);
    setCurrentStepIndex(0);
    
    let steps: SortingStep[] = [];
    
    // figure out which algorithm to run based on what user selected
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
            steps = bubbleSort(array); // fallback to bubble sort
    }
    
    setSortingSteps(steps);
    
    // this function animates through all the steps with delays
    const animateSort = () => {
        if (currentStepIndex < steps.length - 1) {
            setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
                animateSort(); // recursive call to keep going
            }, 2000 / speed); // speed controls how fast we go through steps
        } else {
            setIsSorting(false); // we're done!
        }
    };
    
    animateSort();
}, [selectedAlgorithm, array, speed, currentStepIndex]);

// function to handle the reset button - clear everything and start fresh
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

// intial array when component mounts - gotta have something to look at
useEffect(() => {
  generateNewArray();
}, []);

// Add useEffect to update visualization based on current step - this updates the colors and text
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
          padding: '20px',
          gap: '20px',
          position: 'relative',
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
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
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