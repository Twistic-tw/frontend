<template>
  <input
    type="text"
    v-model="inputValue"
    @input="emitFilter"
    class="w-full p-2 border rounded shadow-sm"
    :placeholder="$t('type_to_filter')"
  />
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, watch } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])
const inputValue = ref('')

const emitFilter = () => {
  emit('filter-change', { type: 'text', value: inputValue.value })
}
</script>
