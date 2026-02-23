/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f5ff',
          200: '#cdeaff',
          300: '#a8ddff',
          400: '#73caff',
          500: '#3ab8ff',
          600: '#109ee8',
          700: '#0b7ab5',
          800: '#095f8d',
          900: '#0b4d72',
        },
      },
    },
  },
  plugins: [],
};
