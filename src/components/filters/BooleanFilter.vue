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
  (e: 'filter-change', payload: { condition: string }): void
}>()

const selectedCondition = ref('')
const filterOptions = ref<FilterConditionOption[]>([])

onMounted(() => {
  filterOptions.value = getFilterOptionsFromFieldName(props.fieldName)
})

watch(
  () => props.fieldName,
  () => {
    selectedCondition.value = ''
    filterOptions.value = getFilterOptionsFromFieldName(props.fieldName)
  },
)

const applyFilter = () => {
  if (!selectedCondition.value) return
  emit('filter-change', {
    condition: selectedCondition.value,
  })
}
</script>
