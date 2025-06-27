import { useState, useEffect, useMemo, useCallback } from 'react';

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const deviceInfo = useMemo(() => ({
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  }), [windowSize.width]);

  const calculateBarWidth = useCallback((arrayLength: number, containerWidth?: number) => {
    const availableWidth = containerWidth || Math.max(400, windowSize.width - 400);
    return Math.max(4, Math.min(40, availableWidth / arrayLength - 4));
  }, [windowSize.width]);

  const calculateVisualizationHeight = useCallback(() => {
    return Math.min(400, windowSize.height * 0.5);
  }, [windowSize.height]);

  return {
    windowSize,
    ...deviceInfo,
    calculateBarWidth,
    calculateVisualizationHeight,
  };
} 