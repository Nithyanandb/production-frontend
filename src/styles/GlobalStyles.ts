import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.cdnfonts.com/css/gotham-ssm');

  :root {
    ${Object.entries(theme.colors).map(([key, value]) => {
      if (typeof value === 'object') {
        return Object.entries(value).map(([shade, color]) => {
          return `--color-${key}-${shade}: ${color};`;
        }).join('\n');
      }
      return `--color-${key}: ${value};`;
    }).join('\n')}

    --font-sans: ${theme.typography.fonts.sans};
    --font-serif: ${theme.typography.fonts.serif};
    --font-mono: ${theme.typography.fonts.mono};
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-sans);
    font-weight: ${theme.typography.fontWeights.normal};
    line-height: ${theme.typography.lineHeights.normal};
    color: ${theme.semantic.text.primary};
    background-color: ${theme.semantic.background.primary};
    letter-spacing: -0.01em;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${theme.typography.fontWeights.medium};
    line-height: ${theme.typography.lineHeights.tight};
    color: ${theme.semantic.text.primary};
    letter-spacing: -0.02em;
  }

  h1 { 
    font-size: ${theme.typography.fontSizes['4xl']};
    text-transform: uppercase;
    font-weight: ${theme.typography.fontWeights.bold};
  }
  
  h2 { 
    font-size: ${theme.typography.fontSizes['3xl']};
    font-weight: ${theme.typography.fontWeights.medium};
  }
  
  h3 { 
    font-size: ${theme.typography.fontSizes['2xl']};
  }
  
  h4 { 
    font-size: ${theme.typography.fontSizes.xl};
  }
  
  h5 { 
    font-size: ${theme.typography.fontSizes.lg};
  }
  
  h6 { 
    font-size: ${theme.typography.fontSizes.base};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    font-weight: ${theme.typography.fontWeights.light};
    line-height: ${theme.typography.lineHeights.relaxed};
  }

  a {
    color: ${theme.colors.tesla.black};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all ${theme.animations.durations.fast} ${theme.animations.easings.easeInOut};

    &:hover {
      color: ${theme.colors.tesla.red};
      border-bottom-color: currentColor;
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-weight: ${theme.typography.fontWeights.medium};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all ${theme.animations.durations.fast} ${theme.animations.easings.easeInOut};

    &:hover {
      color: ${theme.colors.tesla.red};
    }
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.tesla.red};
    outline-offset: 2px;
  }

  ::selection {
    background-color: ${theme.colors.tesla.red};
    color: ${theme.colors.tesla.white};
  }

  // Tesla-specific utility classes
  .tesla-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }

  .tesla-button {
    background-color: ${theme.colors.tesla.black};
    color: ${theme.colors.tesla.white};
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    border-radius: 20px;
    font-weight: ${theme.typography.fontWeights.medium};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all ${theme.animations.durations.fast} ${theme.animations.easings.easeInOut};

    &:hover {
      background-color: ${theme.colors.tesla.red};
      color: ${theme.colors.tesla.white};
    }
  }

  .tesla-text-gradient {
    background: linear-gradient(90deg, ${theme.colors.tesla.black} 0%, ${theme.colors.tesla.red} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;