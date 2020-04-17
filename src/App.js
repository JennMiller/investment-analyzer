import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, getPaletteColor } from 'pcln-design-system';
import Home from './components/Home';

const Container = styled(ThemeProvider)`
  position: relative;
  min-height: 100vh;
  background: ${getPaletteColor('background.lightest')};
`;

const MainContent = styled.main`
  display: flex;
  align-items: center;
  padding: 90px 10% 0;
  color: ${getPaletteColor('text.base')};
  background: ${getPaletteColor('background.lightest')};
`;

function App() {
  return (
    <Container>
      <MainContent>
        <Home />
      </MainContent>
    </Container>
  );
}

export default App;
