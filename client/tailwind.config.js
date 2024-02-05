/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 3s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

