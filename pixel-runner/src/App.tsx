import React from 'react';
import styled from 'styled-components';
import Game from './components/Game';
import './App.css';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  border: none;
  background: #000;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <GameWrapper>
        <Game />
      </GameWrapper>
    </AppContainer>
  );
}

export default App;
