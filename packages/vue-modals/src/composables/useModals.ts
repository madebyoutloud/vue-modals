import { inject } from 'vue'
import type { ModalManager } from '../ModalManager'
import { modalsSymbol } from '../symbols'

export function useModals(): ModalManager {
  return inject(modalsSymbol)!
}
