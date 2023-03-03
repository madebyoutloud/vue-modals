# Modals

API that manages the modals.

## Methods

### get(id)
Returns modal by ID.

### getIsOpen(modalOrId)
Returns whether the modal is currently open.

### open(component, options)
Opens a modal.

### close(modalOrId, resolveValue)
Closes a modal.

### confirm(props)
Opens confirm modal.

### extend(name, def)
Extends API.

## Type Declarations
```ts
export type ModalsOpenOptions = Partial<ModalData> & {
    fetchData?: () => Promise<ModalProps | void>;
}

export interface ModalsConfirmProps {
}

type ModalsComponentImport = () => any;
export default class Modals {
    options: ModalsConfig;
    private modalId;
    list: Raw<Modal<any>>[];
    private components;
    constructor(options: ModalsConfig);
    getComponent(name: string): ModalsComponentImport;
    setComponent(name: string, component: ModalsComponentImport): void;
    private load;
    get(id: ModalId): Raw<Modal<any>> | undefined;
    getIsOpen(modalOrId: ModalId | Modal): boolean;
    open<T = any>(component: any, options?: ModalsOpenOptions): Promise<T> | undefined;
    close(modalOrId: ModalId | Modal, resolveValue?: unknown): boolean;
    confirm<T = boolean>(props: ModalsConfirmProps): Promise<T> | undefined;
    extend(name: string, def: any): void;
}
```
