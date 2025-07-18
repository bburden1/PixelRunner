import React from 'react';
import styled from 'styled-components';

const GroundContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  background: linear-gradient(to bottom, #8FBC8F 0%, #556B2F 100%);
  z-index: 1;
`;

const GroundTexture = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2vh;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2vw,
    rgba(0, 0, 0, 0.1) 2vw,
    rgba(0, 0, 0, 0.1) 4vw
  );
`;

const GroundLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #333;
`;

const Ground: React.FC = () => {
  return (
    <GroundContainer>
      <GroundTexture />
      <GroundLine />
    </GroundContainer>
  );
};

export default Ground; 