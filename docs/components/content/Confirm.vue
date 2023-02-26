<script lang="ts" setup>
import { useModal } from '@outloud/vue-modals'
import Modal from './Modal.vue'

defineProps<{
  text: string
}>()

const { close } = useModal()
</script>

<template>
  <Modal title="Confirm">
    <p>{{ text }}</p>

    <button-link @click="close(true)">
      Confirm
    </button-link>
  </Modal>
</template>
