import React, { useState } from 'react';
import { useResponsive } from '@/utils/useResponsive';
import { getAlgorithmCode } from '@/utils/algorithmCode';
import { getAlgorithmExplanation } from '@/utils/algorithmExplanations';
import { Language } from '@/types';

// interface for the code display component props
interface CodeDisplayProps {
  selectedAlgorithm: string;
  displayMode: 'code' | 'explanation';
}

const MAX_CODE_LINES = 14; // Number of lines before 'Show more' appears

const CodeDisplay: React.FC<CodeDisplayProps> = ({ selectedAlgorithm, displayMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('typescript');
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isMobile } = useResponsive();

  const code = getAlgorithmCode(selectedAlgorithm, selectedLanguage);
  const explanation = getAlgorithmExplanation(selectedAlgorithm);
  const content = displayMode === 'code' ? code : explanation;
  const contentLines = content.split('\n');
  const showShowMore = contentLines.length > MAX_CODE_LINES;
  const displayedContent = expanded || !showShowMore ? content : contentLines.slice(0, MAX_CODE_LINES).join('\n') + '\n...';

  // Copy content to clipboard with feedback
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Get display name for language
  const getLanguageDisplayName = (lang: Language) => {
    return lang === 'typescript' ? 'TypeScript' : 'Python';
  };

  return (
    <div style={{
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: isMobile ? '4px' : '8px',
      minWidth: 0,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.01)',
    }}>
      {/* Tabs and Copy button row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6px',
        paddingBottom: '0',
      }}>
        {/* Language tabs (only shown for code mode) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {displayMode === 'code' ? (
            <>
                             <button
                 onClick={() => setSelectedLanguage('typescript')}
                 style={{
                   background: selectedLanguage === 'typescript' ? '#e5e7eb' : 'none',
                   border: 'none',
                   color: '#000000',
                   fontWeight: selectedLanguage === 'typescript' ? 700 : 500,
                   fontSize: '14px',
                   padding: '8px 16px',
                   marginRight: '4px',
                   outline: 'none',
                   cursor: 'pointer',
                   borderRadius: '6px',
                   transition: 'all 0.15s',
                   fontFamily: 'inherit',
                 }}
                 onMouseEnter={e => {
                   if (selectedLanguage !== 'typescript') {
                     e.currentTarget.style.background = '#f9fafb';
                   }
                 }}
                 onMouseLeave={e => {
                   if (selectedLanguage !== 'typescript') {
                     e.currentTarget.style.background = 'none';
                   }
                 }}
               >
                 TypeScript
               </button>
                             <button
                 onClick={() => setSelectedLanguage('python')}
                 style={{
                   background: selectedLanguage === 'python' ? '#e5e7eb' : 'none',
                   border: 'none',
                   color: '#000000',
                   fontWeight: selectedLanguage === 'python' ? 700 : 500,
                   fontSize: '14px',
                   padding: '8px 16px',
                   marginRight: '8px',
                   outline: 'none',
                   cursor: 'pointer',
                   borderRadius: '6px',
                   transition: 'all 0.15s',
                   fontFamily: 'inherit',
                 }}
                 onMouseEnter={e => {
                   if (selectedLanguage !== 'python') {
                     e.currentTarget.style.background = '#f9fafb';
                   }
                 }}
                 onMouseLeave={e => {
                   if (selectedLanguage !== 'python') {
                     e.currentTarget.style.background = 'none';
                   }
                 }}
               >
                 Python
               </button>
            </>
          ) : (
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#222',
                fontWeight: 700,
                fontSize: '15px',
                padding: '10px 18px 8px 18px',
                marginRight: '8px',
                outline: 'none',
                cursor: 'default',
                boxShadow: 'none',
                borderRadius: 0,
                fontFamily: 'inherit',
              }}
              tabIndex={-1}
              disabled
            >
              Explanation
            </button>
          )}
        </div>
        {/* Copy button */}
        <button
          onClick={handleCopy}
          title={copied ? 'Copied!' : `Copy ${displayMode}`}
          style={{
            background: 'none',
            border: 'none',
            color: copied ? '#374151' : '#9ca3af',
            cursor: 'pointer',
            padding: '4px',
            marginRight: '2px',
            marginTop: '2px',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.15s',
            minWidth: '48px',
            minHeight: '28px',
            position: 'relative',
          }}
          onMouseEnter={e => {
            if (!copied) e.currentTarget.style.color = '#3b82f6';
          }}
          onMouseLeave={e => {
            if (!copied) e.currentTarget.style.color = '#9ca3af';
          }}
        >
          {copied ? (
            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>Copied!</span>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          )}
        </button>
      </div>
      {/* Code Box */}
      <div style={{
        position: 'relative',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: isMobile ? '14px' : '28px',
        minHeight: '180px',
        fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, monospace',
        fontSize: '13px',
        color: '#374151',
        marginBottom: '4px',
        overflow: 'auto',
        boxSizing: 'border-box',
      }}>
        <pre style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          background: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          color: 'inherit',
        }}>
          <code>{displayedContent}</code>
        </pre>
        {/* Show more button */}
        {showShowMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                padding: '4px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                background: '#f3f4f6',
                color: '#374151',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeDisplay;
