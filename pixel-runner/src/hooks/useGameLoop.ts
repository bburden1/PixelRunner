import { useEffect, useRef } from 'react';

export const useGameLoop = (callback: (deltaTime: number) => void, fps: number = 60) => {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const frameInterval = 1000 / fps;

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        
        if (deltaTime >= frameInterval) {
          callback(deltaTime);
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback, frameInterval]);
}; 