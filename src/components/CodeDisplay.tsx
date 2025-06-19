import React, { useState } from 'react';

interface CodeDisplayProps {
  selectedAlgorithm: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ selectedAlgorithm }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  // Example code snippets for different algorithms
  const getAlgorithmCode = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;
      // Add other algorithm code snippets here
      default:
        return '// Select an algorithm to view its code';
    }
  };

  return (
    <div className="code-display" style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: '20px',
      marginBottom: '20px'
    }}>
      <div className="code-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px'
      }}>
        <div className="language-selector">
          <button
            onClick={() => setSelectedLanguage('javascript')}
            className={selectedLanguage === 'javascript' ? 'active' : ''}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              border: 'none',
              borderRadius: '4px',
              background: selectedLanguage === 'javascript' ? '#e2e8f0' : 'transparent',
              cursor: 'pointer',
              color: '#888888'
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
              color: '#888888'
            }}
          >
            Python
          </button>
        </div>
        <button style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          background: '#f1f5f9',
          cursor: 'pointer',
          color: '#888888'
        }}>
          Copy Code
        </button>
      </div>
      <pre style={{
        background: '#f8fafc',
        padding: '20px',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: 'monospace',
        color: '#888888'
      }}>
        <code>
          {getAlgorithmCode()}
        </code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
