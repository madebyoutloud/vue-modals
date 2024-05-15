# Modal Manager

Modal Manager is a class that manages all modals and can be easily extended.

It can by accessed using [`useModals`](/docs/composables/use-modals) composable.

```ts
import { useModals } from '@outloud/vue-modals'

const modals = useModals() // -> ModalManager
```

## Properties

### options
Type: [`ModalsConfig`](/docs/configuration).

### list
Type: [`Modal[]`](/docs/api/modal)

### content
Type: `Ref<HTMLElement | undefined> | undefined`

## Methods

### registerComponent
Globally registers component, that can be displayed without importing it again. You can optionally choose to preload it right away.

```ts
registerComponent(name: string, loader: LazyComponent, preload?: boolean): void

// example
modals.registerComponent('message', () => import('~/modals/Message.vue'), true)
```

### getComponent
Returns globally registered component.
```ts
getComponent(name: string): ComponentOrImport;
```

### get
Gets model by its ID.

```ts
get(id: string | number): Modal<any> | undefined;
```

### isOpen
Checks whether modal is open.

```ts
isOpen(modalOrId: string | number | Modal): boolean;
```

### open
Opens a new modal and returns promise.

```ts
open<
  T = any,
  C extends Component = Component
>(
  component: ComponentOrImport<C>,
  options?: ModalOpenOptions<ComponentProps<C>>
): Promise<T | undefined>;

// example
modals.open(import('~/modals/Form.vue'), {
  props: {
    data: {
      id: 123,
      title: 'Test'
    }
  }
})
```

### close
Closes active modal.

```ts
close(modalOrId: string | number | Modal, resolveValue?: unknown): boolean;
```

### confirm
Displays confirm modal.

```ts
confirm<T = boolean>(props: ModalConfirmProps): Promise<T | undefined>;
```

### extend
Extends ModalManager API.

```ts
extend(name: string, def: any): void;

// example
modals.extend('warning', (props) => modals.open(import('~/modals/Warning'), { props }))
```
