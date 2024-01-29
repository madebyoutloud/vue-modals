import type { Ref } from 'vue'
import { computed, inject, reactive } from 'vue'
import { modalSymbol } from '../symbols'
import type { Modal } from '../Modal'
import { useModals } from './useModals'

export function useModal<T = unknown>() {
  const modals = useModals()
  const modal = inject<Ref<Modal<T>> | null>(modalSymbol, null)

  function close(resolveValue?: T) {
    if (!modal) {
      return
    }

    return modals.close(modal.value, resolveValue)
  }

  return {
    modal: computed(() => modal ? modal.value : null),
    isModal: computed(() => !!modal),
    close,
  }
}

export function $useModal<T = unknown>() {
  return reactive(useModal<T>())
}
