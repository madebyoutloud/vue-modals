# Extending API
The API can be easily extended to add utility methods like confirm.

## Add utility method

### Vue
When creating modals plugin extend the API.

```ts
const modals = createModals()
modals.extend('warning', (props) => modals.open(import('~/modals/Warning'), { props }))
```

### Nuxt
Best place to set utility method is via a Nuxt plugin, for example `plugins/modals.ts`.

```ts
const { $modals } = useNuxtApp()

$modals.extend('warning', (props) => modals.open(import('~/modals/Warning'), { props }))
```

## Extend types
If you need to pass different options to confirm modal component, you can do it by extending the type in your types.d.ts file.

```ts
declare module '@outloud/vue-modals' {
  interface WarningProps {
    text: string
  }

  interface ModalManager {
    warning(props: WarningProps): Promise<any>
  }
}
```
