/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0061f2',
          50: '#e6f0ff',
          100: '#dae7fb',
          200: '#b3d4ff',
          300: '#80baff',
          400: '#4d9fff',
          500: '#0061f2',
          600: '#0055d4',
          700: '#0048b6',
          800: '#003a98',
          900: '#002d7a',
        },
        secondary: {
          DEFAULT: '#6900c7',
          50: '#f3e6ff',
          100: '#e6ccff',
          200: '#cc99ff',
          300: '#b366ff',
          400: '#9933ff',
          500: '#6900c7',
          600: '#5c00ad',
          700: '#4f0094',
          800: '#42007a',
          900: '#350061',
        },
        teal: {
          DEFAULT: '#00ba94',
          50: '#e6fff9',
          100: '#ccfff3',
          200: '#99ffe7',
          300: '#66ffdb',
          400: '#33ffcf',
          500: '#00ba94',
          600: '#00a382',
          700: '#008c70',
          800: '#00755e',
          900: '#005e4c',
        },
        dark: '#212832',
      },
      fontFamily: {
        sans: ['Metropolis', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
