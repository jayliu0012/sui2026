
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 為 GitHub Pages subpath 設定正確 base（必須是絕對路徑或 './'）
  base: '/sui2026/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
