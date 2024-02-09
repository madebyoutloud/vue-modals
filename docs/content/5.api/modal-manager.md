# ModalManager

API that manages the modals.

## Methods

### get(id)
Returns modal by ID.

### isOpen(modalOrId)
Returns whether the modal is currently open.

### open(component, options)
Opens a modal.

### close(modalOrId, resolveValue)
Closes a modal.

### confirm(props)
Opens confirm modal.

### extend(name, def)
Extends API.

## Type declarations
```ts
export type ModalOptions = {
  clickToClose?: boolean;
  escToClose?: boolean;
};
export type ModalData = ModalOptions & {
  id: ModalId;
  props: ModalProps;
  listeners: ModalListeners;
};
export type ModalOpenOptions = Partial<ModalData> & {
  fetchData?: () => Promise<ModalProps | void>;
};
export declare class ModalManager {
  options: ModalsConfig;
  private modalId;
  list: Raw<Modal<any>>[];
  private components;
  private content;
  constructor(options: ModalsConfig);
  getContent(): HTMLElement | undefined;
  getComponent(name: string): Component;
  setComponent(name: string, component: ComponentImport): void;
  setContent(el: Ref<HTMLElement | undefined>): void;
  private load;
  get(id: ModalId): Raw<Modal<any>> | undefined;
  isOpen(modalOrId: ModalId | Modal): boolean;
  open<T = any>(component: Component, options?: ModalOpenOptions): Promise<T | undefined> | undefined;
  close(modalOrId: ModalId | Modal, resolveValue?: unknown): boolean;
  confirm<T = boolean>(props: ModalConfirmProps): Promise<T | undefined> | undefined;
  extend(name: 
```
