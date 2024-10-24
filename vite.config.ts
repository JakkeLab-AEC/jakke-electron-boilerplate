import { defineConfig } from "vite";
import { resolve } from 'path';
import { builtinModules } from 'module';

export default defineConfig({
  base: './',
  define: {
    'process.env.VITE_MODE': JSON.stringify(process.env.VITE_MODE || 'development')
  },
  build: {
    outDir: '.vite/',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),  // main.ts 파일
        index: resolve(__dirname, 'index.html'),  // index.html 파일
      },
      external: [
        'electron',
      ],
      output: {
        entryFileNames: '[name].js',
        format: 'cjs',
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});