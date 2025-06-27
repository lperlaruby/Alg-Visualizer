import React, { ReactNode } from 'react';
import { useResponsive } from '@/utils/useResponsive';

// interface for the main controls component props
interface ControlsProps {
    onGenerateArray: () => void;
    onStartSort: () => void;
    onPauseSort?: () => void;
    onReset: () => void;
    onFastForward?: () => void;
    isSorting: boolean;
    isPaused?: boolean;
}

// interface for individual control button props
interface ControlButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
    isMiddle?: boolean;
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

// reusable control button component with hover effects and disabled states
const ControlButton = ({ onClick, disabled = false, children, isMiddle = false }: ControlButtonProps) => (
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
    isSorting,
    isPaused = false
}: ControlsProps) {
    // Get responsive utilities
    const { isMobile } = useResponsive();
    
    return (
        <div style={{
            display: 'flex',
            gap: '12px',
            padding: isMobile ? '10px 15px' : '15px 20px',
            marginBottom: '-20px',
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
                <button
                    onClick={onGenerateArray}
                    // disable when sorting unless paused
                    disabled={isSorting && !isPaused}
                    style={{
                        padding: "8px 16px",
                        background: "grey",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        cursor: (isSorting && !isPaused) ? "not-allowed" : "pointer",
                        opacity: (isSorting && !isPaused) ? 0.6 : 1,
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        boxShadow: "grey",
                        whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                    onMouseEnter={(e) => {
                        // only show hover effect if button is enabled
                        if (!isSorting || isPaused) {
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        // reset transform when mouse leaves
                        if (!isSorting || isPaused) {
                            e.currentTarget.style.transform = "translateY(0)";
                        }
                    }}
                >
                    Generate New Array
                </button>
            </div>

            {/* right side - control buttons in a pill-shaped container */}
            <div style={{
                display: 'flex',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ddd',
                flexShrink: 0, // Prevent controls from shrinking
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
