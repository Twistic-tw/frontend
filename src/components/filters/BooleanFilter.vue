<template>
  <div class="space-y-4">
    <!-- Mostrar cada condición de forma directa -->
    <div v-for="condition in filters" :key="condition.value" class="flex items-center space-x-2">
      <input
        type="checkbox"
        :id="condition.value"
        :checked="selectedConditions.includes(condition.value)"
        @change="toggleCondition(condition.value)"
        class="form-checkbox h-5 w-5 text-blue-600"
      />
      <label :for="condition.value" class="text-sm text-gray-700">
        {{ $t(condition.label) }}
      </label>
    </div>

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

function toggleCondition(condition: string) {
  if (selectedConditions.value.includes(condition)) {
    selectedConditions.value = selectedConditions.value.filter(c => c !== condition)
  } else {
    selectedConditions.value.push(condition)
  }

  emit('filter-change', {
    type: 'boolean',
    condition,
    value: condition === 'is_true'
  })
}

function clearFilters() {
  selectedConditions.value = []
}
</script>
