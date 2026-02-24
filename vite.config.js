import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import handlebars from '@yoichiro/vite-plugin-handlebars';

export default defineConfig({
  // assetsInclude: ['**/*.hbs'],
  plugins: [
    tsconfigPaths(),
    handlebars({
      // templateFileExtension: ['hbs'],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
