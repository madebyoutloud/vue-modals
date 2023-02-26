# Confirm modal

::code-group
  ::code-block{label="Preview" preview}
    ::confirm-preview
  ::
  
  ```vue [Preview.vue]
    <script setup lang="ts">
    import { OModalsContainer, useModal } from '@outloud/vue-modals'
    
    const modals = useModals()

    const confirmed = ref(false)

    const confirm = () => {
      modals.confirm()
    }
    </script>

    <template>
      <Cta @click="confirm">
        Delete
      </Cta>

      <ModalsContainer />
    </template>
  ```
::