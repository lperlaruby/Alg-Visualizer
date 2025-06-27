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

export default function SortingVisualizer({ 
    array, 
    isSorting, 
    selectedAlgorithm,
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = [],
    description = ""
}: SortingVisualizerProps) {
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
        }}>

            {/* visualization area - this is where the bars are shown */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '15px' : '20px',
                minWidth: 0,
                overflow: 'hidden',
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
}