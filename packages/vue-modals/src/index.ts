import type { ModalManager } from './ModalManager'

export type { ModalsConfig } from './config'
export * from './ModalManager'
export * from './Modal'
export type { ModalConfirmProps } from './types'

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
     * functions that can be used to control the modal components. {@link ModalManager}
     */
    $modals: ModalManager
  }
}
