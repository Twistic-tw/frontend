<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps<{
  show: boolean
  defaultName: string
  existingNames: string[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', newName: string): void
}>()

const newName = ref(props.defaultName)
const errorMsg = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// Sincronizar cuando cambie el nombre por defecto
watch(() => props.defaultName, async (val) => {
  newName.value = val
  errorMsg.value = ''
  await nextTick()
  inputRef.value?.focus()
})

// Validación al confirmar
const validateAndConfirm = () => {
  const trimmed = newName.value.trim()
  if (!trimmed) {
    errorMsg.value = 'El nombre no puede estar vacío.'
    return
  }

  const conflict = props.existingNames.some(n => n.trim().toLowerCase() === trimmed.toLowerCase())
  if (conflict) {
    errorMsg.value = 'Ese nombre ya existe. Elige otro.'
    return
  }

  emit('confirm', trimmed)
}

// Cerrar con tecla Escape
const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
</script>

<template>
  <transition name="fade-scale">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-6 relative dark:bg-neutral-900 dark:text-white">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
        >
          &times;
        </button>

        <h2 class="text-xl font-semibold mb-4">
          {{ $t('duplicate') }}
        </h2>

        <label class="block mb-2 text-sm">
          {{ $t('template_name') }}
        </label>
        <input
          ref="inputRef"
          v-model="newName"
          type="text"
          class="w-full px-4 py-2 border rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-gray-700"
        />
        <p v-if="errorMsg" class="text-red-500 text-sm mt-1 mb-2">{{ errorMsg }}</p>

        <div class="flex justify-end gap-3 mt-4">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition dark:bg-gray-700 dark:hover:bg-gray-600"
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
