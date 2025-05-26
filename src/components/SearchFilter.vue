<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <!-- Encabezado del card -->
    <div
      class="flex items-center justify-between p-6 border-b border-gray-100 cursor-pointer"
      @click="showModal = true"
    >
      <h2 class="text-xl font-bold text-gray-800">Search & Filter Data</h2>
    </div>

    <!-- MODAL CON TRANSICIÓN -->
    <transition name="fade-scale">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      >
        <div class="bg-white w-[95%] h-[90vh] rounded-xl shadow-xl p-6 overflow-auto relative">
          <!-- Botón cerrar -->
          <button
            @click="showModal = false"
            class="absolute top-4 right-4 bg-gray-800 text-white hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <!-- Filtros -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Search by field</label>
              <select
                :value="searchField || ''"
                @change="$emit('update:searchField', ($event.target as HTMLSelectElement).value); $emit('filter')"
                class="w-full p-2 border rounded shadow-sm"
              >
                <option disabled value="">Select field</option>
                <option v-for="field in fields" :key="field.name" :value="field.name">
                  {{ field.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Search by value</label>
              <input
                :value="searchValue"
                @input="$emit('update:searchValue', ($event.target as HTMLInputElement).value); $emit('filter')"
                class="w-full p-2 border rounded shadow-sm"
              />
            </div>
            <div class="flex items-end">
              <button
                @click="$emit('clear')"
                class="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition shadow-sm"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <!-- Tabla moderna -->
          <div v-if="filteredRows.length" class="overflow-auto border rounded-lg">
            <div class="flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
              <span class="text-sm text-gray-700">
                {{ selectedRows.length }} of {{ filteredRows.length }} selected
              </span>
              <div class="flex gap-2">
                <button
                  @click="$emit('selectAll')"
                  class="text-xs bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700"
                >
                  Show all
                </button>
                <button
                  @click="$emit('deselectAll')"
                  class="text-xs bg-gray-400 text-white px-4 py-1.5 rounded hover:bg-gray-500"
                >
                  Hide all
                </button>
              </div>
            </div>

            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th class="px-4 py-2 text-left font-semibold text-gray-700">Visible</th>
                  <th
                    v-for="field in fields"
                    :key="field.name"
                    class="px-4 py-2 text-left font-semibold text-gray-700"
                  >
                    {{ field.name }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="(row, index) in filteredRows"
                  :key="'row-' + index"
                  class="hover:bg-gray-50"
                >
                  <td class="px-4 py-2">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :checked="selectedRows.includes(index)"
                        @change="handleToggle(index)"
                        class="sr-only peer"
                      />
                      <div class="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
                      <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
                    </label>
                  </td>
                  <td
                    v-for="key in fields.map(f => f.name)"
                    :key="key"
                    class="px-4 py-2 text-gray-700"
                  >
                    {{ row[key] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else-if="searchField && searchValue" class="text-sm text-gray-500 mt-4 text-center">
            No results found. Try another value.
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, withDefaults } from 'vue'

const showModal = ref(false)

const emit = defineEmits<{
  (e: 'update:searchField', value: string): void
  (e: 'update:searchValue', value: string): void
  (e: 'filter'): void
  (e: 'clear'): void
  (e: 'selectAll'): void
  (e: 'deselectAll'): void
  (e: 'toggleRow', index: number): void
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<{
  fields: { name: string }[]
  searchField?: string
  searchValue?: string
  filteredRows: Record<string, string>[]
  selectedRows: number[]
}>(), {
  searchField: '',
  searchValue: '',
})

const handleToggle = (index: number) => emit('toggleRow', index)
</script>

<style scoped>
/* Transición suave para el modal */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
