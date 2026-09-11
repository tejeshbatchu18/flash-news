import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/gnews': {
        target: 'https://gnews.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gnews/, '/api/v4'),
      },
    },
  },
});