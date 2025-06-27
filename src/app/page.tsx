"use client" // this is a client component

import { useState, useCallback, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import SortingVisualizer from "@/components/SortingVisualizer";
import Header from "@/components/Header";
import { bubbleSort, SortingStep } from '@/algorithms/bubbleSort';
import { selectionSort } from '@/algorithms/selectionSort';
import { insertionSort } from '@/algorithms/insertionSort';
import { mergeSort } from '@/algorithms/mergeSort';
import { quickSort } from '@/algorithms/quickSort';
import CodeDisplay from "@/components/CodeDisplay";
import Controls from "@/components/Controls";
import { useResponsive } from '@/utils/useResponsive';

export default function HomePage() {
  // all the state we need to track everything
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  // add new state for visualization - need to track what's happening at each step
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [description, setDescription] = useState<string>("");

  // add new state for managing steps - this will hold all the animation frames
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  const [isPaused, setIsPaused] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get responsive utilities
  const { isMobile } = useResponsive();

  // function to generate new array - creates random numbers
  const generateNewArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentStepIndex(0);
    setSortingSteps([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setDescription("");
  }, [arraySize]);

  // function to handle algorithm change - user picked a different sorting method
  const handleAlgorithmChange = useCallback((algorithm: string) => {
    console.log("Algorithm changed to:", algorithm);
    setSelectedAlgorithm(algorithm);
  }, []);
  
  // function to handle array size change - user wants bigger/smaller array
  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    generateNewArray();
  }, [generateNewArray]);
  
  // function to handle speed change - user wants faster/slower animation
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);
  
  // function to handle the generate array button - user clicked the button
  const handleGenerateArray = useCallback(() => {
    generateNewArray();
  }, [generateNewArray]);

  // function to handle the start sort button - this is where the magic happens
  const handleStartSort = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }

    console.log('Starting sort with algorithm:', selectedAlgorithm);
    setIsSorting(true);
    setCurrentStepIndex(0);
    setAnimationSpeed(1);
    
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
  }, [selectedAlgorithm, array, isPaused]);

  // function to handle pause
  const handlePause = useCallback(() => {
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // function to handle fast forward
  const handleFastForward = useCallback(() => {
    setAnimationSpeed(prev => Math.min(prev * 2, 8));
  }, []);

  // function to handle the reset button - clear everything and start fresh
  const handleReset = useCallback(() => {
    console.log('Resetting...');
    setIsSorting(false);
    setIsPaused(false);
    setAnimationSpeed(1);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentStepIndex(0);
    setSortingSteps([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setDescription("");
    generateNewArray();
  }, [generateNewArray]);

  // initial array when component mounts - gotta have something to look at
  useEffect(() => {
    generateNewArray();
  }, []);

  // add useEffect to update visualization based on current step - this updates the colors and text
  useEffect(() => {
    if (sortingSteps.length > 0 && currentStepIndex < sortingSteps.length) {
        const currentStep = sortingSteps[currentStepIndex];
        setComparingIndices(currentStep.comparingIndices);
        setSwappingIndices(currentStep.swappingIndices);
        setSortedIndices(currentStep.sortedIndices);
        setDescription(currentStep.description);
    }
  }, [currentStepIndex, sortingSteps]);

  // animation effect - this controls the timing of each step
  useEffect(() => {
    if (sortingSteps.length > 0 && currentStepIndex < sortingSteps.length - 1 && isSorting && !isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 2000 / (speed * animationSpeed));
    } else if (currentStepIndex >= sortingSteps.length - 1 && isSorting) {
      // we're done sorting, reset everything
      setIsSorting(false);
      setIsPaused(false);
      setAnimationSpeed(1);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentStepIndex, sortingSteps, isSorting, isPaused, speed, animationSpeed]);

    return (
       <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f7f7f7', // light background    
       }}>
        <Header />
        <div style={{ 
          display: 'flex',
          flex: 1,
          padding: isMobile ? '10px' : '20px',
          gap: isMobile ? '10px' : '20px',
          minWidth: 0, // Add this to prevent flex items from overflowing
          flexWrap: 'wrap', // Allow wrapping on very small screens
        }}>
          {/* sidebar with algorithm selection and settings */}
          <Sidebar
              onAlgorithmChange={handleAlgorithmChange}
              onArraySizeChange={handleArraySizeChange}
              onSpeedChange={handleSpeedChange}
              isSorting={isSorting}
          />
          {/* main content area */}
          <main style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '15px' : '30px',
            minWidth: 0, // Add this to prevent flex items from overflowing
            overflow: 'hidden', // Add this to prevent content from breaking layout
            minHeight: 'fit-content', // Ensure it takes at least the content height
          }}>
            {/* control buttons for the visualization */}
            <Controls 
                onGenerateArray={handleGenerateArray}
                onStartSort={handleStartSort}
                onPauseSort={handlePause}
                onReset={handleReset}
                onFastForward={handleFastForward}
                isSorting={isSorting}
                isPaused={isPaused}
            />
            {/* code display showing the current algorithm */}
            <CodeDisplay selectedAlgorithm={selectedAlgorithm} />
            {/* container for the sorting visualizer */}
            <div style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              flex: 1,
              minWidth: 0, // Add this to prevent flex items from overflowing
              minHeight: '400px', // Minimum height to ensure visualization is visible
            }}>
              {/* the main sorting visualization component */}
              <SortingVisualizer 
                array={sortingSteps[currentStepIndex]?.array || array}
                isSorting={isSorting}
                selectedAlgorithm={selectedAlgorithm}
                comparingIndices={comparingIndices}
                swappingIndices={swappingIndices}
                sortedIndices={sortedIndices}
                description={description}
              />
            </div>
          </main>
        </div>
       </div>
    );
}