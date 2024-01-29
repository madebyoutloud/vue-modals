import type { DefineComponent } from 'vue'
import { ref } from 'vue'

export type ModalListener = (...args: any[]) => void

export type ModalId = string | number
export type ModalStatus = 'pending' | 'open' | 'closed'
export type ModalProps = Record<string, any>
export type ModalListeners = Record<string, ModalListener>

export type ModalOptions = {
  clickToClose?: boolean
  escToClose?: boolean
}

export type ModalData = ModalOptions & {
  id: ModalId
  props: ModalProps
  listeners: ModalListeners
}

export class Modal<T = any> {
  readonly id: ModalId
  readonly props: ModalProps
  readonly listeners: ModalListeners
  readonly options: ModalOptions

  status: ModalStatus = 'pending'
  isReady = ref(false)
  component?: DefineComponent
  promise?: Promise<T | undefined>
  reject?: (err: Error) => void
  resolve?: (value: T) => void

  constructor({ id, props, listeners, ...options }: ModalData) {
    this.id = id
    this.props = props
    this.listeners = listeners
    this.options = options
  }
}
