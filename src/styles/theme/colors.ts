// src/styles/theme/colors.ts
export const colors = {
  // Apple-inspired colors
  apple: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      100: '#f5f5f7',
      200: '#d2d2d7',
      300: '#86868b',
      400: '#424245',
      500: '#1d1d1f',
    },
    blue: '#007aff',
    green: '#34c759',
    red: '#ff3b30',
  },

  // Tesla-inspired colors
  tesla: {
    black: '#000000',
    gray: {
      100: '#1e1e1e',
      200: '#2d2d2d',
      300: '#3d3d3d',
      400: '#4d4d4d',
      500: '#5d5d5d',
    },
    neon: {
      blue: '#00ffff',
      green: '#00ff00',
      red: '#ff0000',
    },
  },
} as const;