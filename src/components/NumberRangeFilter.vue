<template>
  <div class="space-y-2">
    <p class="text-xs text-gray-400">{{ $t('range_filter_description') }}</p>
    <div>
      <label class="block text-sm font-medium text-gray-700">{{ $t('minimum_value') }}</label>
      <input
        type="number"
        v-model.number="min"
        @input="emitFilter"
        class="w-full p-2 border rounded shadow-sm"
        :placeholder="$t('min')"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">{{ $t('maximum_value') }}</label>
      <input
        type="number"
        v-model.number="max"
        @input="emitFilter"
        class="w-full p-2 border rounded shadow-sm"
        :placeholder="$t('max')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])

const min = ref<number | null>(null)
const max = ref<number | null>(null)

const emitFilter = () => {
  emit('filter-change', {
    type: 'number',
    min: min.value ?? -Infinity,
    max: max.value ?? Infinity
  })
}
</script>
