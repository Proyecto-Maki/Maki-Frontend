// 

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Directorio de salida (Railway debe servir este)
  },
  server: {
    port: 3000, // Puedes cambiar el puerto según tu preferencia
    open: true, // Abre automáticamente en el navegador durante desarrollo
  },
  preview: {
    port: 8080, // Puerto que se usará para `vite preview`
  },
});
