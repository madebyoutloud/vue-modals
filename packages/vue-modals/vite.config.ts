import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

const name = 'index'

export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    DefineOptions(),
    dts({
      tsConfigFilePath: 'tsconfig.dts.json',
      skipDiagnostics: true,
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name,
      fileName: format => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        '@vueuse/core',
        '@vueuse/integrations/useFocusTrap',
        'focus-trap',
      ],
      output: {
        exports: 'auto',
        globals: {
          'vue': 'Vue',
          '@vueuse/core': 'VueUse',
          '@vueuse/integrations/useFocusTrap': 'VueUseFocusTrap',
          'focus-trap': 'FocusTrap',
        },
      },
    },
  },
  define: {
    DEV: JSON.stringify(!process.env.prod),
    NAME: JSON.stringify(packageJson.name),
    VERSION: JSON.stringify(packageJson.version),
  },
})
