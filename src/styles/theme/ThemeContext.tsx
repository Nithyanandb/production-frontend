// src/styles/theme/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { theme, getThemeValue, adjustOpacity} from './index';
import type { Theme } from './index';

type ThemeContextType = {
  theme: Theme;
  getThemeValue: typeof getThemeValue;
  adjustOpacity: typeof adjustOpacity;

};

const ThemeContext = createContext<ThemeContextType>({
  theme,
  getThemeValue,
  adjustOpacity,
  
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme, getThemeValue, adjustOpacity }}>
      {children}
    </ThemeContext.Provider>
  );
};