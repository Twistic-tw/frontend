<template>
  <div class="space-y-1">
    <label class="text-sm font-medium text-gray-700">Ocultar si stock menor a</label>
    <input
      type="number"
      v-model.number="threshold"
      @input="emitFilter"
      class="w-full p-2 border rounded shadow-sm"
      placeholder="Ej: 5"
    />
    <p class="text-xs text-gray-400">Solo se mostrarán productos con stock igual o superior.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])

const threshold = ref<number | null>(null)

const emitFilter = () => {
  emit('filter-change', {
    type: 'stock_min',
    threshold: threshold.value
  })
}
</script>
