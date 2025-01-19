// src/styles/theme/animations.ts
export const animations = {
  durations: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
  },
  easings: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  transitions: {
    all: 'all',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    transform: 'transform',
  },
} as const;