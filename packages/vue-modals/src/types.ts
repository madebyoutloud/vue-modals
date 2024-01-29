import type { Component, DefineComponent } from 'vue'

export type Lazy<T> = () => Promise<T>
export type ModalComponent = DefineComponent
export type RawModalComponent = ModalComponent | Lazy<ModalComponent>

export interface ModalConfirmProps {}

export type ComponentImport = () => Component
