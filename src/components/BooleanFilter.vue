<template>
  <select v-model="selected" @change="emitFilter" class="w-full p-2 border rounded shadow-sm">
    <option disabled value="">-- {{ $t('select_option') }} --</option>
    <option value="true">{{ $t('yes') }}</option>
    <option value="false">{{ $t('no') }}</option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ fieldName: string; values: string[] }>()
const emit = defineEmits(['filter-change'])

const selected = ref('')

const emitFilter = () => {
  emit('filter-change', { type: 'boolean', value: selected.value })
}
</script>
