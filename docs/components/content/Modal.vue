<script lang="ts" setup>
import { useModal } from '@outloud/vue-modals'

defineProps<{
  title: string
}>()

const { close } = useModal()
</script>

<template>
  <div class="modal">
    <header class="header">
      <div class="title">
        {{ title }}
      </div>

      <button @click="close()">
        Close
      </button>
    </header>

    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  margin: auto;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 20px;
  color: #000;
  transition: opacity var(--o-transition-duration), transform var(--o-transition-duration), filter var(--o-transition-duration);

  &:not(.is--active) {
    filter: blur(8px);
    transform: translate3d(0, -10%, 0) scale(0.9);
  }

  .header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }

  .inner {
    padding: 0 20px 20px 20px;
  }
}
</style>
