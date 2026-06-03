/** @type {import('tailwindcss').Config} */
// Carousell design tokens (from Figma file tZUmRBYv6dUlh1ojy7mYin)
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        urbangrey: {
          10: '#F8F8F9',
          20: '#F0F1F1',
          50: '#6D6E71',
          60: '#57585A',
          80: '#414244',
          90: '#2C2C2D',
        },
        content: {
          primary: '#2C2C2D',
          secondary: '#57585A',
          subdued: '#C5C5C6',
          interactive: '#008F79',
          ondark: '#FFFFFF',
        },
        bg: {
          base: '#FFFFFF',
          display: '#F8F8F9',
          input: '#F0F1F1',
          priority: '#FF2636',
          interactive: '#008F79',
        },
        stroke: {
          boundary: '#F0F1F1',
          input: '#C5C5C6',
          interactive: '#008F79',
        },
        skyteal: { 80: '#008F79' },
        caroured: { 50: '#FF2636', 60: '#CC1E2B' },
        deepblue: { 50: '#027CFF' },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Web typography scale (from Figma — Desktop)
        tiny:   ['12px', '18px'],   // Tiny Cap
        small:  ['14px', '22px'],   // Small
        middle: ['16px', '24px'],   // Middle
        large:  ['20px', '28px'],   // Large
        h3:     ['24px', '32px'],   // H3
        h2:     ['30px', '38px'],   // H2
        h1:     ['38px', '46px'],   // H1
      },
      maxWidth: {
        // Production: max-width 1440px with 64px horizontal padding = 1312px inner content
        page: '1440px',
      },
      padding: {
        // Production horizontal page padding
        page: '64px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        sticky: '0 -1px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
