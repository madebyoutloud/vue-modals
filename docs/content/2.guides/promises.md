# Promises

When you open a modal a promise is returned so you can await the modal state or receive any kind of payload from modal.

## Wait for modal to close

```ts {6,12}
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

const openModal = async () => {
  await modals.open(import('~/modals/Message.vue'), {
    props: {
      text: 'Hello World!'
    }
  })

  console.log('Modal is closed now')
}
```

## Return payload from modal

::code-group
  ```ts [page.vue]{6,12}
  import { useModals } from '@outloud/vue-modals'

  const modals = useModals()

  const openModal = async () => {
    const result = await modals.open(import('~/modals/MyModal.vue'), {
      props: {
        text: 'Hello World!'
      }
    })

    console.log('received', result)
  }
  ```

  ```vue [modals/MyModal.vue]
  <template>
    <Modal>
      <p>Text</p>
      <button @click="save()">Save</button>
    </Modal>
  </template>

  <script lang="ts" setup>
  import { useModal } from '@outloud/vue-modals'

  const { close } = useModal()

  const save = async () => {
    // send data to api
    const data = await fetch('form', {})

    close(data)
  }
  </script>
  ```
::
