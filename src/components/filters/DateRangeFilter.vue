<template>
  <div class="space-y-4">
    <!-- Título -->
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>

    <div v-for="condition in filters" :key="condition.value" class="space-y-2">
      <label class="text-sm text-gray-600 font-semibold">
        {{ $t(condition.label) }}
      </label>

      <template v-if="condition.value === 'between'">
        <div class="flex gap-2">
          <input
            type="date"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="inputs.betweenStart"
            @change="applyFilter('between')"
          />
          <input
            type="date"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="inputs.betweenEnd"
            @change="applyFilter('between')"
          />
        </div>
      </template>

      <template v-else>
        <input
          type="date"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="inputs[condition.value]"
          @change="applyFilter(condition.value)"
        />
      </template>
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

const props = defineProps<{
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

const emit = defineEmits<{
  (e: 'filter-change', payload:
    | { type: 'date'; condition: 'between'; start: string; end: string }
    | { type: 'date'; condition: string; value: string }
  ): void
}>()

const inputs = ref<Record<string, string>>({})

watch(() => props.fieldName, () => {
  inputs.value = {}
})

function applyFilter(condition: string) {
  if (condition === 'between') {
    const start = inputs.value['betweenStart']
    const end = inputs.value['betweenEnd']
    if (start && end) {
      emit('filter-change', { type: 'date', condition, start, end })
    }
  } else {
    const value = inputs.value[condition]
    if (value?.trim()) {
      emit('filter-change', { type: 'date', condition, value })
    }
  }
}

function clearAll() {
  inputs.value = {}
}
</script>
