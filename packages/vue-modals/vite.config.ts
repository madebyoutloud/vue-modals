import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

const name = 'index'
const external = ['vue', '@vueuse/core', 'tua-body-scroll-lock']

export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(import.meta.dirname, 'src')}`,
    },
  },
  plugins: [
    Vue(),
    dts({
      rollupTypes: true,
    }),
  ],
  publicDir: false,
  build: {
    minify: false,
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      name,
      fileName: (format) => `${name}.${format === 'es' ? 'mjs' : 'cjs'}`,
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
