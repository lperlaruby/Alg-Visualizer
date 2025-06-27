import React from 'react';
import ArrayBars from './ArrayBars';
import { useResponsive } from '@/utils/useResponsive';

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

const SortingVisualizer = React.memo<SortingVisualizerProps>(({ 
    array, 
    isSorting, 
    selectedAlgorithm,
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = [],
    description = ""
}) => {
    // Get responsive utilities
    const { isMobile } = useResponsive();
    
    return (
        <div style={{ 
            flex: 1, 
            padding: isMobile ? 15 : 20,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '15px' : '20px',
            minWidth: 0,
            overflow: 'hidden',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}>

            {/* visualization area - this is where the bars are shown */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '15px' : '20px',
                minWidth: 0,
                overflow: 'hidden',
                padding: '16px',
            }}>
                {/* the main array bars component that shows the actual visualization */}
                <ArrayBars 
                    array={array}
                    comparingIndices={comparingIndices}
                    swappingIndices={swappingIndices}
                    sortedIndices={sortedIndices}
                />
            </div>
        </div>
    );
});

SortingVisualizer.displayName = 'SortingVisualizer';

export default SortingVisualizer;