import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  // build: {
  //   ssr: true,
  //   rollupOptions: {
  //     input: './src/server.tsx',
  //   },
  // },
  // ssr: {
  //   noExternal: [
  //     '@mui/material',
  //     '@mui/material/utils',
  //     '@mui/utils',
  //     '@mui/system',
  //     '@mui/styled-engine',
  //     '@mui/icons-material',
  //     '@emotion/react',
  //     '@emotion/styled',
  //     'react-dom/server',
  //     'react',
  //   ],
  // },
});
