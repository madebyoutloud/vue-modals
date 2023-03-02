import type { InjectionKey, Ref } from 'vue'
import type Modals from './Modals'
import type Modal from './Modal'

export const apiSymbol = Symbol(DEV ? `${NAME}:api` : '') as InjectionKey<Modals>
export const modalSymbol = Symbol(DEV ? `${NAME}:modal` : '') as InjectionKey<Ref<Modal>>
