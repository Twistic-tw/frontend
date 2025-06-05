<template>
  <div class="space-y-4">
    <!-- Título -->
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>

    <!-- Mostrar todas las condiciones directamente -->
    <div v-for="condition in filters" :key="condition.value" class="space-y-2">
      <label class="text-sm text-gray-600 font-semibold">
        {{ $t(condition.label) }}
      </label>
      <input
        type="number"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        :placeholder="$t('enter_value')"
        v-model="inputs[condition.value]"
        @keyup.enter="applyFilter(condition.value)"
      />
    </div>

    <!-- Botón para limpiar todos los campos -->
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

const inputs = ref<Record<string, string>>({})

// Reset inputs al cambiar campo
watch(() => props.fieldName, () => {
  inputs.value = {}
})

// Aplicar filtro manual (enter)
function applyFilter(condition: string) {
  const raw = inputs.value[condition]
  const value = parseFloat(raw)
  if (!isNaN(value)) {
    emit('filter-change', { type: 'number', condition, value })
  }
}

// Limpiar todos los inputs y emitir filtros vacíos
function clearAll() {
  inputs.value = {}

  props.filters.forEach(condition => {
    emit('filter-change', {
      type: 'number',
      condition: condition.value,
      value: NaN
    })
  })
}
</script>
