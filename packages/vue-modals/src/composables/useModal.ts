import { inject } from 'vue'
import { useModals } from './useModals'
import { modalSymbol } from '~/symbols'

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
