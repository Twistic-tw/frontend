<template>
  <div class="space-y-2">
    <p class="text-xs text-gray-500">{{ $t('filter_by_date_range') }}</p>
    <div>
      <label class="block text-sm font-medium text-gray-700">{{ $t('start_date') }}</label>
      <input
        type="date"
        v-model="start"
        @input="emitFilter"
        class="w-full p-2 border rounded shadow-sm"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">{{ $t('end_date') }}</label>
      <input
        type="date"
        v-model="end"
        @input="emitFilter"
        class="w-full p-2 border rounded shadow-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])

const start = ref('')
const end = ref('')

const emitFilter = () => {
  emit('filter-change', { type: 'date', start: start.value, end: end.value })
}
</script>
