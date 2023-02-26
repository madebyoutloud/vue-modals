import type { App } from 'vue'
import { markRaw, warn } from 'vue'
import Modals from './Modals'
import type { ModalsConfig } from './config'
import { config } from './config'
import { apiSymbol } from './symbols'

export const createModals = (options: Partial<ModalsConfig> = {}) => {
  const api = new Modals(Object.assign({}, config, options)) as Modals & { install: (app: App) => void }
  const modals = markRaw(api)

  api.install = (app: App) => {
    if (app.config.globalProperties.$modals) {
      warn(`${NAME}: already installed`)
      return
    }

    app.config.globalProperties.$modals = modals

    app.provide(apiSymbol, modals)
  }

  return modals
}
