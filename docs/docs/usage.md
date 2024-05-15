# Usage

It's recommended to create a layout component for your modals which adds basic elements, styles and your custom modals would be be wrapped in it.

## Modal layout component

Optional but **recommended.**

::: code-group
```vue [components/Modal.vue]
<template>
  <div class="modal">
    <header class="header">
      <div class="title">{{ title }}</div>

      <button type="button" @click="close()">Close</button>
    </header>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useModal } from '@outloud/vue-modals'

const { close } = useModal()

defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.modal {
  margin: auto;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
}
</style>
```
:::

## Custom modal component

Create a custom modal component, for example `Message.vue` or `EditForm.vue`.

::: code-group
```vue [modals/Message.vue]
<template>
  <Modal title="Message">
    <p>{{ text }}</p>

    <button type="button" @click="close(true)">OK</button>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from '~/components/Modal.vue'
import { useModal } from '@outloud/vue-modals'

const { close } = useModal()

defineProps<{
  text: string
}>()
</script>
```
:::

## Open modal

Now you can open the created custom modal anywhere in your codebase. You can lazy import the Modal, so it will be only loaded when actually displayed.

```vue
<template>
  <button @click="openModal">Open modal</button>
</template>

<script lang="ts" setup>
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

function openModal() {
  modals.open(import('~/modals/Message.vue'), {
    props: {
      text: 'Hello World!'
    }
  })
}
</script>
```
