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
    const maxValue = Math.max(...array);
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '2px',
            height: '400px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
        }}>
            {array.map((value, index) => {
                // calculates the bar height as percentage of max value
                const heightPercentage = (value / maxValue) * 100;
                
                // determines the bar color based on current state
                let backgroundColor = '#6c757d'; // default gray
                
                if (sortedIndices.includes(index)) {
                    backgroundColor = '#28a745'; // green for sorted
                } else if (swappingIndices.includes(index)) {
                    backgroundColor = '#dc3545'; // red for swapping
                } else if (comparingIndices.includes(index)) {
                    backgroundColor = '#ffc107'; // yellow for comparing
                }
                
                return (
                    <div
                        key={index}
                        style={{
                            width: `${Math.max(20, 400 / array.length)}px`,
                            height: `${heightPercentage}%`,
                            backgroundColor,
                            border: '1px solid #495057',
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.1s ease-in-out',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                        title={`Index ${index}: ${value}`}
                    >
                        {/* shows the value on top of bar if array is small enough */}
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
