import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(systemColorScheme || 'light');

  useEffect(() => {
    setThemeMode(systemColorScheme || 'light');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, mode: themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
