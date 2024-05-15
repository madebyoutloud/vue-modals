# Nuxt
Get started with Vue Modals using Nuxt.

## Installation

::: code-group
```sh-vue [npm]
npm add {{$nuxtJson.name}}
```
```sh-vue [pnpm]
pnpm add {{$nuxtJson.name}}
```
```sh-vue [yarn]
yarn add {{$nuxtJson.name}}
```
```sh-vue [bun]
bun add {{$nuxtJson.name}}
```
:::

## Setup

### 1. Register Nuxt module

See [Configuration](/configuration) for options.

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@outloud/nuxt-modals', // [!code highlight]
  ],
  modals: { /* options */ }
})
```
:::

### 2. Add modals container component

The best place is to add it to your `app.vue` file or layout in layouts folder.

::: tip
It is also strongly recommended to set `content` element, which will become disabled when modal is displayed, see [Modals Container](/components/modals-container) for more information.
:::

::: code-group
```vue [app.vue]
<template>
  <div>
    ...

    <div ref="$content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <OModalsContainer /> // [!code highlight]
  </div>
</template>

<script setup lang="ts">
import { OModalsContainer } from '@outloud/vue-modals' // [!code highlight]
import { useModals } from '@outloud/vue-modals'

const modals = useModals()
const $content = ref<HTMLElement>()

modals.content = $content
</script>
```
:::
