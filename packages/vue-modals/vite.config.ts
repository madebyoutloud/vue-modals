import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import packageJson from './package.json'

const name = 'index'
const external = ['vue', '@vueuse/core', 'body-scroll-lock']

export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    Vue(),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name,
      fileName: format => `${name}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external,
      output: {
        exports: 'auto',
        globals: {
          'vue': 'Vue',
          '@vueuse/core': 'VueUse',
        },
      },
    },
  },
  define: {
    DEV: JSON.stringify(process.env.NODE_ENV === 'development'),
    NAME: JSON.stringify(packageJson.name),
    VERSION: JSON.stringify(packageJson.version),
  },
})
