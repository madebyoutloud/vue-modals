# Examples

## Using listeners
When opening a modals you can provide listeners that will be called when components emits an event.

::: code-group
```ts [page.vue]
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

function onUpdate(value: number) {
  console.log('received', value)
}

async function openModal() {
  modals.open<Record<string, unknown>>(
    import('~/modals/Events.vue'),
    {
      listeners: {
        update: onUpdate,
      }
    }
  )
}
```

```vue [modals/Events.vue]
<template>
  <Modal>
    <p>Events</p>

    <button type="button" @click="update">Update</button>
  </Modal>
</template>

<script lang="ts" setup>
import { useModal } from '@outloud/vue-modals'

const emit = defineEmits<{
  update: [value: number]
}>()

const { close } = useModal()

function update() {
  emit('update', Math.random())
}
</script>
```
:::

## Fetching data for modal
Sometimes you might need to load extra data before displaying the modal. There an option for that.

```ts
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

function openModal() {
  modals.open(import('~/modals/Test.vue'), {
    props: {
      text: 'Hello World!'
    },
    fetchData: async () => {
      const categories = await fetch('/categories')

      // this data will be merged with provided props
      return {
        categories,
      }
    }
  })
}
```
