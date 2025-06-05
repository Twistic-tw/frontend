<template>
  <transition name="fade-scale" appear>
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @keydown.esc="onEscape"
      tabindex="0"
      ref="modalRef"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-xl text-center max-w-md w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogTitle"
      >
        <p id="dialogTitle" class="mb-4 text-lg font-medium text-gray-800">{{ message }}</p>
        <div class="flex justify-center gap-4">
          <button
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            @click="$emit('confirm')"
          >
            {{ $t('confirm_dialog.delete') }}
          </button>
          <button
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            @click="$emit('cancel')"
          >
            {{ $t('confirm_dialog.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  visible: boolean
  message: string
}>()

const emit = defineEmits(['confirm', 'cancel'])

const modalRef = ref<HTMLElement | null>(null)

// Enfocar el modal cuando se abre
watch(() => props.visible, async (val) => {
  if (val) {
    await nextTick()
    modalRef.value?.focus()
  }
})

function onEscape() {
  emit('cancel')
}
</script>

<style scoped>
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 250ms ease;
}
</style>
