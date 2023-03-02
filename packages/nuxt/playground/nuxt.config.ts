import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  alias: {
    '@outloud/vue-modals/style.css': fileURLToPath(new URL('../../vue-modals/dist/style.css', import.meta.url)),
    '@outloud/vue-modals': fileURLToPath(new URL('../../vue-modals/dist/index.es.js', import.meta.url)),
  },
  modules: ['../src/module'],
})
