<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>
    <select v-model="selectedCondition" class="w-full p-2 border rounded">
      <option disabled value="">{{ $t('select_condition') }}</option>
      <option v-for="condition in filters" :key="condition.value" :value="condition.value">
        {{ $t(condition.label) }}
      </option>
    </select>
    <div v-if="selectedCondition === 'between'" class="space-y-2">
      <input
        type="number"
        v-model.number="minValue"
        class="w-full p-2 border rounded"
        :placeholder="$t('min_value')"
      />
      <input
        type="number"
        v-model.number="maxValue"
        class="w-full p-2 border rounded"
        :placeholder="$t('max_value')"
      />
    </div>

    <div v-else>
      <input
        type="number"
        v-model.number="singleValue"
        class="w-full p-2 border rounded"
        :placeholder="$t('enter_value')"
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
import { ref, watch, onMounted } from 'vue'
import { getFilterOptionsFromFieldName } from '../../composable/getFilterOptions'
import type { FilterConditionOption } from '../../types/FilterConditionOption'

const props = defineProps<{
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

const emit = defineEmits<{
  (
    e: 'filter-change',
    payload: { condition: string; value: number | { min: number; max: number } },
  ): void
}>()

const selectedCondition = ref('')
const singleValue = ref<number | null>(null)
const minValue = ref<number | null>(null)
const maxValue = ref<number | null>(null)
const filterOptions = ref<FilterConditionOption[]>([])

onMounted(() => {
  filterOptions.value = getFilterOptionsFromFieldName(props.fieldName)
})

watch(
  () => props.fieldName,
  () => {
    selectedCondition.value = ''
    singleValue.value = null
    minValue.value = null
    maxValue.value = null
    filterOptions.value = getFilterOptionsFromFieldName(props.fieldName)
  },
)

const applyFilter = () => {
  if (!selectedCondition.value) return

  if (selectedCondition.value === 'between') {
    if (minValue.value === null || maxValue.value === null) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: { min: minValue.value, max: maxValue.value },
    })
  } else {
    if (singleValue.value === null) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: singleValue.value,
    })
  }
}
</script>
