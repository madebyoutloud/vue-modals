import { inject } from 'vue'
import { apiSymbol } from '~/symbols'

export const useModals = () => {
  return inject(apiSymbol)!
}
