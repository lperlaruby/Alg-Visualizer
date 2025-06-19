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

            {/* Visualization Area - this is where the bars are shown */}
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
                
                {/* Legend - explains what the colors mean */}
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
                        <span style={{ fontSize: '14px', color: '#495057' }}>Swapping</span>
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