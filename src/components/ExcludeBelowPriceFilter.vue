<template>
  <div class="space-y-1">
    <label class="text-sm font-medium text-gray-700">Ocultar si precio menor a</label>
    <input
      type="number"
      v-model.number="minPrice"
      @input="emitFilter"
      class="w-full p-2 border rounded shadow-sm"
      placeholder="Ej: 3.50"
    />
    <p class="text-xs text-gray-400">Solo se mostrarán productos con precio igual o superior.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])

const minPrice = ref<number | null>(null)

const emitFilter = () => {
  emit('filter-change', {
    type: 'exclude_price_below',
    fieldName: props.fieldName,
    min: minPrice.value
  })
}

watch(minPrice, emitFilter)
</script>
