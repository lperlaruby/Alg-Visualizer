import React from 'react';
import { useResponsive } from '@/utils/useResponsive';

// interface for the array bars component - defines what props we need
interface ArrayBarsProps {
    array: number[];
    comparingIndices?: number[];
    swappingIndices?: number[];
    sortedIndices?: number[];
}

const ArrayBars = React.memo<ArrayBarsProps>(({ 
    array, 
    comparingIndices = [], 
    swappingIndices = [], 
    sortedIndices = [] 
}) => {
    const maxValue = Math.max(...array); // need this to calculate relative heights
    const { calculateBarWidth, calculateVisualizationHeight } = useResponsive();
    
    const barWidth = calculateBarWidth(array.length);
    const containerHeight = calculateVisualizationHeight();
    const needsScroll = array.length > 50;
    
    return (
        <div 
            className={`array-container ${needsScroll ? 'array-container--scrollable' : ''}`}
            style={{ height: `${containerHeight}px` }}
        >
            {array.map((value, index) => {
                // calculates the bar height as percentage of max value - makes bars proportional
                const heightPercentage = (value / maxValue) * 100;
                
                // determines the bar color based on current state - this is the visual feedback
                let barClass = 'array-bar';
                if (sortedIndices.includes(index)) {
                    barClass += ' array-bar--sorted';
                } else if (swappingIndices.includes(index)) {
                    barClass += ' array-bar--swapping';
                } else if (comparingIndices.includes(index)) {
                    barClass += ' array-bar--comparing';
                }
                
                return (
                    <div
                        key={index}
                        className={barClass}
                        style={{
                            width: `${barWidth}px`, // dynamic width based on array size and container
                            height: `${heightPercentage}%`,
                        }}
                        title={`Index ${index}: ${value}`} // tooltip shows index and value
                    >
                        {/* shows the value on top of bar if array is small enough - don't clutter with big arrays */}
                        {array.length <= 30 && (
                            <span className="array-bar__value">
                                {value}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
});

ArrayBars.displayName = 'ArrayBars';

export default ArrayBars;
