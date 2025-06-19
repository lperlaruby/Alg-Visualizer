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

// defining the algorithms im supporting - these are the sorting methods we can visualize
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
    // local state for controls - keep track of what user has selected
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
    const [arraySize, setArraySize] = useState(20);
    const [speed, setSpeed] = useState(50);

    // handlers for controls - these update local state and call parent functions
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
            width: "320px",
            background: "white", 
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            height: "fit-content",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            position: "sticky",
            top: "20px",
            border: "1px solid rgba(0,0,0,0.05)",
        }}>

        {/* Algorithm Selector Section - user picks which sorting method to use */}
        <div style={{ 
            marginBottom: 28,
            minHeight: "200px",
            display: "flex",
            flexDirection: "column"
        }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Select Algorithm</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {algorithms.map((algorithm) => (
                        <label 
                            key={algorithm.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "12px 16px",
                                background: selectedAlgorithm === algorithm.id ? "#f0f8ff" : "#fafafa",
                                border: selectedAlgorithm === algorithm.id ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                                borderRadius: 12,
                                cursor: isSorting ? "not-allowed" : "pointer",
                                opacity: isSorting ? 0.6 : 1,
                                transition: "all 0.2s ease",
                                boxShadow: selectedAlgorithm === algorithm.id ? "0 2px 8px rgba(59, 130, 246, 0.15)" : "none"
                            }}
                        >
                            <input
                                type="radio"
                                name="algorithm"
                                value={algorithm.id}
                                checked={selectedAlgorithm === algorithm.id}
                                onChange={(e) => handleAlgorithmChange(e.target.value)}
                                disabled={isSorting}
                                style={{ marginRight: 12 }}
                            />
                            <div>
                                <div style={{ fontWeight: "600", fontSize: 14, color: "#1f2937" }}>
                                    {algorithm.name}
                                </div>
                                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                                    {algorithm.description}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
               {/* Array Size Control Section - user can make array bigger or smaller */}
               <div style={{ 
                marginBottom: 28,
                minHeight: "120px",
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Array Size</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                    <input
                        type="range"
                        min="10"
                        max="200"
                        value={arraySize}
                        onChange={(e) => handleArraySizeChange(Number(e.target.value))}
                        disabled={isSorting}
                        style={{ 
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            background: "#e5e7eb",
                            outline: "none",
                            cursor: isSorting ? "not-allowed" : "pointer"
                        }}
                    />
                    <span style={{ 
                        minWidth: 40, 
                        textAlign: "center",
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "14px"
                    }}>
                        {arraySize}
                    </span>
                </div>
            </div>
                {/* Animation Speed Control Section - user controls how fast the animation plays */}
                <div style={{ 
                marginBottom: 28,
                minHeight: "120px",
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Animation Speed</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={speed}
                        onChange={(e) => handleSpeedChange(Number(e.target.value))}
                        disabled={isSorting}
                        style={{ 
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            background: "#e5e7eb",
                            outline: "none",
                            cursor: isSorting ? "not-allowed" : "pointer"
                        }}
                    />
                    <span style={{ 
                        minWidth: 40, 
                        textAlign: "center",
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "14px"
                    }}>
                        {speed}
                    </span>
                </div>
            </div>
            {/* Control Buttons Section - the main action buttons */}
            <div style={{ 
                marginBottom: 28,
                minHeight: "200px",
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Controls</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                    <button
                        onClick={onGenerateArray}
                        disabled={isSorting}
                        style={{
                            padding: "12px 20px",
                            background: "grey",
                            color: "white",
                            border: "none",
                            borderRadius: 12,
                            cursor: isSorting ? "not-allowed" : "pointer",
                            opacity: isSorting ? 0.6 : 1,
                            fontWeight: "600",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                            boxShadow: "grey"
                        }}
                        onMouseEnter={(e) => {
                            if (!isSorting) {
                                e.currentTarget.style.background = "grey";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSorting) {
                                e.currentTarget.style.background = "grey";
                                e.currentTarget.style.transform = "translateY(0)";
                            }
                        }}
                    >
                        Generate New Array
                    </button>
                    
                    <button
                        onClick={onStartSort}
                        disabled={isSorting}
                        style={{
                            padding: "12px 20px",
                            background: "grey",
                            color: "white",
                            border: "none",
                            borderRadius: 12,
                            cursor: isSorting ? "not-allowed" : "pointer",
                            opacity: isSorting ? 0.6 : 1,
                            fontWeight: "600",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                            boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)"
                        }}
                        onMouseEnter={(e) => {
                            if (!isSorting) {
                                e.currentTarget.style.background = "grey";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSorting) {
                                e.currentTarget.style.background = "#grey";
                                e.currentTarget.style.transform = "translateY(0)";
                            }
                        }}
                    >
                        Start Sorting
                    </button>
                    
                    <button
                        onClick={onReset}
                        disabled={isSorting}
                        style={{
                            padding: "12px 20px",
                            background: "grey",
                            color: "white",
                            border: "none",
                            borderRadius: 12,
                            cursor: isSorting ? "not-allowed" : "pointer",
                            opacity: isSorting ? 0.6 : 1,
                            fontWeight: "600",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                            boxShadow: "0 2px 4px rgba(107, 114, 128, 0.2)"
                        }}
                        onMouseEnter={(e) => {
                            if (!isSorting) {
                                e.currentTarget.style.background = "grey";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSorting) {
                                e.currentTarget.style.background = "#grey";
                                e.currentTarget.style.transform = "translateY(0)";
                            }
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
            {/*Legend Section - explains what the colors mean in the visualization */}
            <div style={{ 
                marginBottom: 24,
                minHeight: "120px",
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Legend</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ 
                            width: 24, 
                            height: 24, 
                            background: "#10b981",
                            borderRadius: 6,
                            boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)"
                        }}></div>
                        <span style={{ fontSize: 14, color: "#374151", fontWeight: "500"}}>Sorted</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ 
                            width: 24, 
                            height: 24, 
                            background: "#f59e0b",
                            borderRadius: 6,
                            boxShadow: "0 2px 4px rgba(245, 158, 11, 0.2)"
                        }}></div>
                        <span style={{ fontSize: 14, color: "#374151", fontWeight: "500"}}>Comparing</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ 
                            width: 24, 
                            height: 24, 
                            background: "#3b82f6",
                            borderRadius: 6,
                            boxShadow: "0 2px 4px rgba(59, 130, 246, 0.2)"
                        }}></div>
                        <span style={{ fontSize: 14, color: "#374151", fontWeight: "500"}}>Unsorted</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}