<template>
  <transition>
    <div v-if="isVisible" class="o-modals">
      <transition-group appear>
        <ModalWrapper
          v-for="modal in list"
          :key="modal.id"
          :modal="modal"
          :active="modal === activeModal"
          @close="close"
        />
      </transition-group>

      <div key="bg" class="o-modals-bg">
        <slot name="loader" :loading="isLoading"></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useModals } from '../composables/modals'
import type { Modal } from '../Modal'
import ModalWrapper from './Modal.vue'

defineSlots<{
  loader?(_: ({ loading: boolean })): any
}>()

const modals = useModals()
const isVisible = ref(false)
const list = computed(() => modals.list.filter((modal) => modal.isReady.value))
const activeModal = computed(() => modals.list.at(-1))
const isLoading = computed(() => activeModal.value?.isReady.value === false)

const hasModals = computed(() => modals.list.length > 0)
// const

onKeyStroke('Escape', onEscape)

watch(hasModals, updateVisibility)

function updateVisibility(value: boolean) {
  const content = modals.content?.value

  if (content) {
    content.inert = value
  }

  nextTick(() => (isVisible.value = value))
}

function close(modal: Modal, resolveValue?: any) {
  modals.close(modal, resolveValue)
}

function onEscape(e: KeyboardEvent) {
  const el = e.target as HTMLElement
  const isInput = ['INPUT', 'TEXTAREA'].includes(el.tagName) || el.isContentEditable

  if (isInput) {
    return
  }

  const current = modals.list[modals.list.length - 1]
  if (current && current.options.escToClose) {
    modals.close(current)
  }
}
</script>

<style lang="scss">
.o-modals {
  --o-transition-duration: .4s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: z-index var(--o-transition-duration);

  .o-modals-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
    transition: opacity var(--o-transition-duration);
  }

  &.v-enter-from,
  &.v-leave-to {
    z-index: 999;

    .o-modals-bg {
      opacity: 0;
    }
  }
}
</style>
