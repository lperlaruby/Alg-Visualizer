// helper functions for sorting algorithms

// function to handle pause functionality - waits until unpaused
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

// function to wait for next animation frame - maintains smooth 60fps
export const waitForNextFrame = () => {
  return new Promise<void>(resolve => setTimeout(resolve, 16)); // ~60fps
};

// function to update array state with delay - controls animation speed
export const updateArrayState = async (
  arrayCopy: number[], 
  setArray: (array: number[]) => void, 
  speed: number
) => {
  setArray([...arrayCopy]);
  await new Promise<void>(resolve => setTimeout(resolve, speed));
};
