interface SortingVisualizerProps {
    array: number[];
    isSorting: boolean;
    selectedAlgorithm: string;
}

export default function SortingVisualizer({ array, isSorting, selectedAlgorithm }: SortingVisualizerProps) {
    return (
        <div style={{ flex: 1, padding:20}}>
            <h2>Sorting Visualizer</h2>
            <p>Algorithm: {selectedAlgorithm}</p>
            <p>Array: {array.join(', ')}</p>
            <p>Sorting: {isSorting ? 'Yes' : 'No'}</p>
            {/* Visualization and controls will gohere */}
        </div>
    );
}