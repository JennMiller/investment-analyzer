import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider, getPaletteColor, Button } from 'pcln-design-system';
import Home from './components/Home';

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

const themePalettes = {
  dark: {
    palette: {
      text: {
        lightest: '#fff',
        light: '#fff',
        base: '#fff'
      },
      background: {
        lightest: '#111'
      },
      border: {
        light: '#fff'
      }
    }
  }
};

function App() {
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';
  const switchTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Container theme={themePalettes[theme]}>
      <ThemeSwitcher onClick={switchTheme}>
        {isDark ? 'LIGHT' : 'DARK'}
      </ThemeSwitcher>
      <MainContent>
        <Home />
      </MainContent>
    </Container>
  );
}

export default App;
