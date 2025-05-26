<template>
  <div>
    <!-- Botón para abrir el modal -->
    <div class="flex justify-end mb-2">
      <button
        @click="showFullscreen = true"
        class="bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        Ampliar vista
      </button>
    </div>

    <!-- Contenido reducido -->
    <div class="relative border rounded-lg overflow-hidden">
      <slot name="preview" />
    </div>

    <!-- Modal fullscreen -->
    <transition name="fade-scale">
      <div
        v-if="showFullscreen"
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      >
        <div class="bg-white w-full h-full p-4 overflow-auto relative">
          <button
            @click="showFullscreen = false"
            class="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-200"
          >
            &times;
          </button>

          <div class="scale-100 origin-top-left">
            <slot name="preview" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showFullscreen = ref(false)
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
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
</style>
