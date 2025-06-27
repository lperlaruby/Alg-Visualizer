import { useState, useEffect } from 'react';

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  const calculateBarWidth = (arrayLength: number, containerWidth?: number) => {
    const availableWidth = containerWidth || Math.max(400, windowSize.width - 400);
    const barWidth = Math.max(4, Math.min(40, availableWidth / arrayLength - 4));
    return barWidth;
  };

  const calculateVisualizationHeight = () => {
    return Math.min(400, windowSize.height * 0.5);
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    calculateBarWidth,
    calculateVisualizationHeight,
  };
} 