import { useState } from 'react';

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
        light: '#fff'
      }
    }
  }
};

export default function useTheme(initialTheme = 'dark') {
  const [theme, setTheme] = useState(themePalettes[initialTheme]);
  const isDark = theme === themePalettes['dark'];
  const themeText = isDark ? 'LIGHT' : 'DARK';

  const toggleTheme = () => {
    setTheme(themePalettes[isDark ? 'light' : 'dark']);
  };

  return {
    theme,
    themeText,
    toggleTheme
  };
}
