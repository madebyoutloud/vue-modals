import type { AllowedComponentProps, Component, VNodeProps } from 'vue'

export interface ModalConfirmProps {}

export type ComponentOrImport<C extends Component = Component> = C | Promise<{ default: C }>

export type LazyComponent<C extends Component = Component> = () => ComponentOrImport<C>

export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never
