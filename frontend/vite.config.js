import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist', // Directorio de salida para el build
    emptyOutDir: true, // Limpia el directorio de salida antes de construir
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Usa path para resolver rutas absolutas
    },
  },
  base: '/', // Asegura que Vite entienda el punto de entrada en producción
});