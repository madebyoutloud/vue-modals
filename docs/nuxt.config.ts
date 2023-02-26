import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: ['@outloud/nuxt-modals'],
  vite: {
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
  },
})
