import type Modals from './Modals'

export type { ModalsConfig } from './config'

export * from './Modals'
export * from './Modal'

// components
export { default as OModalsContainer } from './components/ModalsContainer.vue'

// composables
export * from './composables/useModals'
export * from './composables/useModal'

// plugin
export { createModals } from './plugin'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Vue Modal global state for the modal components and also provides
     * functions that can be used to control the modal components. {@link Modals}
     */
    $modals: Modals
  }
}
