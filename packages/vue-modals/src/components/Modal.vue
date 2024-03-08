<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref, toRef } from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import type { Modal } from '../Modal'
import { modalSymbol } from '../symbols'

const props = defineProps<{
  modal: Modal
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'close', modal: Modal, resolveValue?: unknown): void
}>()

const $el = ref<HTMLElement>()

provide(modalSymbol, toRef(() => props.modal))

onMounted(() => {
  disableBodyScroll($el.value!, {
    reserveScrollBarGap: true,
    allowTouchMove: (el) => $el.value?.contains(el) ?? false,
  })
})

onBeforeUnmount(() => {
  enableBodyScroll($el.value!)
})

function onClickOutside() {
  if (props.modal.options.clickToClose) {
    emit('close', props.modal)
  }
}
</script>

<template>
  <div ref="$el" class="o-modal" role="dialog" aria-modal="true" :class="{ 'is--active': active }" @click.self="onClickOutside">
    <component
      :is="modal.component"
      :active="active"
      v-bind="modal.props"
      v-on="modal.listeners"
    />
  </div>
</template>

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
