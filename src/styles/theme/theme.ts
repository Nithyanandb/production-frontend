// src/styles/theme/theme.ts
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';
import { borders } from './borders';
import { animations } from './animations';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borders,
  animations,
} as const;

// Export theme types
export type Theme = typeof theme;
export type ThemeColor = keyof typeof colors;
export type ThemeSpace = keyof typeof spacing;