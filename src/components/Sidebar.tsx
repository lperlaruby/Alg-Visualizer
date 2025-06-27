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
    const [algorithmsOpen, setAlgorithmsOpen] = useState(true);

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
            width: "min(240px, 100%)",
            minWidth: "200px",
            maxWidth: "280px",
            background: "none",
            padding: isMobile ? "10px 8px 10px 8px" : "18px 16px 18px 16px",
            borderRadius: 0,
            boxShadow: "none",
            border: "none",
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            height: '100%',
        }}>

        {/* Algorithms Section */}
        <div style={{ marginBottom: 20 }}>
            <button
                onClick={() => setAlgorithmsOpen((open) => !open)}
                disabled={isSorting}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: "#374151",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: isSorting ? "not-allowed" : "pointer",
                    marginBottom: 4,
                    padding: "0 10px 0 10px",
                    boxSizing: "border-box",
                }}
            >
                <span style={{ fontSize: 15, fontWeight: 600 }}>Algorithms</span>
                <span style={{
                    fontSize: 15,
                    marginLeft: 10,
                    transition: "transform 0.2s",
                    transform: algorithmsOpen ? "rotate(180deg)" : "rotate(90deg)",
                    color: "#64748b"
                }}>
                    ^
                </span>
            </button>
            {algorithmsOpen && (
                <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 4, padding: "0 10px" }}>
                    {algorithms.map((algorithm) => (
                        <button
                            key={algorithm.id}
                            onClick={() => handleAlgorithmChange(algorithm.id)}
                            disabled={isSorting}
                            style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "8px 8px",
                                fontSize: 14,
                                border: "none",
                                borderRadius: 6,
                                background: selectedAlgorithm === algorithm.id ? "#f3f4f6" : "transparent",
                                color: selectedAlgorithm === algorithm.id ? "#111827" : "#374151",
                                fontWeight: selectedAlgorithm === algorithm.id ? 600 : 500,
                                cursor: isSorting ? "not-allowed" : "pointer",
                                transition: "background 0.2s, color 0.2s",
                            }}
                        >
                            {algorithm.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: '#e5e7eb', margin: '10px 0', border: 'none' }} />
        {/* array size control section */}
        <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", padding: "0 10px" }}>
            <h4 style={{ marginBottom: 8, color: "#333", fontSize: "14px", fontWeight: "600" }}>Array Size</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <input
                    type="range"
                    min="10"
                    max="200"
                    value={arraySize}
                    onChange={(e) => handleArraySizeChange(Number(e.target.value))}
                    disabled={isSorting}
                    style={{ flex: 1, height: 4, borderRadius: 2, background: "#e5e7eb", outline: "none", cursor: isSorting ? "not-allowed" : "pointer" }}
                />
                <span style={{ minWidth: 32, textAlign: "center", fontWeight: "600", color: "#1f2937", fontSize: "13px" }}>
                    {arraySize}
                </span>
            </div>
        </div>
        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: '#e5e7eb', margin: '10px 0', border: 'none' }} />
        {/* animation speed control section */}
        <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", padding: "0 10px" }}>
            <h4 style={{ marginBottom: 8, color: "#333", fontSize: "14px", fontWeight: "600" }}>Animation Speed</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={(e) => handleSpeedChange(Number(e.target.value))}
                    disabled={isSorting}
                    style={{ flex: 1, height: 4, borderRadius: 2, background: "#e5e7eb", outline: "none", cursor: isSorting ? "not-allowed" : "pointer" }}
                />
                <span style={{ minWidth: 32, textAlign: "center", fontWeight: "600", color: "#1f2937", fontSize: "13px" }}>
                    {speed}
                </span>
            </div>
        </div>
        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: '#e5e7eb', margin: '10px 0', border: 'none' }} />
        {/* legend section - always at the bottom */}
        <div style={{
            marginTop: "auto",
            background: "#f3f4f6",
            borderRadius: 8,
            boxShadow: "none",
            padding: "12px 10px",
            border: "1px solid #f3f4f6",
            minWidth: 0,
            marginBottom: 0,
        }}>
            <h4 style={{ marginBottom: 8, color: "#333", fontSize: "14px", fontWeight: "600" }}>Legend</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 18, height: 18, background: "#10b981", borderRadius: 4, boxShadow: "none" }}></div>
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: "500" }}>Sorted</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 18, height: 18, background: "#f59e0b", borderRadius: 4, boxShadow: "none" }}></div>
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: "500" }}>Comparing</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 18, height: 18, background: "#3b82f6", borderRadius: 4, boxShadow: "none" }}></div>
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: "500" }}>Unsorted</span>
                </div>
            </div>
        </div>
    </aside>
);
}