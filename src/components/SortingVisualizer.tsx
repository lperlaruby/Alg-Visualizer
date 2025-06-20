import ArrayBars from './ArrayBars';

// interface for the sorting visualizer props - defines what data we need
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

            {/* visualization area - this is where the bars are shown */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {/* the main array bars component that shows the actual visualization */}
                <ArrayBars 
                    array={array}
                    comparingIndices={comparingIndices}
                    swappingIndices={swappingIndices}
                    sortedIndices={sortedIndices}
                />
                
                {/* legend - explains what the colors mean */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    padding: '15px',
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    {/* unsorted elements - gray color */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#6c757d',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#495057' }}>Unsorted</span>
                    </div>
                    {/* comparing elements - yellow color */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#ffc107',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#495057' }}>Comparing</span>
                    </div>
                    {/* swapping elements - red color */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#dc3545',
                            borderRadius: '4px'
                        }}></div>
                        <span style={{ fontSize: '14px', color: '#495057' }}>Swapping</span>
                    </div>
                    {/* sorted elements - green color */}
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