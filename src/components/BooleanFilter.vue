<template>
  <div>
    <!-- Descripción breve del filtro -->
    <p class="text-xs text-gray-500 mb-1">
      {{ $t('boolean_filter_description') }}
    </p>

    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('select_boolean_value') }}</label>
    <select v-model="selected" @change="emitFilter" class="w-full p-2 border rounded shadow-sm">
      <option disabled value="">{{ $t('select_option') }}</option>
      <option value="true">{{ $t('yes') }}</option>
      <option value="false">{{ $t('no') }}</option>
    </select>
  </div>
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
