# Extending modals

The API can be easily extended to add utility methods like `confirm`.

## Add utility method

### Vue

When creating modals plugin extend the API.

```ts [app.ts]
const modals = createModals()
modals.extend('warning', (props) => modals.open(import('~/modals/Warning'), { props }))
```

### Nuxt

Best place to set utility method is via a Nuxt plugin.

```ts [plugins/modals.ts]
const { $modals } = useNuxtApp()
$modals.extend('warning', (props) => modals.open(import('~/modals/Warning'), { props }))
```

## Add types

If you need to pass different options to confirm modal component, you can do it by extending the type in your `types.d.ts` file.

```ts
declare module '@outloud/vue-modals' {
  type WarningProps = {
    text: string
  }

  interface Modals {
    warning: (props: WarningProps) => Promise<any>
  }
}
```
