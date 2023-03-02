import type { App } from 'vue'
import { markRaw, warn } from 'vue'
import Modals from './Modals'
import type { ModalsConfig } from './config'
import { config } from './config'
import { modalsSymbol } from './symbols'

export const createModals = (options: Partial<ModalsConfig> = {}) => {
  const api = markRaw(new Modals(Object.assign({}, config, options)))

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
