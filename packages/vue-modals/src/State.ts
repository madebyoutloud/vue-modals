import { type Component, type Raw, reactive, type Ref } from 'vue'
import type { Modal, ModalOptions } from './Modal'
import type { LazyComponent } from './types'
import { defaults, type ModalsConfig } from './config'

interface ComponentData {
  loader: LazyComponent
  component?: Component
}

export class State {
  list = reactive<Raw<Modal>[]>([])
  content?: Ref<HTMLElement | undefined>
  components = new Map<string, ComponentData>()
  modalId = 1
  options: ModalOptions

  constructor(options?: Partial<ModalsConfig>) {
    this.options = Object.assign({}, defaults, options)
  }
}
