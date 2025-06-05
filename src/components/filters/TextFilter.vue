<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700">
      {{ $t('filter_condition') }}
    </label>

    <!-- Condiciones -->
    <div v-for="condition in filters" :key="condition.value" class="space-y-2">
      <label class="text-sm text-gray-600 font-semibold">
        {{ $t(condition.label) }}
      </label>
      <input
        type="text"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        :placeholder="$t('enter_value')"
        v-model="localModel[condition.value]"
        @input="emitFilter(condition.value)"
        @keyup.enter="emitFilter(condition.value)"
      />
    </div>

    <!-- Botón de limpiar -->
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
import type { FilterConditionOption } from '../../types/FilterConditionOption'

// Props
const props = defineProps<{
  modelValue: Record<string, string>
  fieldName: string
  values: string[]
  filters: FilterConditionOption[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>): void
  (e: 'filter-change', payload: { type: 'text'; condition: string; value: string }): void
}>()

// Modelo local para mantener valores reactivos
const localModel = ref<Record<string, string>>({ ...props.modelValue })

// Actualiza el localModel si cambia desde el padre
watch(
  () => props.modelValue,
  (newVal) => {
    localModel.value = { ...newVal }
  },
  { deep: true }
)

// Emitir cambio individual
function emitFilter(condition: string) {
  const value = localModel.value[condition]
  emit('update:modelValue', { ...localModel.value })
  if (value?.trim()) {
    emit('filter-change', { type: 'text', condition, value })
  }
}

// Limpiar
function clearAll() {
  const cleared = Object.fromEntries(props.filters.map(f => [f.value, '']))
  localModel.value = cleared
  emit('update:modelValue', cleared)
  // También puedes emitir un cambio de filtro vacío si lo necesitas
}
</script>
