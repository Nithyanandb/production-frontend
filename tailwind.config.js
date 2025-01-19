/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all relevant files are included
  ],
  theme: {
    extend: {
      // Custom screen sizes
      screens: {
        xs: '300px', // For 300px and up
        sm2: '500px', // For 500px and up
      },
      // Custom colors
      colors: {
        black: '#000000', // Pure black for a sleek look
        primary: '#e82127', // Tesla's signature red color
        secondary: '#00ccff', // Bright blue for accents
        background: '#000000', // Dark background
        surface: '#1a1a1a', // Slightly lighter surface for cards, modals, etc.
        text: '#ffffff', // White text for contrast
        'text-secondary': '#a6a6a6', // Light gray for secondary text
      },
      // Custom font families
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'], // Tesla uses a clean, modern sans-serif font
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      // Custom animations
      animation: {
        gradient: 'gradient 8s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 1s ease-in-out',
        'slide-up': 'slide-up 1s ease-in-out',
      },
      // Keyframes for animations
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Custom background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tesla-hero': "url('/path/to/tesla-hero-image.jpg')", // Add a Tesla-inspired hero image
      },
      // Custom backdrop blur
      backdropBlur: {
        '3xl': '64px',
        'custom-blur': '24px', // Custom backdrop blur value
      },
      // Custom box shadows
      boxShadow: {
        '10xl': '0 50px 100px -20px rgba(0, 0, 0, 0.6)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        neumorphic: '20px 20px 60px #0a0a0a, -20px -20px 60px #141414',
        'tesla-card': '0 8px 32px rgba(0, 0, 0, 0.2)', // Subtle shadow for cards
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        'tesla': '12px', // Rounded corners for Tesla-inspired elements
      },
      // Custom spacing
      spacing: {
        'tesla-section': '8rem', // Spacing for sections
        'tesla-gap': '4rem', // Gap between elements
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For form styling
    require('@tailwindcss/typography'), // For typography utilities
    require('tailwindcss-animate'), // For additional animations
  ],
};