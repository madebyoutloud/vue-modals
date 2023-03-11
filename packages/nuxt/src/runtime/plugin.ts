import { createModals } from '@outloud/vue-modals'
import { defineNuxtPlugin } from '#app'
// @ts-expect-error this file will be created by module
import { modalsOptions } from '#build/modals-options'

export default defineNuxtPlugin((nuxtApp) => {
  const modals = createModals(modalsOptions)

  nuxtApp.vueApp.use(modals)

  return {
    provide: {
      modals: modals.api,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $modals: import('@outloud/vue-modals').Modals
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $modals: import('@outloud/vue-modals').Modals
  }
}
