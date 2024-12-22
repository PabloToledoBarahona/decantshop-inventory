import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist', // Directorio de salida para el build
  },
  resolve: {
    alias: {
      '@': '/src', // Alias para acceder más fácilmente a la carpeta src
    },
  },
});