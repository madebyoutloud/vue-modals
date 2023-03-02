<script setup lang="ts">
const modals = useModals()

const openModal = () => {
  modals.open()
}
</script>

<template>
  <button @click="openModal">
    Open Modal
  </button>
</template>
