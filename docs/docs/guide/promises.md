# Promises
When you open a modal a promise is returned so you can await the modal state or receive any kind of payload from modal.

### Wait for modal to close

```ts
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

async function openModal() {
  await modals.open(import('~/modals/Message.vue'), {
    props: {
      text: 'Hello World!'
    }
  })

  console.log('Modal is closed now')
}
```

### Return payload from modal
::: code-group
```ts [page.vue]
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

async function openModal() {
  // it's also possible to defined returned type
  const result = await modals.open<Record<string, unknown>>(
    import('~/modals/Test.vue'),
    {
      props: {
        text: 'Hello World!'
      }
    }
  )

  console.log('received', result)
}
```

```vue [modals/Test.vue]
<template>
  <Modal>
    <p>Text</p>

    <button type="button" @click="save">Save</button>
  </Modal>
</template>

<script lang="ts" setup>
import { useModal } from '@outloud/vue-modals'

const { close } = useModal()

async function save() {
  // send data to api
  const result = await fetch('form', {})

  // send result back to caller
  close(data)
}
</script>
```
:::
