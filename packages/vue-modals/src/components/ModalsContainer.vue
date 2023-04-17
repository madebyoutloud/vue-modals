<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core'
import { useModals } from '../composables/useModals'
import ModalWrapper from './ModalWrapper.vue'

const modals = useModals()

const onEsc = (e: KeyboardEvent) => {
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

onKeyStroke('Escape', onEsc)
</script>

<template>
  <transition>
    <transition-group v-if="modals.list.length" tag="div" class="o-modals" appear name="o-modal">
      <template v-for="(modal, i) in modals.list" :key="modal.id">
        <ModalWrapper :modal="modal" :active="i === modals.list.length - 1" @close="modals.close(modal, $event)">
          <template #loading>
            <slot name="loading" />
          </template>
        </ModalWrapper>
      </template>

      <div key="bg" class="o-modals-bg" />
    </transition-group>
  </transition>
</template>

<style lang="scss">
.o-modals {
  --o-transition-duration: .4s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: z-index var(--o-transition-duration), opacity var(--o-transition-duration);

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

  &.v-leave-to {
    opacity: 0;
  }
}
</style>
