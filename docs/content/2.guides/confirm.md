# Confirm

The library provides one utility method called `confirm` which can be used for confirming actions in the UI.

## Setup confirm component

The utility components must be set using `() => import('path/to/component')` syntax.

### Vue

When creating modals plugin set confirm component using:

```ts [app.ts]
const modals = createModals()
modals.setComponent('confirm', () => import('~/modals/Confirm.vue'))
```

### Nuxt

Best place to set utility component is via a Nuxt plugin.

```ts [plugins/modals.ts]
const { $modals } = useNuxtApp()
$modals.setComponent('confirm', () => import('~/modals/Confirm.vue'))
```

## Use confirm

```ts
import { useModals } from '@outloud/vue-modals'

const modals = useModals()

const remove = async () => {
  const confirmed = await modals.confirm({
    text: 'Are you sure to delete this item?'
  })

  if (!confirmed) {
    return
  }

  await fetch('remove')
}
```

## Extending options

If you need to pass different options to confirm modal component, you can do it by extending the type in your `types.d.ts` file.

```ts
declare module '@outloud/vue-modals' {
  interface ModalsConfirmProps {
    title: string
    text: string
    handler: () => Promise<void>
  }
}
```
