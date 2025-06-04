<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <div
      class="flex items-center justify-between p-6 border-b border-gray-100 cursor-pointer"
      @click="showModal = true"
    >
      <h2 class="text-xl font-bold text-gray-800">{{ t('title_search_by_field') }}</h2>
    </div>

    <transition name="fade-scale">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        @click.self="showModal = false"
      >
        <div class="bg-white w-[95%] h-[90vh] rounded-xl shadow-xl overflow-hidden relative flex">
          <!-- Botón de cerrar -->
          <button
            @click="showModal = false"
            class="absolute top-4 right-4 z-30 bg-gray-800 text-white hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Panel lateral de filtros -->
          <aside class="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto border-r p-6 space-y-6 bg-gray-50">
            <!-- Filtros básicos -->
            <div>
              <select
                :value="searchField"
                @change="onUpdateSearchField"
                class="w-full p-2 border rounded shadow-sm"
              >
                <option disabled value="">{{ t('select_field') }}</option>
                <option v-for="field in fields" :key="field.name" :value="field.name">
                  {{ field.name }}
                </option>
              </select>
            </div>
            <div>
              <input
                :value="searchValue"
                @input="onUpdateSearchValue"
                class="w-full p-2 border rounded shadow-sm"
              />
            </div>
            <div>
              <button
                @click="$emit('clear')"
                class="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition shadow-sm"
              >
                {{ t('clear') }}
              </button>
            </div>

            <!-- Filtros avanzados dinámicos como acordeón -->
            <div class="space-y-2">
              <details
                v-for="(field, index) in fields"
                :key="'adv-' + field.name"
                :open="openAccordionIndex === index"
                class="border rounded-xl bg-white overflow-hidden transition-all duration-300"
              >
                <summary
                  class="cursor-pointer font-semibold text-gray-700 p-3 hover:bg-gray-100"
                  @click.prevent="toggleAccordion(index)"
                >
                  {{ field.name }}
                </summary>
                <transition name="fade-slide">
                  <div v-show="openAccordionIndex === index" class="p-4">
                    <component
                      :is="components[getFilterComponent(getFieldType(field.name))]"
                      :field-name="field.name"
                      :values="getColumnValues(field.name, filteredRows)"
                      @filter-change="val => handleAdvancedFilter(field.name, val)"
                    />
                  </div>
                </transition>
              </details>
            </div>
          </aside>

          <!-- Tabla -->
          <main class="flex-1 overflow-auto p-6">
            <div v-if="filteredRows.length" class="border rounded-lg">
              <div class="sticky top-0 z-20 bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
                <span class="text-sm text-gray-700">
                  {{ selectedRows.length }} {{ t('of') }} {{ filteredRows.length }} {{ t('selected') }}
                </span>
                <div class="flex gap-2">
                  <button @click="$emit('selectAll')" class="text-xs bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700">
                    {{ t('show_all') }}
                  </button>
                  <button @click="$emit('deselectAll')" class="text-xs bg-gray-400 text-white px-4 py-1.5 rounded hover:bg-gray-500">
                    {{ t('hide_all') }}
                  </button>
                </div>
              </div>

              <table class="min-w-full divide-y divide-gray-200 text-sm">
                <thead class="bg-gray-50 sticky top-12 z-10">
                  <tr>
                    <th class="px-4 py-2 text-left font-semibold text-gray-700">{{ t('visible') }}</th>
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
                          @change="$emit('toggleRow', index)"
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
            <div v-else class="text-sm text-gray-500 mt-4 text-center">
              {{ t('no_results') }}
            </div>
          </main>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, defineEmits, defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TextFilter from '../components/TextFilter.vue'
import NumberRangeFilter from '../components/NumberRangeFilter.vue'
import DateRangeFilter from '../components/DateRangeFilter.vue'
import BooleanFilter from '../components/BooleanFilter.vue'
import {
  getFieldType,
  getFilterComponent,
  getColumnValues,
  updateAdvancedFilter
} from '../composable/DynamicFiltersLogic'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  fields: { name: string }[]
  searchField: string
  searchValue: string
  filteredRows: Record<string, string>[]
  selectedRows: number[]
}>()

const emit = defineEmits([
  'update:searchField',
  'update:searchValue',
  'filter',
  'clear',
  'selectAll',
  'deselectAll',
  'toggleRow'
])

const showModal = ref(false)
const openAccordionIndex = ref<number | null>(null)

const toggleAccordion = (index: number) => {
  openAccordionIndex.value = openAccordionIndex.value === index ? null : index
}

const onUpdateSearchField = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:searchField', value)
  emit('filter')
}

const onUpdateSearchValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:searchValue', value)
  emit('filter')
}

const handleAdvancedFilter = (field: string, value: unknown) => {
  updateAdvancedFilter(field, value)
  emit('filter')
}

const components = {
  TextFilter,
  NumberRangeFilter,
  DateRangeFilter,
  BooleanFilter,
}
</script>

<style scoped>
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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
