import { computed, inject } from 'vue'
import { modalSymbol } from '../symbols'
import { useModals } from './useModals'

export function useModal<T = unknown>() {
  const modals = useModals()
  const modal = inject(modalSymbol, null)

  function close(resolveValue?: T) {
    if (!modal) {
      return
    }

    return modals.close(modal.value, resolveValue)
  }

  return {
    modal: computed(() => modal?.value ?? null),
    close,
  }
}
