import type { Ref } from 'vue'
import { computed, inject, reactive } from 'vue'
import { modalSymbol } from '../symbols'
import type { Modal } from '../Modal'
import { useModals } from './modals'

export function useModal<
  T = unknown,
  O extends boolean = false,
  M extends Ref<Modal<T>> | null = O extends false ? Ref<Modal<T>> : (Ref<Modal<T>> | null),
>(optional?: O) {
  const modals = useModals()
  const modal = inject<Ref<Modal<T>> | null>(modalSymbol, null) as M

  if (!modal && !optional) {
    throw new Error('useModal() called outside of modal context')
  }

  function close(resolveValue?: T) {
    return modal ? modals.close(modal.value, resolveValue) : false
  }

  return {
    modal,
    isModal: computed(() => !!modal),
    close,
  }
}

export function $useModal<T = unknown, O extends boolean = false>(optional?: O) {
  return reactive(useModal<T, O>(optional))
}
