import type { App } from 'vue'
import { markRaw, warn } from 'vue'
import { ModalManager } from './ModalManager'
import type { ModalsConfig } from './config'
import { config } from './config'
import { modalsSymbol } from './symbols'

export function createModals(options: Partial<ModalsConfig> = {}) {
  const api = markRaw(new ModalManager(Object.assign({}, config, options)))

  const install = (app: App) => {
    if (app.config.globalProperties.$modals) {
      warn(`${NAME}: already installed`)
      return
    }

    app.config.globalProperties.$modals = api

    app.provide(modalsSymbol, api)
  }

  const plugin = {
    api,
    install,
  }

  return plugin
}
