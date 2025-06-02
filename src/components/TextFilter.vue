<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('search_text') }}</label>
    <input
      type="text"
      v-model="inputValue"
      @input="emitFilter"
      class="w-full p-2 border rounded shadow-sm"
      :placeholder="$t('type_to_filter')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])

const inputValue = ref('')

const emitFilter = () => {
  emit('filter-change', { type: 'text', value: inputValue.value })
}
</script>
