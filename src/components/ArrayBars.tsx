import { useResponsive } from '@/utils/useResponsive';

// interface for the array bars component - defines what props we need
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
    const { calculateBarWidth, calculateVisualizationHeight } = useResponsive();
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '2px',
            height: `${calculateVisualizationHeight()}px`, // Use responsive height
            padding: '20px',
            overflowX: array.length > 50 ? 'auto' : 'hidden', // scroll if too many bars
            overflowY: 'hidden',
            minWidth: 0, // Add this to prevent flex items from overflowing
            flex: 1, // Add this to make it take available space
            minHeight: '300px', // Minimum height to ensure bars are visible
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
                
                // Use the responsive hook to calculate bar width
                const barWidth = calculateBarWidth(array.length);
                
                return (
                    <div
                        key={index}
                        style={{
                            width: `${barWidth}px`, // dynamic width based on array size and container
                            height: `${heightPercentage}%`,
                            backgroundColor,
                            border: '1px solid #495057',
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.1s ease-in-out', // smooth color transitions
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            position: 'relative',
                            flexShrink: 0, // Prevent bars from shrinking
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
                                color: '#495057',
                                whiteSpace: 'nowrap', // Prevent text wrapping
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
