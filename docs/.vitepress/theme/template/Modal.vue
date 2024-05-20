<template>
  <div class="modal">
    <header class="modal-content">
      <h1 v-if="title">
        {{ title }}
      </h1>
      <p v-if="text">
        {{ text }}
      </p>
      <slot></slot>
    </header>

    <div v-if="closable || slots.actions" class="modal-actions">
      <slot name="actions">
        <button @click="close">
          Close
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@outloud/vue-modals'

const props = defineProps<{
  title?: string
  text?: string
  closable?: boolean
}>()

const slots = defineSlots<{
  default?(_): any
  actions?(_): any
}>()

const { close } = useModal()
</script>
