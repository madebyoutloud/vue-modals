import type { InjectionKey, Ref } from 'vue'
import type Modals from './Modals'
import type Modal from './Modal'

export const apiSymbol = Symbol(`${NAME}:api`) as InjectionKey<Modals>
export const modalSymbol = Symbol(`${NAME}:modal`) as InjectionKey<Ref<Modal>>
