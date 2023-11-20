import { inject } from 'vue'
import type { Modals } from '../Modals'
import { modalsSymbol } from '../symbols'

export function useModals(): Modals {
  return inject(modalsSymbol)!
}
