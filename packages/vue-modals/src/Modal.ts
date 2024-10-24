import type { Component } from 'vue'
import { ref } from 'vue'

export type ModalListener = (...args: any[]) => void

export type ModalId = string | number
export type ModalScope = ModalId
export type ModalStatus = 'pending' | 'open' | 'closed'
export type ModalProps = Record<string, any>
export type ModalListeners = Record<string, ModalListener>

export interface ModalOptions {
  clickToClose?: boolean
  escToClose?: boolean
  fullscreen?: boolean
}

export interface ModalData<Props = ModalProps> extends ModalOptions {
  id: ModalId
  scope?: ModalScope
  props: Props
  listeners: ModalListeners
}

export class Modal<T = any> {
  readonly id: ModalId
  readonly scope?: ModalScope
  readonly props: ModalProps
  readonly listeners: ModalListeners
  readonly options: ModalOptions

  status: ModalStatus = 'pending'
  isReady = ref(false)
  component?: Component
  promise?: Promise<T | undefined>
  reject?: (err: Error) => void
  resolve?: (value: T) => void

  constructor({ id, scope, props, listeners, ...options }: ModalData) {
    this.id = id
    this.scope = scope
    this.props = props
    this.listeners = listeners
    this.options = options
  }
}
