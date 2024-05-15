# useModal

Composable that returns API for current opened modal.

## Usage

```ts
import { useModal } from '@outloud/vue-modals'

const { modal, close } = useModal()
```

### Reactive variant

Wrapped in `reactive()`.

```ts
import { useModal } from '@outloud/vue-modals'

const modal = $useModal()
```

### Optional modal
When you want to use composable in a component that can be used inside and outside of model component, you can set optional parameter.

```ts
import { useModal } from '@outloud/vue-modals'

const { modal, isModal, close } = useModal(true)
```

## Types
```ts
export declare function useModal<T = unknown>(): {
  modal: import("vue").ComputedRef<Modal<T>>;
  isModal: import("vue").ComputedRef<boolean>;
  close: (resolveValue?: T) => boolean | undefined;
}
```
