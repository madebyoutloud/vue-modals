<script lang="ts" setup>
import type { ConfirmProps } from '@outloud/vue-modals'
import { OModalsContainer, useModals } from '@outloud/vue-modals'

const modals = useModals()
const confirmed = ref<boolean | undefined>(undefined)

modals.extend('confirm', (props: ConfirmProps) => {
  return modals.open(import('./Confirm.vue'), {
    props,
  })
})

const confirm = async () => {
  const result = await modals.confirm({
    text: 'Hello World!',
  })

  confirmed.value = result
}
</script>

<template>
  <div>
    Status: {{ JSON.stringify(confirmed) }}
  </div>

  <button-link @click="confirm">
    Confirm
  </button-link>

  <OModalsContainer />
</template>
