import React, { useState } from 'react';
import { useResponsive } from '@/utils/useResponsive';

// interface for the code display component props
interface CodeDisplayProps {
  selectedAlgorithm: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ selectedAlgorithm }) => {
  // state to track which programming language is selected
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  // Get responsive utilities
  const { isMobile } = useResponsive();

  // function to get the code snippet for the selected algorithm
  const getAlgorithmCode = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;
      // add other algorithm code snippets here
      default:
        return '// select an algorithm to view its code';
    }
  };

  return (
    <div className="code-display" style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: isMobile ? '15px' : '20px',
      marginBottom: '5px',
      minWidth: 0, // Prevent overflow
      overflow: 'hidden', // Prevent content from breaking layout
    }}>
      {/* header with language selector and copy button */}
      <div className="code-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
        flexWrap: 'wrap', // Allow wrapping on small screens
        gap: '10px', // Add gap for wrapped items
      }}>
        {/* language selector buttons */}
        <div className="language-selector" style={{
          display: 'flex',
          flexWrap: 'wrap', // Allow wrapping on small screens
          gap: '8px', // Add gap between buttons
        }}>
          <button
            onClick={() => setSelectedLanguage('javascript')}
            className={selectedLanguage === 'javascript' ? 'active' : ''}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: selectedLanguage === 'javascript' ? '#e2e8f0' : 'transparent',
              cursor: 'pointer',
              color: '#888888',
              whiteSpace: 'nowrap', // Prevent text wrapping
            }}
          >
            JavaScript
          </button>
          <button
            onClick={() => setSelectedLanguage('python')}
            className={selectedLanguage === 'python' ? 'active' : ''}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: selectedLanguage === 'python' ? '#e2e8f0' : 'transparent',
              cursor: 'pointer',
              color: '#888888',
              whiteSpace: 'nowrap', // Prevent text wrapping
            }}
          >
            Python
          </button>
        </div>
        {/* copy code button */}
        <button style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          background: '#f1f5f9',
          cursor: 'pointer',
          color: '#888888',
          whiteSpace: 'nowrap', // Prevent text wrapping
        }}>
          Copy Code
        </button>
      </div>
      {/* code display area with syntax highlighting */}
      <pre style={{
        background: '#f8fafc',
        padding: isMobile ? '15px' : '20px',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: 'monospace',
        color: '#888888',
        minWidth: 0, // Prevent overflow
        maxHeight: '300px', // Limit height on small screens
      }}>
        <code>
          {getAlgorithmCode()}
        </code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
