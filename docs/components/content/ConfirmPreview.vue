<script lang="ts" setup>
import { OModalsContainer, useModals } from '@outloud/vue-modals'

const modals = useModals()
modals.setComponent('confirm', () => import('./Confirm.vue'))
const confirmed = ref<boolean | undefined>(undefined)

const confirm = async () => {
  const result = await modals.confirm({
    text: 'Are sure to delete this item?',
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
