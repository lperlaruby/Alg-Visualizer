"use client" // this is a client component

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import SortingVisualizer from "@/components/SortingVisualizer";

export default function HomePage() {
  // all the state we need
  const [array, setArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

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
    // set the new array
    setArray(newArray);
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
    // TODO: Implement actual sorting logic
    // For now, just simulate sorting
    setTimeout(() => {
        setIsSorting(false);
        console.log('Sorting completed');
    }, 2000);
}, [selectedAlgorithm]);

// function to handle the reset button
const handleReset = useCallback(() => {
    console.log('Resetting...');
    setIsSorting(false);
    generateNewArray();
}, [generateNewArray]);

// intial array when component mounts
useEffect(() => {
  generateNewArray();
}, []);

    return (
       <div style={{ 
        display: 'flex',
        minHeight: '100vh',
        background: '#f7f7f7', //light background    
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
          />
        </main>
       </div>
    );
}