import type { ModalManager } from './ModalManager'

export type { ModalsConfig } from './config'
export type { ModalConfirmProps } from './types'
export * from './ModalManager'
export * from './Modal'

// components
export { default as OModalsContainer } from './components/ModalsContainer.vue'

// composables
export * from './composables/modals'
export * from './composables/modal'

// plugin
export { createModals } from './plugin'

declare module 'vue' {
  export interface ComponentCustomProperties {
    /**
     * Vue Modal global state for the modal components and also provides
     * functions that can be used to control the modal components. {@link ModalManager}
     */
    $modals: ModalManager
  }
}
