import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Force Vite to bypass package exports and load the specific minified ESM file directly
      'onnxruntime-web': path.resolve('node_modules/onnxruntime-web/dist/ort.all.min.mjs'),
    },
  },
  optimizeDeps: {
    // Exclude these from pre-bundling — they are WASM-heavy and self-contained
    exclude: ['onnxruntime-web', 'kokoro-js', '@realtimex/piper-tts-web'],
  },
  build: {
    chunkSizeWarningLimit: 100000, // 100MB — TTS models are huge
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    // Required for SharedArrayBuffer (WASM threading)
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});
