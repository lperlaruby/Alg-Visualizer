import ArrayBars from './ArrayBars';

interface SortingVisualizerProps {
    array: number[];
    isSorting: boolean;
    selectedAlgorithm: string;
    comparingIndices?: number[];
    swappingIndices?: number[];
    sortedIndices?: number[];
    description?: string;
}

export default function SortingVisualizer({ 
    array, 
    isSorting, 
    selectedAlgorithm,
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = [],
    description = ""
}: SortingVisualizerProps) {
    return (
        <div style={{ 
            flex: 1, 
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            {/* Header Section */}
            <div style={{
                textAlign: 'center',
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
                    Algorithm Visualizer
                </h1>
                <p style={{ margin: '10px 0 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
                    {selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Sort
                </p>
            </div>

            {/* Status Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '1px solid #e9ecef'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span style={{ fontWeight: 'bold', color: '#495057' }}>
                        Array Size: <span style={{ color: '#007bff' }}>{array.length}</span>
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#495057' }}>
                        Max Value: <span style={{ color: '#007bff' }}>{Math.max(...array)}</span>
                    </span>
                </div>
                <div style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    background: isSorting ? '#ffc107' : '#28a745',
                    color: isSorting ? '#000' : '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}>
                    {isSorting ? '🔄 Sorting...' : '✅ Ready'}
                </div>
            </div>

            {/* Description Display */}
            {description && (
                <div style={{
                    padding: '15px 20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef',
                    textAlign: 'center'
                }}>
                    <p style={{ 
                        margin: 0, 
                        fontSize: '16px', 
                        color: '#495057',
                        fontWeight: '500'
                    }}>
                        {description}
                    </p>
                </div>
            )}

            {/* Visualization Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <ArrayBars 
                    array={array}
                    comparingIndices={comparingIndices}
                    swappingIndices={swappingIndices}
                    sortedIndices={sortedIndices}
                />
                
                {/* Legend */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    padding: '15px',
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#6c757d',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#495057' }}>Unsorted</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#ffc107',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#495057' }}>Comparing</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#dc3545',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#black' }}>Swapping</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#28a745',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#495057' }}>Sorted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}