<template>
  <div
    ref="$el"
    class="o-modal"
    role="dialog"
    aria-modal="true"
    :class="{ 'is--active': active }"
    @click.self="onClickOutside"
  >
    <component
      :is="modal.component"
      :active="active"
      v-bind="modal.props"
      v-on="modal.listeners"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref, toRef } from 'vue'
import { lock, unlock } from 'tua-body-scroll-lock'

import type { Modal } from '../Modal'
import { modalSymbol } from '../symbols'

const props = defineProps<{
  modal: Modal
  active?: boolean
}>()

const emit = defineEmits<{
  close: [modal: Modal, resolveValue?: unknown]
}>()

const $el = ref<HTMLElement>()

provide(modalSymbol, toRef(() => props.modal))

onMounted(() => {
  lock($el.value!, {
    useGlobalLockState: true,
  })
})

onBeforeUnmount(() => {
  unlock($el.value!, {
    useGlobalLockState: true,
  })
})

function onClickOutside() {
  if (props.modal.options.clickToClose) {
    emit('close', props.modal)
  }
}
</script>

<style lang="scss">
.o-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 20;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: opacity var(--o-transition-duration);
  opacity: 0;
  pointer-events: none;

  &.is--active {
    opacity: 1;
    pointer-events: auto;
  }

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity var(--o-transition-duration);
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>
