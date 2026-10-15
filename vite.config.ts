import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 1. Tell Vite to build workers as ES modules
  worker: {
    format: 'es'
  },
  // 2. Ensure the main build target supports top-level await
  build: {
    target: 'esnext'
  }
});