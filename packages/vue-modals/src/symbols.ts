import type { InjectionKey, Ref } from 'vue'
import type { ModalManager } from './ModalManager'
import type { Modal } from './Modal'

export const modalsSymbol = (
  DEV ? Symbol(`${NAME}:modals`) : /* istanbul ignore next */ Symbol()
) as InjectionKey<ModalManager>

export const modalSymbol = (
  DEV ? Symbol(`${NAME}:modal`) : /* istanbul ignore next */ Symbol()
) as InjectionKey<Ref<Modal>>
