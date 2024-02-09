# useModal

Composable that returns API for current opened modal. It's intented to be used only inside modal component.

## Usage
```ts
import { useModal } from '@outloud/vue-modals'

const modal = useModal()
```

## Methods

### close(resolveValue)

Closes current modal.

## Type Declarations

```ts
export declare function useModal<T = unknown>(): {
  modal: import("vue").ComputedRef<Modal<T> | null>;
  isModal: import("vue").ComputedRef<boolean>;
  close: (resolveValue?: T) => boolean | undefined;
};
```

