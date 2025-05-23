<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Search & Filter Data</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Search by field</label>
        <select v-model="searchField" class="w-full p-2 border rounded">
          <option disabled value="">Select field</option>
          <option v-for="field in fields" :key="field.name" :value="field.name">
            {{ field.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Search by value</label>
        <input
          v-model="searchValue"
          @input="filterRows"
          placeholder="Enter value to filter"
          class="w-full p-2 border rounded"
        />
      </div>
      <div class="flex items-end">
        <button
          @click="clearSearch"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Clear Filter
        </button>
      </div>
    </div>

    <div
      v-if="searchActive && filteredRows.length"
      class="overflow-auto max-h-[300px] border rounded"
    >
      <div class="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
        <span class="text-sm text-gray-700">
          {{ selectedRows.size }} of {{ filteredRows.length }} selected
        </span>
        <div class="flex gap-2">
          <button
            @click="selectAllFiltered"
            class="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
          >
            Show all
          </button>
          <button
            @click="deselectAllFiltered"
            class="text-xs bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Hide all
          </button>
        </div>
      </div>

      <table class="table-auto w-full text-sm">
        <tbody>
          <tr
            v-for="(row, index) in filteredRows"
            :key="'row-' + index"
            class="hover:bg-gray-50 text-sm"
          >
            <td class="px-3 py-1 text-center align-middle">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  :checked="selectedRows.has(index)"
                  @change="toggleRow(index)"
                  class="sr-only peer"
                />
                <div class="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
                <div
                  class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"
                ></div>
              </label>
            </td>
            <td class="px-3 py-1 border-t align-middle">
              {{ row[searchField] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-sm text-gray-500 mt-2">
      No results found. Try another value.
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fields: { name: string }[]
  searchField: string
  searchValue: string
  searchActive: boolean
  filteredRows: Record<string, string>[]
  selectedRows: Set<number>
  filterRows: () => void
  clearSearch: () => void
  selectAllFiltered: () => void
  deselectAllFiltered: () => void
  toggleRow: (index: number) => void
}>()
</script>
