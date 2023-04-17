<script lang="ts" setup>
import { provide, toRef, useSlots } from 'vue'
import type Modal from '../Modal'
import { modalSymbol } from '../symbols'

const props = defineProps<{
  modal: Modal
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'close', resolveValue?: unknown): void
}>()

const slots = useSlots()

const modalRef = toRef(props, 'modal')

provide(modalSymbol, modalRef)

const onClickOutside = () => {
  if (props.modal.options.clickToClose) {
    emit('close')
  }
}
</script>

<template>
  <div class="o-modal-wrapper" :class="{ 'is--active': active }" @click.self="onClickOutside">
    <transition name="o-modal" mode="out-in">
      <component
        :is="modal.component"
        v-if="modal.isReady.value"
        v-bind="modal.props"
        :class="{ 'is--active': active }"
        v-on="modal.listeners"
      />
      <div v-else-if="slots.loading" key="loading" class="o-modal-loader">
        <slot name="loading" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.o-modal-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 20;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.o-modal-enter-active,
.o-modal-leave-active {
  transition: opacity var(--o-transition-duration);
}

.o-modal-enter-from,
.o-modal-leave-to {
  opacity: 0;
}
</style>
