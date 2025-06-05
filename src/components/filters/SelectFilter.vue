<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>

    <!-- Mostrar todos los filtros disponibles como selects -->
    <div v-for="condition in filters" :key="condition.value" class="space-y-2">
      <label class="text-sm text-gray-600 font-semibold">
        {{ $t(condition.label) }}
      </label>
      <select
        v-model="selectedValues[condition.value]"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">{{ $t('select_option') }}</option>
        <option v-for="option in values" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <button
      @click="applyAllFilters"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >
      {{ $t('apply_filter') }}
    </button>

    <button
      @click="clearAll"
      class="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
    >
      {{ $t('clear_filters') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FilterConditionOption } from '../../types/FilterConditionOption'

// Props
const props = defineProps<{
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

// Emit
const emit = defineEmits<{
  (e: 'filter-change', payload: { type: 'number'; condition: string; value: number }): void
}>()

// Inputs por condición
const selectedValues = ref<Record<string, string>>({})

// Reset cuando cambia el campo
watch(() => props.fieldName, () => {
  selectedValues.value = {}
})

// Aplicar todos los filtros válidos
function applyAllFilters() {
  for (const condition of props.filters) {
    const input = selectedValues.value[condition.value]
    if (input?.trim() && !isNaN(Number(input))) {
      emit('filter-change', {
        type: 'number',
        condition: condition.value,
        value: parseFloat(input)
      })
    }
  }
}

// Limpiar todos y emitir NaN
function clearAll() {
  selectedValues.value = {}
  props.filters.forEach(condition => {
    emit('filter-change', {
      type: 'number',
      condition: condition.value,
      value: NaN
    })
  })
}
</script>
