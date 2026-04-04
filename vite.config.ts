import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: resolve(__dirname, 'src/api'),
      assets: resolve(__dirname, 'src/assets'),
      components: resolve(__dirname, 'src/components'),
      constants: resolve(__dirname, 'src/constants'),
      Hoc: resolve(__dirname, 'src/Hoc'),
      interfaces: resolve(__dirname, 'src/interfaces'),
      pages: resolve(__dirname, 'src/pages'),
      utils: resolve(__dirname, 'src/utils'),
      App: resolve(__dirname, 'src/App'),
      AppProvider: resolve(__dirname, 'src/AppProvider'),
      AppRoutes: resolve(__dirname, 'src/AppRoutes'),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
});
