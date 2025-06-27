import React, { ReactNode } from 'react';
import { useResponsive } from '@/utils/useResponsive';

// interface for the main controls component props
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

// interface for individual control button props
interface ControlButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
    isMiddle?: boolean;
    isActive?: boolean;
}

// play icon component for the start/pause button
const PlayIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
    </svg>
);

// pause icon component for when sorting is active
const PauseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
);

// rewind icon for reset functionality
const RewindIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
    </svg>
);

// fast forward icon for speeding up the sort
const FastForwardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
    </svg>
);

// explanation icon for the explanation section
const ExplanationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
);

// code icon for the code section
const CodeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
);

// reusable control button component with hover effects and disabled states
const ControlButton = ({ onClick, disabled = false, children, isMiddle = false, isActive = false }: ControlButtonProps) => (
    <button
        onClick={() => onClick?.()}
        disabled={disabled}
        style={{
            padding: '8px 16px',
            background: 'transparent',
            border: 'none',
            // add border to middle buttons to separate them visually
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
            // only show hover effect if button is not disabled
            if (!disabled) {
                e.currentTarget.style.background = '#e0e0e0';
            }
        }}
        onMouseLeave={(e) => {
            // reset background when mouse leaves
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
    // Get responsive utilities
    const { isMobile } = useResponsive();
    
    return (
        <div style={{
            display: 'flex',
            gap: '12px',
            padding: isMobile ? '20px 20px 0px 4px' : '24px 24px 0px 2px',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap', // Allow wrapping on small screens
            minWidth: 0, // Prevent overflow
        }}>
            {/* left side - generate new array button */}
            <div style={{ 
                display: 'flex', 
                gap: '12px',
                flexShrink: 0, // Prevent button from shrinking
            }}>
                {/* explanation/code button */}
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
                    // disable when sorting unless paused
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
                        whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                    onMouseEnter={(e) => {
                        // only show hover effect if button is enabled
                        if (!isSorting || isPaused) {
                            e.currentTarget.style.background = "#e0e0e0";
                        }
                    }}
                    onMouseLeave={(e) => {
                        // reset background when mouse leaves
                        if (!isSorting || isPaused) {
                            e.currentTarget.style.background = "transparent";
                        }
                    }}
                >
                    Generate New Array
                </button>
            </div>

            {/* spacer - pushes right buttons further right */}
            <div style={{ flex: 1 }}></div>

            {/* right side - control buttons in a pill-shaped container */}
            <div style={{
                display: 'flex',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ddd',
                flexShrink: 0,
                marginRight: isMobile ? '12px' : '-20px',
            }}>
                {/* reset button - disabled when not sorting and not paused */}
                <ControlButton
                    onClick={onReset}
                    disabled={!isSorting && !isPaused}
                    isMiddle={true}
                >
                    <RewindIcon />
                </ControlButton>
                {/* play/pause button - toggles between start and pause */}
                <ControlButton
                    onClick={isSorting && !isPaused ? onPauseSort : onStartSort}
                    isMiddle={true}
                >
                    {isSorting && !isPaused ? <PauseIcon /> : <PlayIcon />}
                </ControlButton>
                {/* fast forward button - only enabled when sorting and not paused */}
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
