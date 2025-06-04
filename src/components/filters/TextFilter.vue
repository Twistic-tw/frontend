<template>
  <div class="space-y-4">
    <!-- Etiqueta del selector de condición -->
    <label for="condition" class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>
    <select
      id="condition"
      v-model="selectedCondition"
      class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Filter condition"
    >
      <option disabled value="">{{ $t('select_condition') || 'Select condition' }}</option>
      <option
        v-for="condition in filterOptions"
        :key="condition.value"
        :value="condition.value"
      >
        {{ $t(condition.label) }}
      </option>
    </select>

    <!-- Input de valor -->
    <input
      v-model="filterValue"
      type="text"
      class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      :placeholder="$t('enter_value')"
      aria-label="Filter value"
    />

    <!-- Botón aplicar -->
    <button
      @click="applyFilter"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >
      {{ $t('apply_filter') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue'
import type { FilterConditionOption } from '../../types/FilterConditionOption'
import { getFieldFilterOptions } from '../../composable/getFilterOptions'

// Props y eventos
const props = defineProps<{
  fieldName: string
}>()

const emit = defineEmits<{
  (e: 'filter-change', payload: { condition: string; value: string }): void
}>()

// Estados reactivos
const selectedCondition = ref('')
const filterValue = ref('')
const filterOptions: Ref<FilterConditionOption[]> = ref([])

// Inicializar opciones al montar
onMounted(() => {
  filterOptions.value = getFieldFilterOptions(props.fieldName)
})

// Reset y actualización si cambia el campo
watch(() => props.fieldName, () => {
  selectedCondition.value = ''
  filterValue.value = ''
  filterOptions.value = getFieldFilterOptions(props.fieldName)
})

// Emitir si ambos valores están definidos
const applyFilter = () => {
  if (selectedCondition.value && filterValue.value.trim() !== '') {
    emit('filter-change', {
      condition: selectedCondition.value,
      value: filterValue.value,
    })
  }
}
</script>
