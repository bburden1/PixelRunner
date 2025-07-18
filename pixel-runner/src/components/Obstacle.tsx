import React from 'react';
import styled from 'styled-components';

const ObstacleContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 4;
`;

const Cactus = styled.div`
  width: 2.5vw;
  height: 4vw;
  min-width: 20px;
  min-height: 35px;
  max-width: 40px;
  max-height: 70px;
  background: #2D5A27;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 1.5vw;
    height: 1vw;
    min-width: 12px;
    min-height: 8px;
    max-width: 25px;
    max-height: 18px;
    background: #2D5A27;
    top: 25%;
    left: -0.6vw;
    border-radius: 0 6px 6px 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 1.5vw;
    height: 1vw;
    min-width: 12px;
    min-height: 8px;
    max-width: 25px;
    max-height: 18px;
    background: #2D5A27;
    top: 40%;
    right: -0.6vw;
    border-radius: 6px 0 0 6px;
  }
`;

const Bird = styled.div`
  width: 3vw;
  height: 2vw;
  min-width: 25px;
  min-height: 15px;
  max-width: 45px;
  max-height: 30px;
  background: #8B4513;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 0.6vw;
    height: 0.6vw;
    min-width: 5px;
    min-height: 5px;
    max-width: 10px;
    max-height: 10px;
    background: #FFD700;
    border-radius: 50%;
    top: 25%;
    left: 15%;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 1.2vw;
    height: 0.6vw;
    min-width: 10px;
    min-height: 5px;
    max-width: 20px;
    max-height: 10px;
    background: #8B4513;
    border-radius: 0 0 12px 12px;
    bottom: -0.4vw;
    left: 30%;
  }
`;

const BirdWing = styled.div`
  width: 1.2vw;
  height: 0.8vw;
  min-width: 10px;
  min-height: 6px;
  max-width: 18px;
  max-height: 12px;
  background: #654321;
  border-radius: 50%;
  position: absolute;
  top: 32%;
  right: 12%;
  transform: rotate(-15deg);
`;

interface ObstacleProps {
  x: number;
  y: number;
  type: 'cactus' | 'bird';
}

const Obstacle: React.FC<ObstacleProps> = ({ x, y, type }) => {
  return (
    <ObstacleContainer x={x} y={y}>
      {type === 'cactus' ? (
        <Cactus />
      ) : (
        <Bird>
          <BirdWing />
        </Bird>
      )}
    </ObstacleContainer>
  );
};

export default Obstacle; 