// src/styles/theme/shadows.ts
export const shadows = {
  // Apple-inspired shadows
  apple: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },

  // Tesla-inspired shadows
  tesla: {
    glow: '0 0 10px rgba(0, 255, 255, 0.5)',
    neon: '0 0 20px rgba(0, 255, 0, 0.5)',
  },
} as const;