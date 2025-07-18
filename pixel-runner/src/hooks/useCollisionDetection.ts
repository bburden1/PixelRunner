import { useEffect, useState } from 'react';

export const useCollisionDetection = (
  checkCollision: (playerX: number, playerY: number, playerWidth: number, playerHeight: number) => boolean,
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  isPlaying: boolean
) => {
  const [collisionDetected, setCollisionDetected] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setCollisionDetected(false);
      return;
    }

    const hasCollision = checkCollision(playerX, playerY, playerWidth, playerHeight);
    setCollisionDetected(hasCollision);
  }, [checkCollision, playerX, playerY, playerWidth, playerHeight, isPlaying]);

  return collisionDetected;
}; 