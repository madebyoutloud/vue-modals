# Configuration

The global configuration allows you to set default values for all available props so you don't have to specify every one of them when using the options when opening a modal.
You can change the configuration options during installation with the arguments:

```ts
import { createModals } from '@outloud/vue-modals'

const modals = createModals({
  // ModalsConfig
})

export interface ModalsConfig {
  /**
   * Close modal when user clicks on background
   * @default true
   */
  clickToClose: boolean
  /**
   * Close modal when Esc key is pressed
   * @default true
   */
  escToClose: boolean
}
```


