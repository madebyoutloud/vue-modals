import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  extends: ['@outloud/docs'],
  modules: ['@outloud/nuxt-modals'],
  alias: {
    '@outloud/vue-modals/style.css': fileURLToPath(new URL('../packages/vue-modals/dist/style.css', import.meta.url)),
    '@outloud/vue-modals': fileURLToPath(new URL('../packages/vue-modals/dist/index.mjs', import.meta.url)),
  },
  vite: {
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
  },
})
