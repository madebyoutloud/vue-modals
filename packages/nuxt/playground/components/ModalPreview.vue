<script setup lang="ts">
const modals = useModals()

const openModal = () => {
  modals.open(import('./Modal.vue'), {
    props: {
      title: 'Hello World',
    },
  })
}
</script>

<template>
  <button @click="openModal">
    Open Modal
  </button>
</template>
