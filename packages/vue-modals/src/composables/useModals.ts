import { inject } from 'vue'
import type { Modals } from '../Modals'
import { apiSymbol } from '../symbols'

export const useModals = (): Modals => {
  return inject(apiSymbol)!
}
