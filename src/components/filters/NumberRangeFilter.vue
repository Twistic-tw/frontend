<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">{{ $t('filter_condition') }}</label>
      <select v-model="selectedCondition" class="w-full p-2 border rounded">
        <option disabled value="">{{ $t('select_condition') }}</option>
        <option v-for="condition in filters" :key="condition.value" :value="condition.value">
          {{ $t(condition.label) }}
        </option>
      </select>
    </div>

    <div v-if="selectedCondition !== 'between'">
      <input
        v-model.number="filterValue"
        type="number"
        class="w-full p-2 border rounded"
        :placeholder="$t('enter_value')"
      />
    </div>

    <div v-else class="flex gap-2">
      <input
        v-model.number="rangeStart"
        type="number"
        class="w-full p-2 border rounded"
        :placeholder="$t('start_value')"
      />
      <input
        v-model.number="rangeEnd"
        type="number"
        class="w-full p-2 border rounded"
        :placeholder="$t('end_value')"
      />
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

const props = defineProps<{
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

const emit = defineEmits<{
  (e: 'filter-change', payload: { condition: string; value: number | [number, number] }): void
}>()

const selectedCondition = ref('')
const filterValue = ref<number | null>(null)
const rangeStart = ref<number | null>(null)
const rangeEnd = ref<number | null>(null)
const filterOptions: Ref<FilterConditionOption[]> = ref([])

onMounted(() => {
  filterOptions.value = getFieldFilterOptions(props.fieldName)
})

watch(
  () => props.fieldName,
  () => {
    selectedCondition.value = ''
    filterValue.value = null
    rangeStart.value = null
    rangeEnd.value = null
    filterOptions.value = getFieldFilterOptions(props.fieldName)
  },
)

const applyFilter = () => {
  if (!selectedCondition.value) return

  if (selectedCondition.value === 'between') {
    if (rangeStart.value === null || rangeEnd.value === null) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: [rangeStart.value, rangeEnd.value],
    })
  } else {
    if (filterValue.value === null) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: filterValue.value,
    })
  }
}
</script>
