<template>
  <div class="flex gap-2">
    <input
      type="number"
      v-model.number="min"
      @input="emitFilter"
      class="w-full p-2 border rounded shadow-sm"
      :placeholder="$t('min')"
    />
    <input
      type="number"
      v-model.number="max"
      @input="emitFilter"
      class="w-full p-2 border rounded shadow-sm"
      :placeholder="$t('max')"
    />
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
