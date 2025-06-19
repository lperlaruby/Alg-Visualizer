import { useState } from "react";

interface SidebarProps {
    onAlgorithmChange: (algorithm: string) => void;
    onArraySizeChange: (size: number) => void;
    onSpeedChange: (speed: number) => void;
    onGenerateArray: () => void;
    onStartSort:() => void;
    onReset: () => void;
    isSorting: boolean;
}

// defining the algorithms im supporting
const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', description: 'Simple but slow O(n²)' },
    { id: 'selection', name: 'Selection Sort', description: 'Simple, O(n²)' },
    { id: 'insertion', name: 'Insertion Sort', description: 'Good for small arrays' },
    { id: 'merge', name: 'Merge Sort', description: 'Efficient, O(n log n)' },
    { id: 'quick', name: 'Quick Sort', description: 'Fast average case' }
];

export default function Sidebar({
    onAlgorithmChange,
    onArraySizeChange,
    onSpeedChange,
    onGenerateArray,
    onStartSort,
    onReset,
    isSorting,
}: SidebarProps) {
    // local state for controls
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
    const [arraySize, setArraySize] = useState(20);
    const [speed, setSpeed] = useState(50);

    // handlers for controls
    const handleAlgorithmChange = (algorithmId: string) => {
        setSelectedAlgorithm(algorithmId); //update local state
        onAlgorithmChange(algorithmId); //call parent handler
    };

    const handleArraySizeChange = (size: number) => {
        setArraySize(size); //update local state
        onArraySizeChange(size); //call parent handler
    };

    const handleSpeedChange = (speed: number) => {
        setSpeed(speed); //update local state
        onSpeedChange(speed); //call parent handler
    };

    return (
        <aside style={{ 
            width: 250, 
            background: "f5f5f5", 
            padding: 20,
            borderRight: "1px solid #ddd",
            height: "100vh",
            overflowY: "auto",            
        }}>
        <h3 style={{ marginTop: 0, color: "#333" }}>Algorithm Visualizer</h3>

        {/* Algorithm Selector Section*/}
        <div style={{ marginBottom: 24 }}>
                <h4 style={{ marginBottom: 12, color: "#555" }}>Select Algorithm</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {algorithms.map((algorithm) => (
                        <label 
                            key={algorithm.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "8px 12px",
                                background: selectedAlgorithm === algorithm.id ? "#e3f2fd" : "#fff",
                                border: "1px solid #ddd",
                                borderRadius: 6,
                                cursor: isSorting ? "not-allowed" : "pointer",
                                opacity: isSorting ? 0.6 : 1
                            }}
                        >
                            <input
                                type="radio"
                                name="algorithm"
                                value={algorithm.id}
                                checked={selectedAlgorithm === algorithm.id}
                                onChange={(e) => handleAlgorithmChange(e.target.value)}
                                disabled={isSorting}
                                style={{ marginRight: 8 }}
                            />
                            <div>
                                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                                    {algorithm.name}
                                </div>
                                <div style={{ fontSize: 12, color: "#666" }}>
                                    {algorithm.description}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
               {/* Array Size Control Section */}
               <div style={{ marginBottom: 24 }}>
                <h4 style={{ marginBottom: 12, color: "#555" }}>Array Size</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        value={arraySize}
                        onChange={(e) => handleArraySizeChange(Number(e.target.value))}
                        disabled={isSorting}
                        style={{ flex: 1 }}
                    />
                    <span style={{ 
                        minWidth: 30, 
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#333"
                    }}>
                        {arraySize}
                    </span>
                </div>
            </div>
                {/* Animation Speed Control Section */}
                <div style={{ marginBottom: 24 }}>
                <h4 style={{ marginBottom: 12, color: "#555" }}>Animation Speed</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={speed}
                        onChange={(e) => handleSpeedChange(Number(e.target.value))}
                        disabled={isSorting}
                        style={{ flex: 1 }}
                    />
                    <span style={{ 
                        minWidth: 30, 
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#333"
                    }}>
                        {speed}
                    </span>
                </div>
            </div>
            {/* Control Buttons Section*/}
            <div style={{ marginBottom: 24 }}>
                <h4 style={{ marginBottom: 12, color: "#555" }}>Controls</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button
                        onClick={onGenerateArray}
                        disabled={isSorting}
                        style={{
                            padding: "10px 16px",
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: isSorting ? "not-allowed" : "pointer",
                            opacity: isSorting ? 0.6 : 1,
                            fontWeight: "bold"
                        }}
                    >
                        Generate New Array
                    </button>
                    
                    <button
                        onClick={onStartSort}
                        disabled={isSorting}
                        style={{
                            padding: "10px 16px",
                            background: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: isSorting ? "not-allowed" : "pointer",
                            opacity: isSorting ? 0.6 : 1,
                            fontWeight: "bold"
                        }}
                    >
                        Start Sorting
                    </button>
                    
                    <button
                        onClick={onReset}
                        disabled={isSorting}
                        style={{
                            padding: "10px 16px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: isSorting ? "not-allowed" : "pointer",
                            opacity: isSorting ? 0.6 : 1,
                            fontWeight: "bold"
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
            {/*Legend Section */}
            <div style={{ marginBottom: 24 }}>
                <h4 style={{ marginBottom: 12, color: "#555" }}>Legend</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ 
                            width: 20, 
                            height: 20, 
                            background: "#4CAF50",
                            borderRadius: 3
                        }}></div>
                        <span style={{ fontSize: 14 }}>Sorted</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ 
                            width: 20, 
                            height: 20, 
                            background: "#FF9800",
                            borderRadius: 3
                        }}></div>
                        <span style={{ fontSize: 14 }}>Comparing</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ 
                            width: 20, 
                            height: 20, 
                            background: "#2196F3",
                            borderRadius: 3
                        }}></div>
                        <span style={{ fontSize: 14 }}>Unsorted</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}