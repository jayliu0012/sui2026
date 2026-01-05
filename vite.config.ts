
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './sui2026/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
