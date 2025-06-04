<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>
    <select v-model="selectedCondition" class="w-full p-2 border rounded">
      <option disabled value="">{{ $t('select_condition') }}</option>
      <option
        v-for="condition in filterOptions"
        :key="condition.value"
        :value="condition.value"
      >
        {{ $t(condition.label) }}
      </option>
    </select>

    <input
      v-if="selectedCondition !== 'between'"
      v-model="singleDate"
      type="date"
      class="w-full p-2 border rounded"
    />

    <div v-else class="flex gap-2">
      <input v-model="rangeStart" type="date" class="w-full p-2 border rounded" />
      <input v-model="rangeEnd" type="date" class="w-full p-2 border rounded" />
    </div>

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
import { getFieldFilterOptions } from '../../composable/getFilterOptions'
import type { FilterConditionOption } from '../../types/FilterConditionOption'

const props = defineProps<{ fieldName: string }>()

const emit = defineEmits<{
  (e: 'filter-change', payload: { condition: string; value: string | { start: string; end: string } }): void
}>()

const selectedCondition = ref('')
const singleDate = ref('')
const rangeStart = ref('')
const rangeEnd = ref('')
const filterOptions: Ref<FilterConditionOption[]> = ref([])

onMounted(() => {
  filterOptions.value = getFieldFilterOptions(props.fieldName)
})

watch(() => props.fieldName, () => {
  selectedCondition.value = ''
  singleDate.value = ''
  rangeStart.value = ''
  rangeEnd.value = ''
  filterOptions.value = getFieldFilterOptions(props.fieldName)
})

const applyFilter = () => {
  if (!selectedCondition.value) return
  if (selectedCondition.value === 'between') {
    if (!rangeStart.value || !rangeEnd.value) return
    emit('filter-change', {
      condition: 'between',
      value: {
        start: rangeStart.value,
        end: rangeEnd.value,
      },
    })
  } else {
    if (!singleDate.value) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: singleDate.value,
    })
  }
}
</script>
