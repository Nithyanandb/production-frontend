export const theme = {
    colors: {
      primary: {
        50: '#f2f2f2',
        100: '#e6e6e6',
        200: '#cccccc',
        300: '#b3b3b3',
        400: '#999999',
        500: '#666666',
        600: '#4d4d4d',
        700: '#333333',
        800: '#1a1a1a',
        900: '#000000',
      },
      tesla: {
        red: '#e82127',
        black: '#171a20',
        white: '#ffffff',
        gray: '#393c41',
      }
    },
    typography: {
      fonts: {
        sans: '"Gotham SSm A", "Gotham SSm B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        serif: 'Georgia, "Times New Roman", serif',
        mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
    semantic: {
      text: {
        primary: 'var(--color-tesla-black)',
        secondary: 'var(--color-tesla-gray)',
        inverse: 'var(--color-tesla-white)',
      },
      background: {
        primary: 'var(--color-tesla-white)',
        secondary: 'var(--color-tesla-black)',
      },
    },
    animations: {
      durations: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easings: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
    },
  };