<template>
  <div class="space-y-4">
    <!-- Mostrar cada condición como checkbox -->
    <div
      v-for="condition in filters"
      :key="condition.value"
      class="flex items-center space-x-2"
    >
      <input
        type="checkbox"
        :id="condition.value"
        :checked="selectedConditions.includes(condition.value)"
        @change="() => toggleCondition(condition)"
        class="form-checkbox h-5 w-5 text-blue-600"
      />
      <label :for="condition.value" class="text-sm text-gray-700">
        {{ $t(condition.label) }}
      </label>
    </div>

    <!-- Botón para limpiar filtros -->
    <button
      @click="clearFilters"
      class="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
    >
      {{ $t('clear_filters') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FilterConditionOption } from '../../types/FilterConditionOption'

const props = defineProps<{
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

const emit = defineEmits<{
  (e: 'filter-change', payload: { type: 'boolean'; condition: string; value: boolean }): void
}>()

const selectedConditions = ref<string[]>([])

watch(() => props.fieldName, () => {
  selectedConditions.value = []
})

// Toggle dinámico al marcar/desmarcar
function toggleCondition(condition: FilterConditionOption) {
  const index = selectedConditions.value.indexOf(condition.value)
  const isSelected = index !== -1

  if (isSelected) {
    selectedConditions.value.splice(index, 1)
  } else {
    selectedConditions.value.push(condition.value)
  }

  emit('filter-change', {
    type: 'boolean',
    condition: condition.value,
    value: !isSelected && condition.value === 'is_true'
  })
}

// Limpiar filtros booleanos
function clearFilters() {
  for (const condition of props.filters) {
    emit('filter-change', {
      type: 'boolean',
      condition: condition.value,
      value: false
    })
  }
  selectedConditions.value = []
}
</script>
