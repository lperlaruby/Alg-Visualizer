"use client" // this is a client component

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import SortingVisualizer from "@/components/SortingVisualizer";
import Header from "@/components/Header";
import { bubbleSort, reconstructArrayAtStep } from '@/algorithms/bubbleSort';
import { SortingStep, AlgorithmType } from '@/types';
import { selectionSort } from '@/algorithms/selectionSort';
import { insertionSort } from '@/algorithms/insertionSort';
import { mergeSort } from '@/algorithms/mergeSort';
import { quickSort } from '@/algorithms/quickSort';
import CodeDisplay from "@/components/CodeDisplay";
import Controls from "@/components/Controls";
import { useResponsive } from '@/utils/useResponsive';

const algorithmMap = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort
} as const;

export default function HomePage() {
    const [array, setArray] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>("bubble");
    const [arraySize, setArraySize] = useState(20);
    const [speed, setSpeed] = useState(50);
    const [isSorting, setIsSorting] = useState(false);

    // Batched visualization state
    const [visualizationState, setVisualizationState] = useState({
        comparingIndices: [] as number[],
        swappingIndices: [] as number[],
        sortedIndices: [] as number[],
        description: ""
    });

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [displayMode, setDisplayMode] = useState<'code' | 'explanation'>('code');

    const { isMobile } = useResponsive();

    // Memoized current array reconstruction
    const currentArray = useMemo(() => {
        if (sortingSteps.length === 0) return array;
        return reconstructArrayAtStep(array, sortingSteps, currentStepIndex);
    }, [array, sortingSteps, currentStepIndex]);

    const generateNewArray = useCallback(() => {
        const newArray = Array.from({ length: arraySize }, () => 
            Math.floor(Math.random() * 100) + 1
        );
        setArray(newArray);
        setCurrentStepIndex(0);
        setSortingSteps([]);
        setVisualizationState({
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: [],
            description: ""
        });
    }, [arraySize]);

    const handleAlgorithmChange = useCallback((algorithm: string) => {
        setSelectedAlgorithm(algorithm as AlgorithmType);
    }, []);
    
    const handleArraySizeChange = useCallback((size: number) => {
        setArraySize(size);
        generateNewArray();
    }, [generateNewArray]);
    
    const handleSpeedChange = useCallback((newSpeed: number) => {
        setSpeed(newSpeed);
    }, []);
    
    const handleGenerateArray = useCallback(() => {
        generateNewArray();
    }, [generateNewArray]);

    const handleStartSort = useCallback(() => {
        if (isPaused) {
            setIsPaused(false);
            return;
        }

        setIsSorting(true);
        setCurrentStepIndex(0);
        setAnimationSpeed(1);
        
        const steps = algorithmMap[selectedAlgorithm](array);
        setSortingSteps(steps);
    }, [selectedAlgorithm, array, isPaused]);

    const handlePause = useCallback(() => {
        setIsPaused(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const handleFastForward = useCallback(() => {
        setAnimationSpeed(prev => Math.min(prev * 2, 8));
    }, []);

    const handleReset = useCallback(() => {
        setIsSorting(false);
        setIsPaused(false);
        setAnimationSpeed(1);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setCurrentStepIndex(0);
        setSortingSteps([]);
        setVisualizationState({
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: [],
            description: ""
        });
        generateNewArray();
    }, [generateNewArray]);

    const handleShowExplanation = useCallback(() => {
        setDisplayMode('explanation');
    }, []);

    const handleShowCode = useCallback(() => {
        setDisplayMode('code');
    }, []);

    useEffect(() => {
        generateNewArray();
    }, []);

    // Batched visualization state updates
    useEffect(() => {
        if (sortingSteps.length > 0 && currentStepIndex < sortingSteps.length) {
            const currentStep = sortingSteps[currentStepIndex];
            setVisualizationState({
                comparingIndices: currentStep.comparingIndices,
                swappingIndices: currentStep.swappingIndices,
                sortedIndices: currentStep.sortedIndices,
                description: currentStep.description
            });
        }
    }, [currentStepIndex, sortingSteps]);

    // Optimized animation timing
    useEffect(() => {
        if (sortingSteps.length > 0 && currentStepIndex < sortingSteps.length - 1 && isSorting && !isPaused) {
            timeoutRef.current = setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
            }, 2000 / (speed * animationSpeed));
        } else if (currentStepIndex >= sortingSteps.length - 1 && isSorting) {
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
        background: '#fff', // White background to match header
       }}>
        <Header />
        <div style={{ 
          display: 'flex',
          flex: 1,
          padding: isMobile ? '10px' : '20px',
          gap: isMobile ? '10px' : '20px',
          minWidth: 0,
          flexWrap: 'wrap',
          borderTop: '1.5px solid #d1d5db', // Darker line below header
        }}>
          {/* Sidebar wrapper with full-height border */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            minHeight: '0', 
            minWidth: '0',
            marginTop: '-20px', // Extend to touch header border
            paddingTop: '20px', // Compensate for the negative margin
          }}>
            {/* Full-height border line */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '1.5px',
              height: '100%',
              background: '#d1d5db',
              zIndex: 1,
            }} />
            
            <Sidebar
                onAlgorithmChange={handleAlgorithmChange}
                onArraySizeChange={handleArraySizeChange}
                onSpeedChange={handleSpeedChange}
                isSorting={isSorting}
            />
          </div>
          {/* main content area */}
          <main style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '20px' : '24px',
            minWidth: 0,
            overflow: 'hidden',
            minHeight: 'fit-content',
          }}>
            {/* control buttons for the visualization */}
            <Controls 
                onGenerateArray={handleGenerateArray}
                onStartSort={handleStartSort}
                onPauseSort={handlePause}
                onReset={handleReset}
                onFastForward={handleFastForward}
                onShowExplanation={handleShowExplanation}
                onShowCode={handleShowCode}
                isSorting={isSorting}
                isPaused={isPaused}
                displayMode={displayMode}
            />
            {/* code display showing the current algorithm */}
            <CodeDisplay selectedAlgorithm={selectedAlgorithm} displayMode={displayMode} />
            {/* the main sorting visualization component */}
            <SortingVisualizer 
              array={currentArray}
              isSorting={isSorting}
              selectedAlgorithm={selectedAlgorithm}
              comparingIndices={visualizationState.comparingIndices}
              swappingIndices={visualizationState.swappingIndices}
              sortedIndices={visualizationState.sortedIndices}
              description={visualizationState.description}
            />
          </main>
        </div>
       </div>
    );
}