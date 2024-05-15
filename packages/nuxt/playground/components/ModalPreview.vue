<template>
  <button type="button" @click="openModal">
    Open Modal
  </button>
</template>

<script setup lang="ts">
const modals = useModals()

async function openModal() {
  modals.open(import('./Modal.vue'), {
    props: {
      blah: true,
    },
  })
}
</script>
