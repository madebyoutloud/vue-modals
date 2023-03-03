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
export declare const useModal: <T = unknown>() => {
    close: (resolveValue?: T | undefined) => void;
};
```

