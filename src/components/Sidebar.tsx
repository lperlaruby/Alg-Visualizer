import { useState } from "react";
import { useResponsive } from '@/utils/useResponsive';

// interface for the sidebar component props - defines what callbacks we need
interface SidebarProps {
    onAlgorithmChange: (algorithm: string) => void;
    onArraySizeChange: (size: number) => void;
    onSpeedChange: (speed: number) => void;
    isSorting: boolean;
}

// defining the algorithms i'm supporting - these are the sorting methods we can visualize
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
    isSorting,
}: SidebarProps) {
    // local state for controls - keep track of what user has selected
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
    const [arraySize, setArraySize] = useState(20);
    const [speed, setSpeed] = useState(50);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Get responsive utilities
    const { isMobile } = useResponsive();

    // handlers for controls - these update local state and call parent functions
    const handleAlgorithmChange = (algorithmId: string) => {
        setSelectedAlgorithm(algorithmId); // update local state
        onAlgorithmChange(algorithmId); // call parent handler
        setIsDropdownOpen(false); // close dropdown after selection
    };

    const handleArraySizeChange = (size: number) => {
        setArraySize(size); // update local state
        onArraySizeChange(size); // call parent handler
    };

    const handleSpeedChange = (speed: number) => {
        setSpeed(speed); // update local state
        onSpeedChange(speed); // call parent handler
    };

    // find the currently selected algorithm data for display
    const selectedAlgorithmData = algorithms.find(alg => alg.id === selectedAlgorithm);

    return (
        <aside style={{ 
            width: "min(320px, 100%)",
            minWidth: "280px",
            maxWidth: "320px",
            background: "white", 
            padding: isMobile ? "16px" : "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0, // Prevent sidebar from shrinking
        }}>

        {/* algorithm selector section - user picks which sorting method to use */}
        <div style={{ 
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
            position: "relative"
        }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Select Algorithm</h4>
                
                {/* dropdown button - shows current selection and opens dropdown */}
                <button
                    onClick={() => !isSorting && setIsDropdownOpen(!isDropdownOpen)}
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
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "left",
                        width: "100%"
                    }}
                    onMouseEnter={(e) => {
                        if (!isSorting) {
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSorting) {
                            e.currentTarget.style.transform = "translateY(0)";
                        }
                    }}
                >
                    <div>
                        <div style={{ fontWeight: "600", fontSize: 14 }}>
                            {selectedAlgorithmData?.name}
                        </div>
                        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                            {selectedAlgorithmData?.description}
                        </div>
                    </div>
                    {/* dropdown arrow that rotates when open */}
                    <div style={{ 
                        transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        fontSize: "12px"
                    }}>
                        ▼
                    </div>
                </button>

                {/* dropdown options - list of available algorithms */}
                {isDropdownOpen && !isSorting && (
                    <div style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        marginTop: 4,
                        maxHeight: "300px",
                        overflowY: "auto"
                    }}>
                        {algorithms.map((algorithm) => (
                            <button
                                key={algorithm.id}
                                onClick={() => handleAlgorithmChange(algorithm.id)}
                                style={{
                                    width: "100%",
                                    padding: "12px 20px",
                                    background: selectedAlgorithm === algorithm.id ? "#f0f8ff" : "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    transition: "all 0.2s ease",
                                    borderBottom: "1px solid #f3f4f6"
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedAlgorithm !== algorithm.id) {
                                        e.currentTarget.style.background = "#f9fafb";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedAlgorithm !== algorithm.id) {
                                        e.currentTarget.style.background = "transparent";
                                    }
                                }}
                            >
                                <div style={{ fontWeight: "600", fontSize: 14, color: "#1f2937" }}>
                                    {algorithm.name}
                                </div>
                                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                                    {algorithm.description}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
               {/* array size control section - user can make array bigger or smaller */}
               <div style={{ 
                marginBottom: 28,
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Array Size</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                    {/* slider for array size control */}
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
                    {/* display current array size value */}
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
                {/* animation speed control section - user controls how fast the animation plays */}
                <div style={{ 
                marginBottom: 28,
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Animation Speed</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                    {/* slider for animation speed control */}
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
                    {/* display current speed value */}
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
            {/* legend section - explains what the colors mean in the visualization */}
            <div style={{ 
                marginTop: 'auto',
                display: "flex",
                flexDirection: "column",
                gap: 12
            }}>
                <h4 style={{ marginBottom: 16, color: "#333", fontSize: "16px", fontWeight: "600" }}>Legend</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* sorted elements - green color */}
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
                    {/* comparing elements - orange color */}
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
                    {/* unsorted elements - blue color */}
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