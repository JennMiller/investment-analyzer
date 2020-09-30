import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, getPaletteColor } from 'pcln-design-system';
import Home from './components/Home';
import useTheme from './hooks/useTheme';

const Container = styled(ThemeProvider)`
  position: relative;
  min-height: 100vh;
  background: ${getPaletteColor('background.lightest')};
`;

const MainContent = styled.main`
  display: flex;
  align-items: center;
  padding: 40px 10% 0;
  color: ${getPaletteColor('text.base')};
  background: ${getPaletteColor('background.lightest')};
`;

function App() {
  const { theme, themeToggleButton } = useTheme();

  return (
    <Container theme={theme}>
      {themeToggleButton}
      <MainContent>
        <Home />
      </MainContent>
    </Container>
  );
}

export default App;
