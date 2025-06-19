interface ArrayBarsProps {
    array: number[];
    comparingIndices?: number[];
    swappingIndices?: number[];
    sortedIndices?: number[];
}

export default function ArrayBars({ 
    array, 
    comparingIndices = [], 
    swappingIndices = [], 
    sortedIndices = [] 
}: ArrayBarsProps) {
    const maxValue = Math.max(...array); // need this to calculate relative heights
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            gap: '2px',
            height: '400px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            overflowX: array.length > 50 ? 'auto' : 'hidden', // scroll if too many bars
            overflowY: 'hidden'
        }}>
            {array.map((value, index) => {
                // calculates the bar height as percentage of max value - makes bars proportional
                const heightPercentage = (value / maxValue) * 100;
                
                // determines the bar color based on current state - this is the visual feedback
                let backgroundColor = '#6c757d'; // default gray for unsorted
                
                if (sortedIndices.includes(index)) {
                    backgroundColor = '#28a745'; // green for sorted elements
                } else if (swappingIndices.includes(index)) {
                    backgroundColor = '#dc3545'; // red for elements being swapped
                } else if (comparingIndices.includes(index)) {
                    backgroundColor = '#ffc107'; // yellow for elements being compared
                }
                
                return (
                    <div
                        key={index}
                        style={{
                            width: `${Math.max(8, Math.min(30, 600 / array.length))}px`, // dynamic width based on array size
                            height: `${heightPercentage}%`,
                            backgroundColor,
                            border: '1px solid #495057',
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.1s ease-in-out', // smooth color transitions
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                        title={`Index ${index}: ${value}`} // tooltip shows index and value
                    >
                        {/* shows the value on top of bar if array is small enough - don't clutter with big arrays */}
                        {array.length <= 30 && (
                            <span style={{
                                position: 'absolute',
                                top: '-25px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>
                                {value}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
