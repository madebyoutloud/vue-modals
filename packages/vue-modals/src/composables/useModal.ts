import { inject } from 'vue'
import { modalSymbol } from '../symbols'
import { useModals } from './useModals'

export const useModal = <T = unknown>() => {
  const modals = useModals()
  const modal = inject(modalSymbol)!

  const close = (resolveValue?: T) => {
    modals.close(modal.value, resolveValue)
  }

  return {
    close,
  }
}
