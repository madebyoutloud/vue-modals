# useModals

This composable returns instance of [ModalManager](/docs/api/modal-manager).

## Usage

```ts
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

function openModal() {
  modals.open(import('~/modals/Message.vue'), {
    props: {
      text: 'Hello World!'
    }
  })
}
```
