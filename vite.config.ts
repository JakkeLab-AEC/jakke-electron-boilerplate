import { defineConfig } from "vite";
import { resolve } from 'path';
import { builtinModules } from 'module';

export default defineConfig({
    define: {
      'process.env.VITE_MODE': JSON.stringify(process.env.VITE_MODE || 'development')
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),  // main.ts의 경로를 지정
        formats: ['cjs'],  // CommonJS 형식으로 번들
      },
      outDir: '.vite/',  // 빌드된 결과를 저장할 폴더
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/main.ts'),  // main.ts 파일
          index: resolve(__dirname, 'index.html')  // index.html 파일
        },
        external: [
          'electron',
          ...builtinModules,  // Node.js 기본 모듈을 외부로 처리
        ],
        output: {
          entryFileNames: '[name].js',  // main.ts -> main.js로 빌드,
          format: 'cjs',
        },
      },
    },
    server: {
        port: 3000,
    }
});