/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',           // Archivo HTML principal en la raíz (Vite)
    './src/**/*.{js,ts,jsx,tsx}', // Archivos JS, TS, JSX y TSX dentro de src
    './public/**/*.html',     // Archivos HTML adicionales en public si existen
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};