import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const runAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(2deg); }
  50% { transform: translateY(-4px) rotate(0deg); }
  75% { transform: translateY(-2px) rotate(-2deg); }
`;

const legSwing = keyframes`
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
`;

const tailWag = keyframes`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`;

const PlayerContainer = styled.div<{ y: number; isJumping: boolean }>`
  position: absolute;
  left: 5vw;
  top: ${props => props.y}px;
  width: 6vw;
  height: 4vw;
  min-width: 45px;
  min-height: 30px;
  max-width: 90px;
  max-height: 60px;
  transition: top 0.1s ease-out;
  z-index: 5;
  animation: ${props => !props.isJumping ? runAnimation : 'none'} 0.6s infinite;
  transform: scaleX(-1);
`;

const DogBody = styled.div`
  width: 100%;
  height: 100%;
  background: #8B4513;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const DogHead = styled.div`
  width: 60%;
  height: 60%;
  background: #A0522D;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: absolute;
  top: -30%;
  left: -10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const DogEar = styled.div`
  width: 25%;
  height: 40%;
  background: #654321;
  border-radius: 50% 50% 0 0;
  position: absolute;
  top: -20%;
`;

const DogEarLeft = styled(DogEar)`
  left: 10%;
  transform: rotate(-30deg);
`;

const DogEarRight = styled(DogEar)`
  right: 10%;
  transform: rotate(30deg);
`;

const DogEye = styled.div`
  width: 15%;
  height: 15%;
  background: #333;
  border-radius: 50%;
  position: absolute;
  top: 25%;
`;

const DogEyeLeft = styled(DogEye)`
  left: 20%;
`;

const DogEyeRight = styled(DogEye)`
  right: 20%;
`;

const DogNose = styled.div`
  width: 8%;
  height: 8%;
  background: #000;
  border-radius: 50%;
  position: absolute;
  top: 45%;
  left: 46%;
`;

const DogLeg = styled.div`
  width: 15%;
  height: 40%;
  background: #654321;
  border-radius: 20% 20% 0 0;
  position: absolute;
  bottom: -35%;
`;

const DogLegFrontLeft = styled(DogLeg)`
  left: 15%;
  animation: ${legSwing} 0.6s infinite;
`;

const DogLegFrontRight = styled(DogLeg)`
  left: 35%;
  animation: ${legSwing} 0.6s infinite 0.3s;
`;

const DogLegBackLeft = styled(DogLeg)`
  right: 35%;
  animation: ${legSwing} 0.6s infinite 0.15s;
`;

const DogLegBackRight = styled(DogLeg)`
  right: 15%;
  animation: ${legSwing} 0.6s infinite 0.45s;
`;

const DogTail = styled.div`
  width: 30%;
  height: 15%;
  background: #654321;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: absolute;
  top: 20%;
  right: -25%;
  transform-origin: left center;
  animation: ${tailWag} 0.8s infinite;
`;

const DogTongue = styled.div`
  width: 20%;
  height: 15%;
  background: #FF69B4;
  border-radius: 50% 50% 0 0;
  position: absolute;
  top: 55%;
  left: 40%;
`;

interface PlayerProps {
  y: number;
  isJumping: boolean;
}

const Player: React.FC<PlayerProps> = ({ y, isJumping }) => {
  return (
    <PlayerContainer y={y} isJumping={isJumping}>
      <DogBody>
        <DogHead>
          <DogEarLeft />
          <DogEarRight />
          <DogEyeLeft />
          <DogEyeRight />
          <DogNose />
          <DogTongue />
        </DogHead>
        <DogLegFrontLeft />
        <DogLegFrontRight />
        <DogLegBackLeft />
        <DogLegBackRight />
        <DogTail />
      </DogBody>
    </PlayerContainer>
  );
};

export default Player; 