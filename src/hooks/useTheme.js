import React, { useState } from 'react';
import { Button, getPaletteColor } from 'pcln-design-system';
import styled from 'styled-components';

const themePalettes = {
  dark: {
    palette: {
      text: {
        lightest: '#fff',
        light: '#fff',
        base: '#fff'
      },
      background: {
        lightest: 'rgb(23, 25, 35)'
      },
      border: {
        lightest: 'rgb(23, 25, 35)',
        light: '#fff'
      }
    }
  }
};

const ThemeSwitcher = styled(Button)`
  position: absolute;
  background: ${getPaletteColor('border.base')};
  color: white;
  top: 0;
  right: 0;
  padding: 6px 10px;
`;

const StyledIcon = styled.img`
  width: 30px;
`;

export default function useTheme(initialTheme = 'dark') {
  const [theme, setTheme] = useState(themePalettes[initialTheme]);
  const isDark = theme === themePalettes['dark'];

  const toggleTheme = () => {
    setTheme(themePalettes[isDark ? 'light' : 'dark']);
  };

  const themeToggleButton = (
    <ThemeSwitcher onClick={toggleTheme}>
      <StyledIcon
        src={`${process.env.PUBLIC_URL}/icons/${isDark ? 'sun' : 'moon'}.svg`}
        alt="Theme toggle"
      />
    </ThemeSwitcher>
  );

  return {
    theme,
    themeToggleButton
  };
}
