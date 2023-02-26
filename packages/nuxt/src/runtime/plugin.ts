import { createModals } from '@outloud/vue-modals'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const modals = createModals({})

  nuxtApp.vueApp.use(modals)
})
