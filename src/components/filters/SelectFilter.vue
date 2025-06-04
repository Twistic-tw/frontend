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

    <div v-if="selectedCondition === 'in'">
      <label class="block mt-2 text-sm font-medium text-gray-700">
        {{ $t('select_multiple_values') }}
      </label>
      <select v-model="multiValues" multiple class="w-full p-2 border rounded h-32">
        <option v-for="option in fieldOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div v-else>
      <label class="block mt-2 text-sm font-medium text-gray-700">
        {{ $t('select_value') }}
      </label>
      <select v-model="singleValue" class="w-full p-2 border rounded">
        <option disabled value="">{{ $t('select_value') }}</option>
        <option v-for="option in fieldOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
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
import { ref, onMounted, watch } from 'vue'
import { getFilterOptionsFromFieldName } from '../../composable/getFilterOptions'
import type { FilterConditionOption } from '../../types/FilterConditionOption'

const props = defineProps<{
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

const emit = defineEmits<{
  (e: 'filter-change', payload: { condition: string; value: string | string[] }): void
}>()

const selectedCondition = ref('')
const singleValue = ref('')
const multiValues = ref<string[]>([])
const filterOptions = ref<FilterConditionOption[]>([])
const fieldOptions = ref<string[]>([])

onMounted(() => {
  filterOptions.value = getFilterOptionsFromFieldName(props.fieldName)
  fieldOptions.value = props.values
})

watch(
  () => props.fieldName,
  () => {
    selectedCondition.value = ''
    singleValue.value = ''
    multiValues.value = []
    filterOptions.value = getFilterOptionsFromFieldName(props.fieldName)
    fieldOptions.value = props.values
  },
)

const applyFilter = () => {
  if (!selectedCondition.value) return

  if (selectedCondition.value === 'in') {
    if (!multiValues.value.length) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: multiValues.value,
    })
  } else {
    if (!singleValue.value) return
    emit('filter-change', {
      condition: selectedCondition.value,
      value: singleValue.value,
    })
  }
}
</script>
