import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider, getPaletteColor, Button } from 'pcln-design-system';
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

const ThemeSwitcher = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
`;

function App() {
  const { theme, themeText, toggleTheme } = useTheme();

  return (
    <Container theme={theme}>
      <ThemeSwitcher onClick={toggleTheme}>{themeText}</ThemeSwitcher>
      <MainContent>
        <Home />
      </MainContent>
    </Container>
  );
}

export default App;
