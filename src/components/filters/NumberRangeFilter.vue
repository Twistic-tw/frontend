<template>
  <div class="space-y-4">
    <!-- Título -->
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>

    <!-- Condiciones de filtro -->
    <div v-for="condition in filters" :key="condition.value" class="space-y-2">
      <label class="text-sm text-gray-600 font-semibold">
        {{ $t(condition.label) }}
      </label>

      <!-- Filtro entre (min y max) -->
      <template v-if="condition.value === 'between'">
        <div class="flex gap-2">
          <input
            type="number"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('enter_min_value')"
            v-model="inputs.betweenMin"
            @input="applyFilter('between')"
          />
          <input
            type="number"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('enter_max_value')"
            v-model="inputs.betweenMax"
            @input="applyFilter('between')"
            @keyup.enter="applyFilter('between')"
          />
        </div>
      </template>

      <!-- Filtros simples -->
      <template v-else>
        <input
          type="number"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('enter_value')"
          v-model="inputs[condition.value]"
          @input="applyFilter(condition.value)"
          @keyup.enter="applyFilter(condition.value)"
        />
      </template>
    </div>

    <!-- Botón limpiar -->
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

// Evento para enviar cambios de filtro
const emit = defineEmits<{
  (e: 'filter-change', payload:
    | { type: 'number'; condition: 'between'; min: number; max: number }
    | { type: 'number'; condition: string; value: number }
  ): void
}>()

// Valores de inputs por condición
const inputs = ref<Record<string, string>>({})

// Reset al cambiar de campo
watch(() => props.fieldName, () => {
  inputs.value = {}
})

// Aplicar filtro dinámicamente
function applyFilter(condition: string) {
  if (condition === 'between') {
    const min = parseFloat(inputs.value['betweenMin'])
    const max = parseFloat(inputs.value['betweenMax'])

    if (!isNaN(min) && !isNaN(max)) {
      emit('filter-change', { type: 'number', condition, min, max })
    }
  } else {
    const raw = inputs.value[condition]
    if (!raw?.trim()) {
      emit('filter-change', { type: 'number', condition, value: NaN })
      return
    }
    const value = parseFloat(raw)
    if (!isNaN(value)) {
      emit('filter-change', { type: 'number', condition, value })
    }
  }
}

// Limpiar y emitir cambios vacíos para todos los filtros
function clearAll() {
  inputs.value = {}

  props.filters.forEach((condition) => {
    if (condition.value === 'between') {
      emit('filter-change', {
        type: 'number',
        condition: 'between',
        min: NaN,
        max: NaN
      })
    } else {
      emit('filter-change', {
        type: 'number',
        condition: condition.value,
        value: NaN
      })
    }
  })
}
</script>
