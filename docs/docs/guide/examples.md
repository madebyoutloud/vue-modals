# Examples

## Show modal

::: sandbox {rtl template=vite-vue-ts}
```vue src/Preview.vue [active]
<template>
  <div>
    <button @click="open">Open modal</button>
  </div>
</template>

<script setup lang="ts">
import { useModals } from "@outloud/vue-modals";

const modals = useModals();

function open() {
  modals.open(import("./Modal.vue"), {
    props: {
      closable: true,
      title: "Deactivate account",
      text: "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.",
    },
  });
}
</script>
```
:::

## Wait to close
When opening a modal, a promise will be returned, which can be awaited until the modal is closed.

::: sandbox {rtl template=vite-vue-ts}
```vue src/Preview.vue [active]
<template>
  <div class="flex items-center gap-4">
    <button @click="open">Open modal</button>
    <span>Status: {{ status }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from "@outloud/vue-modals";

const modals = useModals();
const status = ref('')

async function open() {
  status.value = 'open'

  await modals.open(import("./Modal.vue"), {
    props: {
      closable: true,
      text: "The library will resolve the promise when modal is closed.",
    },
  });

  status.value = 'closed'
}
</script>
```
:::

## Return payload
You can return any payload when closing a modal. If you close modal by clicking on background or pressing Esc an `undefined` value will be returned.

::: sandbox {rtl template=vite-vue-ts}
```vue src/Preview.vue [active]
<template>
  <div class="flex items-center gap-4">
    <button @click="open">Open modal</button>
    <span>Result: {{ result }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@outloud/vue-modals'

const modals = useModals()
const result = ref()

async function open() {
  // it's also possible to specify returned type
  result.value = await modals.open<Record<string, unknown>>(
    import('./Form.vue')
  )

  console.log('received', result.value)
}
</script>
```

```vue src/Form.vue
<template>
  <Modal title="Payload">
    <template #actions>
      <button type="button" @click="save">Save</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from './Modal.vue'
import { useModal } from '@outloud/vue-modals'

const { close } = useModal()

async function save() {
  // send data to api
  // const result = await fetch('form', {})
  const result = { message: 'Hello World' }

  // send result back to caller
  close(result)
}
</script>
```
:::

## Using listeners
When opening a modals you can provide listeners that will be called when components emits an event.

::: sandbox {rtl template=vite-vue-ts}
```vue src/Preview.vue [active]
<template>
  <div class="flex items-center gap-4">
    <button @click="open">Open modal</button>
    <span>Value: {{ result }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@outloud/vue-modals'

const modals = useModals()
const result = ref<number>()

function onUpdate(value: number) {
  result.value = value
}

function open() {
  modals.open(import('./Events.vue'), {
    listeners: {
      update: onUpdate,
    }
  })
}
</script>
```

```vue src/Events.vue
<template>
  <Modal title="Events">
    <template #actions>
      <button @click="update">Update</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from './Modal.vue'

const emit = defineEmits<{
  update: [value: number]
}>()

function update() {
  emit('update', Math.random())
}
</script>
```
:::

## Fetching data
Sometimes you might need to load extra data before displaying the modal. There is an option for that.

::: sandbox {rtl template=vite-vue-ts}
```vue src/Preview.vue [active]
<template>
  <div>
    <button @click="open">Open modal</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

function open() {
  modals.open(import('./Modal.vue'), {
    props: {
      closable: true,
      text: 'Title for this modal will be fetched from API.'
    },
    fetchData: async () => {
      const result = await (await fetch('https://api.country.is')).json()

      // this data will be merged with provided props
      return {
        title: result.country,
      }
    }
  })
}
</script>
```
:::

## Confirm
Modals are often used when displaying confirm action. There is a utility method that makes it easier.

::: sandbox {rtl template=vite-vue-ts}
```vue src/Preview.vue [active]
<template>
  <div>
    <div class="flex items-center gap-4">
    <button @click="open">Open modal</button>
    <span>Result: {{ result }}</span>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@outloud/vue-modals'

const modals = useModals()
const result = ref<boolean>()

async function open() {
  const confirmed = await modals.confirm({
    title: 'Delete',
    text: 'Are you sure to delete this item? This action is irreversible.'
  })

  result.value = confirmed
}

</script>
```

```vue src/Confirm.vue
<template>
  <Modal v-bind="props">
    <template #actions>
      <button @click="close(false)">Cancel</button>
      <button @click="close(true)">Confirm</button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { useModal } from '@outloud/vue-modals'
import Modal from './Modal.vue'

const props = defineProps<{
  title?: string
  text?: string
}>()

const { close } = useModal()
</script>
```

```ts src/plugin.ts
// this file should be loaded as Vue.js plugin
export const plugin = {
  install(app) {
    const modals = app.config.globalProperties.$modals
    modals.registerComponent('confirm', () => import('./Confirm.vue'), true)
  }
}

// extend prop types
declare module '@outloud/vue-modals' {
  interface ModalConfirmProps {
    title?: string
    tect?: string
  }
}
```
:::
