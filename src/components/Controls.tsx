import React, { ReactNode } from 'react';
import { useResponsive } from '@/utils/useResponsive';

// Controls component props
interface ControlsProps {
    onGenerateArray: () => void;
    onStartSort: () => void;
    onPauseSort?: () => void;
    onReset: () => void;
    onFastForward?: () => void;
    onShowExplanation: () => void;
    onShowCode: () => void;
    isSorting: boolean;
    isPaused?: boolean;
    displayMode: 'code' | 'explanation';
}

// Button props
interface ControlButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
    isMiddle?: boolean;
    isActive?: boolean;
}

// Play icon
const PlayIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
    </svg>
);

// Pause icon
const PauseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
);

// Reset icon
const RewindIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
    </svg>
);

// Fast forward icon
const FastForwardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
    </svg>
);

// Info icon
const ExplanationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
);

// Code icon
const CodeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
);

// Control button with hover effects
const ControlButton = ({ onClick, disabled = false, children, isMiddle = false, isActive = false }: ControlButtonProps) => (
    <button
        onClick={() => onClick?.()}
        disabled={disabled}
        style={{
            padding: '8px 16px',
            background: 'transparent',
            border: 'none',
            // Visual separator
            borderRight: isMiddle ? '1px solid #ddd' : 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: disabled ? '#999' : '#333',
            transition: 'all 0.2s ease',
            opacity: disabled ? 0.5 : 1,
            backgroundColor: isActive ? '#e0e0e0' : 'transparent',
        }}
        onMouseEnter={(e) => {
            // Hover effect
            if (!disabled) {
                e.currentTarget.style.background = '#e0e0e0';
            }
        }}
        onMouseLeave={(e) => {
            // Reset hover
            if (!disabled) {
                e.currentTarget.style.background = 'transparent';
            }
        }}
    >
        {children}
    </button>
);

export default function Controls({ 
    onGenerateArray, 
    onStartSort, 
    onPauseSort,
    onReset, 
    onFastForward,
    onShowExplanation,
    onShowCode,
    isSorting,
    isPaused = false,
    displayMode
}: ControlsProps) {
    // Responsive design
    const { isMobile } = useResponsive();
    
    return (
        <div style={{
            display: 'flex',
            gap: '12px',
            padding: isMobile ? '12px 12px 0px 4px' : '16px 16px 0px 2px',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            minWidth: 0,
        }}>
            {/* Left controls */}
            <div style={{ 
                display: 'flex', 
                gap: '12px',
                flexShrink: 0,
            }}>
                {/* Display mode toggle */}
                <div style={{
                    display: 'flex',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #ddd',
                    flexShrink: 0,
                }}>
                    <ControlButton
                        onClick={onShowExplanation}
                        isMiddle={true}
                        isActive={displayMode === 'explanation'}
                    >
                        <ExplanationIcon />
                    </ControlButton>
                    <ControlButton
                        onClick={onShowCode}
                        isActive={displayMode === 'code'}
                    >
                        <CodeIcon />
                    </ControlButton>
                </div>

                <button
                    onClick={onGenerateArray}
                    // Disable during sort
                    disabled={isSorting && !isPaused}
                    style={{
                        padding: "8px 16px",
                        background: "transparent",
                        color: (isSorting && !isPaused) ? "#999" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        cursor: (isSorting && !isPaused) ? "not-allowed" : "pointer",
                        opacity: (isSorting && !isPaused) ? 0.5 : 1,
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                        // Hover effect
                        if (!isSorting || isPaused) {
                            e.currentTarget.style.background = "#e0e0e0";
                        }
                    }}
                    onMouseLeave={(e) => {
                        // Reset hover
                        if (!isSorting || isPaused) {
                            e.currentTarget.style.background = "transparent";
                        }
                    }}
                >
                    Generate New Array
                </button>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }}></div>

            {/* Right controls */}
            <div style={{
                display: 'flex',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ddd',
                flexShrink: 0,
                marginRight: isMobile ? '8px' : '-12px',
            }}>
                {/* Reset */}
                <ControlButton
                    onClick={onReset}
                    disabled={!isSorting && !isPaused}
                    isMiddle={true}
                >
                    <RewindIcon />
                </ControlButton>
                {/* Play/Pause */}
                <ControlButton
                    onClick={isSorting && !isPaused ? onPauseSort : onStartSort}
                    isMiddle={true}
                >
                    {isSorting && !isPaused ? <PauseIcon /> : <PlayIcon />}
                </ControlButton>
                {/* Fast forward */}
                <ControlButton
                    onClick={onFastForward}
                    disabled={!isSorting || isPaused}
                >
                    <FastForwardIcon />
                </ControlButton>
            </div>
        </div>
    );
}
