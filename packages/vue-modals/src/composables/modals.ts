import { getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import type { ModalManager } from '../ModalManager'
import { modalsSymbol } from '../symbols'

export function useModals(): ModalManager {
  const uid = getCurrentInstance()?.uid
  const modals = inject(modalsSymbol)!
  const scope = uid !== undefined ? modals.scope(uid) : modals

  onBeforeUnmount(() => {
    uid !== undefined && scope.closeScope()
  })

  return scope
}
