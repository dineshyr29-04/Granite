/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8ee',
          100: '#f8edcf',
          200: '#f0d99e',
          300: '#e6c06b',
          400: '#daa84a',
          500: '#c8913a',
          600: '#b07530',
          700: '#8f5b27',
          800: '#744620',
          900: '#5f391c',
          950: '#3a1e0b',
        },
        stone: {
          50: '#f9f7f4',
          100: '#f0ece5',
          200: '#e4ddd2',
          300: '#cfc4b5',
          400: '#b5a795',
          500: '#9a8d7c',
          600: '#7e7265',
          700: '#655a50',
          800: '#4e4540',
          900: '#3b3430',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
