<template>
  <div class="space-y-1">
    <p class="text-xs text-gray-400">{{ $t('text_filter_description') }}</p>
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

const props = defineProps<{ fieldName: string }>()
const emit = defineEmits(['filter-change'])

const inputValue = ref('')

const emitFilter = () => {
  emit('filter-change', {
    type: 'text',
    fieldName: props.fieldName,
    value: inputValue.value
  })
}
</script>
