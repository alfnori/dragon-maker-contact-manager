import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    sourcemap: true,
    ssr: true,
    rollupOptions: {
      input: './src/entry-server.tsx',
    },
  },
  ssr: {
    noExternal: ['@mui/*', '@emotion/*'],
    optimizeDeps: {
      include: ['@mui/*', '@emotion/*'],
    },
  },
});
