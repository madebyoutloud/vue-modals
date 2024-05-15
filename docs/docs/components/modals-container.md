# Modals Container

Modals Container component displays all opened modals. It should be used only once in your root or layout component.

::: warning
Modals won't be displayed if this component is not registered in your Vue app.
:::

## Usage

The best place to add it is your main `App.vue` file.

When using **Nuxt** you can add it to `app.vue` or a layout in layouts folder.

::: tip
It is strongly recommended to set `content` element. When a modal is displayed the content element will be disabled and won't interrupt user actions by setting [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) attribute.
:::

::: code-group
```vue [App.vue]
<script setup lang="ts">
import { OModalsContainer } from '@outloud/vue-modals' // [!code highlight]
import { useModals } from '@outloud/vue-modals's

const modals = useModals()

// create ref for content element
const $content = ref<HTMLElement>()

// pass this ref to modals
// when modal is displayed an inert attribute is added to this element
modals.content = $content
</script>

<template>
  <div>
    ...

    <!-- add ref to element -->
    <main ref="$content">
      <!-- RouterView or NuxtLayout -->
    </main>

    <!-- add Modals Container component -->
    <OModalsContainer /> // [!code highlight]
  </div>
</template>
```
:::


