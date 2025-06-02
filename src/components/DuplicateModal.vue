<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  show: boolean,
  defaultName: string,
  existingNames: string[]
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'confirm', newName: string): void
}>()

const newName = ref(props.defaultName)
const errorMsg = ref('')

watch(() => props.defaultName, (val) => {
  newName.value = val
  errorMsg.value = ''
})

// Validación al confirmar
const validateAndConfirm = () => {
  if (!newName.value.trim()) {
    errorMsg.value = 'El nombre no puede estar vacío.'
    return
  }

  const normalized = newName.value.trim().toLowerCase()
  const conflict = props.existingNames.some(n => n.trim().toLowerCase() === normalized)

  if (conflict) {
    errorMsg.value = 'Ese nombre ya existe. Elige otro.'
    return
  }

  emit('confirm', newName.value.trim())
}

// Cerrar con Esc
const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-6 relative">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-semibold mb-4 text-gray-800">
          {{ $t('duplicate') }}
        </h2>

        <label class="block mb-2 text-sm text-gray-600">
          {{ $t('template_name') }}
        </label>
        <input
          v-model="newName"
          type="text"
          class="w-full px-4 py-2 border rounded-lg mb-1 focus:outline-none focus:ring-2"
        />
        <p v-if="errorMsg" class="text-red-500 text-sm mt-1 mb-2">{{ errorMsg }}</p>

        <div class="flex justify-end gap-3 mt-4">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            {{ $t('cancel') }}
          </button>
          <button
            @click="validateAndConfirm"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {{ $t('duplicate') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
