/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files inside src
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb', // Custom border color
        primary: '#1d4ed8', // Example primary color
        secondary: '#9333ea', // Example secondary color
      },
    },
  },
  plugins: [],
};
