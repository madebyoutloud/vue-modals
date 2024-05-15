# Getting Started
Get started with Vue Modals quickly by following steps below.

If you are using Nuxt, you can skip this page and go to [Nuxt](/docs/nuxt) tutorial.


## Installation

::: code-group
```sh-vue [npm]
npm add {{$packageJson.name}}
```
```sh-vue [pnpm]
pnpm add {{$packageJson.name}}
```
```sh-vue [yarn]
yarn add {{$packageJson.name}}
```
```sh-vue [bun]
bun add {{$packageJson.name}}
```
:::

## Setup

### 1. Register the plugin to your app in your entry file.

See [Configuration](/docs/configuration) for options.

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import { createModals } from '@outloud/vue-modals' // [!code highlight]
import App from './App.vue'

const app = createApp(App)
const modals = createModals({/* options */}) // [!code highlight]

app.use(modals) // [!code highlight]
app.mount('#app')
```
:::

### 2. Import required CSS

::: code-group
```ts [main.ts]
import '@outloud/vue-modals/style.css' // [!code highlight]
```
:::

### 3. Add modals container component

The best place is to add it to your main `App.vue` file.

::: tip
It is also strongly recommended to set `content` element, which will become disabled when modal is displayed, see [Modals Container](/docs/components/modals-container) for more information.
:::

::: code-group
```vue [App.vue]
<template>
  <div>
    ...

    <main ref="$content">
      <RouterView>
    </main>

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
