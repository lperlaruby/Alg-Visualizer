import { useResponsive } from '@/utils/useResponsive';

// Array visualization component
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
    const { calculateBarWidth, calculateVisualizationHeight } = useResponsive();
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '2px',
            height: `${calculateVisualizationHeight()}px`, // Use responsive height
            padding: '12px',
            overflowX: array.length > 50 ? 'auto' : 'hidden',
            overflowY: 'hidden',
            minWidth: 0,
            flex: 1,
            minHeight: '200px',
        }}>
            {array.map((value, index) => {
                // Calculate bar height
                const heightPercentage = (value / maxValue) * 100;
                
                // Determine bar color
                let backgroundColor = '#6c757d';
                
                if (sortedIndices.includes(index)) {
                    backgroundColor = '#28a745';
                } else if (swappingIndices.includes(index)) {
                    backgroundColor = '#dc3545';
                } else if (comparingIndices.includes(index)) {
                    backgroundColor = '#ffc107';
                }
                
                // Calculate responsive width
                const barWidth = calculateBarWidth(array.length);
                
                return (
                    <div
                        key={index}
                        style={{
                            width: `${barWidth}px`,
                            height: `${heightPercentage}%`,
                            backgroundColor,
                            border: '1px solid #495057',
                            borderRadius: '4px 4px 0 0',
                            transition: 'all 0.1s ease-in-out',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            position: 'relative',
                            flexShrink: 0,
                        }}
                        title={`Index ${index}: ${value}`}
                    >
                        {/* Show values for smaller arrays */}
                        {array.length <= 30 && (
                            <span style={{
                                position: 'absolute',
                                top: '-25px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#495057',
                                whiteSpace: 'nowrap',
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
