<template>
  <div class="modal">
    <h1>{{ title }}</h1>

    <input type="text" placeholder="text">
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>
.modal {
  margin: auto;
  max-width: 600px;
  width: 100%;
  background-color: #ffff;
  padding: 20px;
}
</style>
