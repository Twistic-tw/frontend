<template>
  <transition name="fade-scale">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-[95%] max-w-2xl rounded-xl shadow-xl p-6 overflow-auto relative">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-4">Editar textos del catálogo</h2>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción corta</label>
          <input
            type="text"
            v-model="model.short"
            class="w-full border rounded px-3 py-2 shadow-sm"
            placeholder="Ej: Catálogo de temporada"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción larga</label>
          <textarea
            v-model="model.long"
            rows="4"
            class="w-full border rounded px-3 py-2 shadow-sm"
            placeholder="Descripción detallada..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Texto de pie de página</label>
          <input
            type="text"
            v-model="model.footer"
            class="w-full border rounded px-3 py-2 shadow-sm"
            placeholder="Ej: Información sujeta a cambios"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const model = defineModel<{
  short: string
  long: string
  footer: string
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['close'])
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
