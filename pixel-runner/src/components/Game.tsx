import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Player from './Player';
import Obstacle from './Obstacle';
import Ground from './Ground';
import { useGameLoop } from '../hooks/useGameLoop';
import { useCollisionDetection } from '../hooks/useCollisionDetection';

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%);
`;

const GameOverlay = styled.div`
  position: absolute;
  top: 2vh;
  left: 2vw;
  color: white;
  font-family: 'Arial', sans-serif;
  font-size: clamp(16px, 3vw, 32px);
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const GameOverScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: clamp(20px, 4vw, 40px);
  border-radius: 15px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  z-index: 20;
  font-size: clamp(14px, 2.5vw, 24px);
`;

const RestartButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: clamp(10px, 2vw, 20px) clamp(20px, 4vw, 40px);
  font-size: clamp(14px, 2.5vw, 24px);
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2vh;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }
`;

interface GameState {
  isPlaying: boolean;
  score: number;
  gameSpeed: number;
  obstacles: Array<{
    id: number;
    x: number;
    y: number;
    type: 'cactus' | 'bird';
  }>;
  playerY: number;
  playerVelocity: number;
  isJumping: boolean;
}

interface WindowSize {
  width: number;
  height: number;
}

const Game: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [gameState, setGameState] = useState<GameState>({
    isPlaying: true,
    score: 0,
    gameSpeed: 5,
    obstacles: [],
    playerY: window.innerHeight * 0.6,
    playerVelocity: 0,
    isJumping: false,
  });

  const [gameOver, setGameOver] = useState(false);
  const obstacleIdRef = useRef(0);
  const lastObstacleTimeRef = useRef(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const jump = useCallback(() => {
    if (!gameState.isJumping && gameState.isPlaying) {
      setGameState(prev => ({
        ...prev,
        playerVelocity: -20,
        isJumping: true,
      }));
    }
  }, [gameState.isJumping, gameState.isPlaying]);

  const restartGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      score: 0,
      gameSpeed: 5,
      obstacles: [],
      playerY: windowSize.height * 0.6,
      playerVelocity: 0,
      isJumping: false,
    });
    setGameOver(false);
    obstacleIdRef.current = 0;
    lastObstacleTimeRef.current = 0;
  }, [windowSize.height]);

  const updateGame = useCallback((deltaTime: number) => {
    if (!gameState.isPlaying) return;

    setGameState(prev => {
      // Update player physics
      const gravity = 0.8;
      const newPlayerVelocity = prev.playerVelocity + gravity;
      const groundLevel = windowSize.height * 0.6;
      const newPlayerY = Math.min(groundLevel, prev.playerY + newPlayerVelocity);
      const newIsJumping = newPlayerY < groundLevel;

      // Update score
      const newScore = prev.score + Math.floor(deltaTime / 16);

      // Update game speed
      const newGameSpeed = 5 + Math.floor(newScore / 1000);

      // Generate obstacles
      const currentTime = Date.now();
      let newObstacles = [...prev.obstacles];
      
      if (currentTime - lastObstacleTimeRef.current > 2000 - (newGameSpeed * 30)) {
        const obstacleType = Math.random() > 0.5 ? 'cactus' : 'bird';
        const groundLevel = windowSize.height * 0.6;
        const birdLevel = windowSize.height * 0.35 + Math.random() * (windowSize.height * 0.15);
        const obstacleY = obstacleType === 'bird' ? birdLevel : groundLevel;
        
        newObstacles.push({
          id: obstacleIdRef.current++,
          x: windowSize.width,
          y: obstacleY,
          type: obstacleType,
        });
        lastObstacleTimeRef.current = currentTime;
      }

      // Move obstacles
      newObstacles = newObstacles
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x - newGameSpeed,
        }))
        .filter(obstacle => obstacle.x > -50);

      return {
        ...prev,
        playerY: newPlayerY,
        playerVelocity: newPlayerVelocity,
        isJumping: newIsJumping,
        score: newScore,
        gameSpeed: newGameSpeed,
        obstacles: newObstacles,
      };
    });
  }, [gameState.isPlaying]);

  const checkCollision = useCallback((playerX: number, playerY: number, playerWidth: number, playerHeight: number) => {
    const playerBox = {
      left: playerX,
      right: playerX + playerWidth,
      top: playerY,
      bottom: playerY + playerHeight,
    };

    return gameState.obstacles.some(obstacle => {
      const obstacleWidth = Math.max(20, windowSize.width * 0.025); // 2.5vw with min 20px
      const obstacleHeight = obstacle.type === 'cactus' 
        ? Math.max(35, windowSize.width * 0.04) // 4vw with min 35px
        : Math.max(15, windowSize.width * 0.02); // 2vw with min 15px
      
      const obstacleBox = {
        left: obstacle.x,
        right: obstacle.x + obstacleWidth,
        top: obstacle.y,
        bottom: obstacle.y + obstacleHeight,
      };

      return (
        playerBox.left < obstacleBox.right &&
        playerBox.right > obstacleBox.left &&
        playerBox.top < obstacleBox.bottom &&
        playerBox.bottom > obstacleBox.top
      );
    });
  }, [gameState.obstacles, windowSize.width]);

  // Game loop
  useGameLoop(updateGame, 60);

  // Collision detection
  const collisionDetected = useCollisionDetection(
    checkCollision,
    windowSize.width * 0.05, // playerX (5vw)
    gameState.playerY,
    Math.max(45, windowSize.width * 0.06), // playerWidth (6vw with min 45px)
    Math.max(30, windowSize.width * 0.04), // playerHeight (4vw with min 30px)
    gameState.isPlaying
  );

  // Handle collision
  useEffect(() => {
    if (collisionDetected && gameState.isPlaying) {
      setGameState(prev => ({ ...prev, isPlaying: false }));
      setGameOver(true);
    }
  }, [collisionDetected, gameState.isPlaying]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
      }
      if (event.code === 'Enter' && gameOver) {
        restartGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameOver, restartGame]);

  return (
    <GameContainer onClick={jump}>
      <GameOverlay>
        Score: {gameState.score}
        <br />
        Speed: {gameState.gameSpeed}
      </GameOverlay>

      <Player y={gameState.playerY} isJumping={gameState.isJumping} />
      
      {gameState.obstacles.map(obstacle => (
        <Obstacle
          key={obstacle.id}
          x={obstacle.x}
          y={obstacle.y}
          type={obstacle.type}
        />
      ))}

      <Ground />

      {gameOver && (
        <GameOverScreen>
          <h2>Game Over!</h2>
          <p>Final Score: {gameState.score}</p>
          <RestartButton onClick={restartGame}>
            Play Again
          </RestartButton>
          <p style={{ fontSize: '14px', marginTop: '20px' }}>
            Press SPACE to jump, ENTER to restart
          </p>
        </GameOverScreen>
      )}
    </GameContainer>
  );
};

export default Game; 