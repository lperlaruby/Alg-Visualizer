import React from 'react';

interface ControlsProps {
    onGenerateArray: () => void;
    onStartSort: () => void;
    onReset: () => void;
    isSorting: boolean;
}

export default function Controls({ 
    onGenerateArray, 
    onStartSort, 
    onReset, 
    isSorting 
}: ControlsProps) {
    return (
        <div style={{
            display: 'flex',
            gap: '12px',
            padding: '15px 20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            marginBottom: '20px',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    onClick={onReset}
                    disabled={isSorting}
                    style={{
                        padding: "8px 16px",
                        background: "grey",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        cursor: isSorting ? "not-allowed" : "pointer",
                        opacity: isSorting ? 0.6 : 1,
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(107, 114, 128, 0.2)"
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
                    Reset
                </button>
                
                <button
                    onClick={onStartSort}
                    disabled={isSorting}
                    style={{
                        padding: "8px 16px",
                        background: "grey",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        cursor: isSorting ? "not-allowed" : "pointer",
                        opacity: isSorting ? 0.6 : 1,
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)"
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
                    Start Sorting
                </button>
                
                <button
                    onClick={onGenerateArray}
                    disabled={isSorting}
                    style={{
                        padding: "8px 16px",
                        background: "grey",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        cursor: isSorting ? "not-allowed" : "pointer",
                        opacity: isSorting ? 0.6 : 1,
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        boxShadow: "grey"
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
                    Generate New Array
                </button>
            </div>

            <div style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: isSorting ? '#ffc107' : 'black',
                color: isSorting ? '#000' : '#fff',
                fontWeight: 'bold',
                fontSize: '14px'
            }}>
                {isSorting ? '🔄 Sorting...' : 'Ready'}
            </div>
        </div>
    );
}
