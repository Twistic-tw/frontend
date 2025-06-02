<template>
  <transition name="fade-scale">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-[95%] max-w-md rounded-xl shadow-xl p-6 relative">
        <!-- Botón cerrar moderno -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-4">
          {{ $t('name_your_style') }}
        </h2>

        <input
          v-model="localName"
          type="text"
          class="w-full border rounded px-3 py-2 shadow-sm"
          :placeholder="$t('style_name_placeholder')"
        />

        <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>

        <div class="mt-4 flex justify-end">
          <button
            @click="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold transition"
          >
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  modelValue: string
  existingNames?: string[]
}>()

const emit = defineEmits(['update:modelValue', 'close', 'save'])

const localName = ref(props.modelValue || '')
const error = ref('')

watch(() => props.modelValue, (val) => {
  localName.value = val
})

const submit = () => {
  error.value = ''

  if (!localName.value.trim()) {
    error.value = 'El nombre no puede estar vacío.'
    return
  }

  if (props.existingNames?.includes(localName.value.trim())) {
    error.value = 'Ya existe un estilo con ese nombre.'
    return
  }

  emit('save', localName.value.trim())
}
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
