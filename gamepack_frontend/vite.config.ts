// gamepack-frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Allows using absolute path imports like '@/pages/Home'
    alias: {
      '@': '/src',
    },
  },
  server: {
    // Standard port for React development
    port: 5173, 
    // Proxy for connecting to the Django backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Matches the Django backend URL
        changeOrigin: true,
        secure: false, // Set to true if Django uses HTTPS
      },
    },
  },
});