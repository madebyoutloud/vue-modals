import type { Component, Raw, Ref } from 'vue'
import { markRaw, reactive } from 'vue'
import { Modal } from './Modal'
import type { ModalData, ModalId, ModalProps } from './Modal'
import type { ModalsConfig } from './config'
import type { ComponentOrImport, ComponentProps, LazyComponent, ModalConfirmProps } from './types'

export type ModalOpenOptions<Props = ModalProps> = Partial<ModalData<Props>> & {
  fetchData?: () => Promise<ModalProps | undefined>
}

interface ComponentData {
  loader: LazyComponent
  component?: Component
}

export class ModalManager {
  list = reactive<Raw<Modal>[]>([])
  content?: Ref<HTMLElement | undefined>

  private modalId = 1
  private components = new Map<string, ComponentData>()

  constructor(public options: ModalsConfig) {}

  getComponent(name: string): ComponentOrImport {
    const component = this.components.get(name)

    if (!component) {
      throw new Error(`Component "${name}" not found`)
    }

    if (component.component) {
      return component.component
    }

    const result = component.loader()

    if (result instanceof Promise) {
      return result.then((resolved) => {
        component.component = resolved.default ?? resolved
        return resolved
      })
    } else {
      component.component = result

      return result
    }
  }

  registerComponent(name: string, loader: LazyComponent, preload = false) {
    this.components.set(name, { loader })

    if (preload) {
      const result = this.getComponent(name)

      if (result instanceof Promise) {
        result.catch((err) => {
          console.error(`Failed to preload component "${name}": ${err.message}`)
        })
      }
    }
  }

  private load(modal: Modal, component: any, options: ModalOpenOptions) {
    const promises: Promise<any>[] = []

    if (component instanceof Promise) {
      promises.push(
        component.then((resolved) => {
          modal.component = resolved.default ?? resolved
        }),
      )
    } else {
      modal.component = component
    }

    if (options.fetchData) {
      promises.push(
        options.fetchData()
          .then((result) => result && Object.assign(modal.props, result)),
      )
    }

    if (!promises.length) {
      modal.status = 'open'
      modal.isReady.value = true
      return
    }

    Promise.all(promises)
      .then(() => {
        if (modal.status !== 'closed') {
          modal.status = 'open'
          modal.isReady.value = true
        }
      })
      .catch((err) => {
        this.close(modal, err)
      })
  }

  get(id: ModalId) {
    return this.list.find((item) => item.id === id)
  }

  isOpen(modalOrId: ModalId | Modal) {
    return this.list.some((item) => item.id === modalOrId || item === modalOrId)
  }

  open<T = any, C extends Component = Component>(
    component: ComponentOrImport<C>,
    options: ModalOpenOptions<ComponentProps<C>> = {},
  ) {
    const mergedOptions = Object.assign({
      id: this.modalId++,
      props: {},
      listeners: {},
    }, this.options, options)

    const existingModal: Modal<T> | undefined = this.get(mergedOptions.id)

    if (existingModal) {
      return existingModal.promise!
    }

    const modal = new Modal<T>(mergedOptions)

    this.load(modal, component, options)

    const promise = new Promise<T | undefined>((resolve, reject) => {
      modal.resolve = resolve
      modal.reject = reject
    })

    modal.promise = promise
    this.list.push(markRaw(modal))

    return promise
  }

  close(modalOrId: ModalId | Modal, resolveValue?: unknown) {
    const modal = modalOrId instanceof Modal ? modalOrId : this.get(modalOrId)

    if (!modal || modal.status === 'closed') {
      return false
    }

    if (resolveValue instanceof Error) {
      modal.reject && modal.reject(resolveValue)
    } else {
      modal.resolve && modal.resolve(resolveValue)
    }

    modal.resolve = undefined
    modal.reject = undefined
    modal.promise = undefined

    modal.status = 'closed'
    this.list.splice(this.list.indexOf(modal), 1)

    return true
  }

  confirm<T = boolean>(props: ModalConfirmProps) {
    return this.open<T>(this.getComponent('confirm'), {
      props,
    })
  }

  extend(name: string, def: any) {
    const prototype: any = ModalManager.prototype
    prototype[name] = def
  }
}
