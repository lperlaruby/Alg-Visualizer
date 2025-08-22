// Utility functions

// Pause handler
export const handlePause = async (isPaused: boolean) => {
  if (isPaused) {
    await new Promise<void>(resolve => {
      const checkPause = setInterval(() => {
        if (!isPaused) {
          clearInterval(checkPause);
          resolve();
        }
      }, 100);
    });
  }
};

// Animation frame helper
export const waitForNextFrame = () => {
  return new Promise<void>(resolve => setTimeout(resolve, 16));
};

// Update array with delay
export const updateArrayState = async (
  arrayCopy: number[], 
  setArray: (array: number[]) => void, 
  speed: number
) => {
  setArray([...arrayCopy]);
  await new Promise<void>(resolve => setTimeout(resolve, speed));
};
