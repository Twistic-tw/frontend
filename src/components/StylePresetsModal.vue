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

        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ $t('style_presets_title') }}</h2>

        <!-- Aquí iría el contenido del modal, como la lista de estilos -->
        <div v-if="presets.length === 0" class="text-gray-500">{{ $t('no_presets_found') }}</div>
        <ul class="mt-4 space-y-2">
          <li
            v-for="preset in presets"
            :key="preset.id"
            class="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
          >
            <span>{{ preset.name }}</span>
            <div class="flex gap-2">
              <button class="text-sm text-blue-600 hover:underline" @click="$emit('apply', preset.id)">{{ $t('apply') }}</button>
              <button class="text-sm text-red-600 hover:underline" @click="$emit('delete', preset.id)">{{ $t('delete') }}</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean,
  presets: { id: number; name: string }[]
}>()

defineEmits(['close', 'apply', 'delete'])
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
