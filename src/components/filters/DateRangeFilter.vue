<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('select_date_range') }}
    </label>

    <div class="space-y-2">
      <label class="text-xs text-gray-600 font-semibold">
        {{ $t('filter_before') }}
      </label>
      <input
        type="date"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="inputs.before"
        @change="applyFilter('before')"
      />

      <label class="text-xs text-gray-600 font-semibold">
        {{ $t('filter_after') }}
      </label>
      <input
        type="date"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="inputs.after"
        @change="applyFilter('after')"
      />

      <label class="text-xs text-gray-600 font-semibold">
        {{ $t('filter_between') }}
      </label>
      <div class="flex gap-2">
        <input
          type="date"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="inputs.betweenStart"
        />
        <input
          type="date"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="inputs.betweenEnd"
          @change="applyFilter('between')"
        />
      </div>
    </div>

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

const props = defineProps<{
  fieldName: string
}>()

const emit = defineEmits<{
  (e: 'filter-change', payload: { condition: string; value: string | [string, string] }): void
}>()

const inputs = ref({
  before: '',
  after: '',
  betweenStart: '',
  betweenEnd: ''
})

watch(() => props.fieldName, () => {
  inputs.value = {
    before: '',
    after: '',
    betweenStart: '',
    betweenEnd: ''
  }
})

function applyFilter(condition: string) {
  if (condition === 'between') {
    const start = inputs.value.betweenStart
    const end = inputs.value.betweenEnd
    if (start && end) {
      emit('filter-change', { condition, value: [start, end] })
    }
  } else {
    const value = inputs.value[condition as 'before' | 'after']
    if (value) {
      emit('filter-change', { condition, value })
    }
  }
}

function clearAll() {
  inputs.value = {
    before: '',
    after: '',
    betweenStart: '',
    betweenEnd: ''
  }
}
</script>
