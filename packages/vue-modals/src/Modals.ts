import type { Raw } from 'vue'
import { markRaw, reactive } from 'vue'
import Modal from './Modal'
import type { ModalData, ModalId, ModalProps } from './Modal'
import type { ModalsConfig } from './config'

export type ModalOpenOptions = Partial<ModalData> & {
  fetchData?: () => Promise<ModalProps | void>
}

export default class Modals {
  private modalId = 1
  public list = reactive<Raw<Modal>[]>([])

  constructor(public options: ModalsConfig) {}

  private load(modal: Modal, component: any, options: ModalOpenOptions) {
    const promises: Promise<any>[] = []

    if (component instanceof Promise) {
      promises.push(
        component.then((resolved) => {
          modal.component = resolved.default ?? resolved
        }),
      )
    }
    else {
      modal.component = component
    }

    if (options.fetchData) {
      promises.push(
        options.fetchData().then(result => result && Object.assign(modal.props, result)),
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
    return this.list.find(item => item.id === id)
  }

  getIsOpen(modalOrId: ModalId | Modal) {
    return this.list.some(item => item.id === modalOrId || item === modalOrId)
  }

  open<T = any>(component: any, options: ModalOpenOptions = {}) {
    const mergedOptions = Object.assign({
      id: this.modalId++,
      props: {},
      listeners: {},
    }, this.options, options)

    if (this.getIsOpen(mergedOptions.id)) {
      return
    }

    const modal = new Modal<T>(mergedOptions)

    this.load(modal, component, options)

    const promise = new Promise<T>((resolve, reject) => {
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
    }
    else {
      modal.resolve && modal.resolve(resolveValue)
    }

    modal.resolve = undefined
    modal.reject = undefined
    modal.promise = undefined

    modal.status = 'closed'
    this.list.splice(this.list.indexOf(modal), 1)

    // console.log('got', this.list.value)

    return true
  }

  extend(name: string, def: any) {
    const prototype: any = Modals.prototype
    prototype[name] = def
  }
}

export { Modals }
