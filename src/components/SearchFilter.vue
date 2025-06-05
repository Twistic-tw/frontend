<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200">
    <div
      class="flex items-center justify-between p-6 border-b border-gray-100 cursor-pointer"
      @click="showModal = true"
    >
      <h2 class="text-xl font-bold text-gray-800">{{ t('search_by_field') }}</h2>
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
            aria-label="Close modal"
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

          <!-- Panel lateral de filtros -->
          <aside
            class="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto border-r p-6 space-y-6 bg-gray-50"
          >
            <h2 class="text-xl font-bold text-gray-800">{{ t('title_filter_column') }}</h2>
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

            <transition name="fade-slide" mode="out-in">
              <div
                v-if="showFilter"
                :key="searchField"
                class="transition-all duration-300 ease-in-out"
              >
                <component
                  :is="components[getFilterComponent(getFieldType(searchField))]"
                  v-model="advancedFilterValues[searchField]"
                  :field-name="searchField"
                  :values="getColumnValues(searchField, allRows)"
                  :filters="getFilterOptionsFromFieldName(searchField)"
                  @filter-change="(val) => handleAdvancedFilter(searchField, val)"
                />
              </div>
            </transition>
          </aside>

          <!-- Tabla -->
          <main class="flex-1 p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              {{ t('title_table_results_column') }}
            </h2>
            <div class="h-full max-h-full overflow-auto">
              <div v-if="filteredRows.length" class="border rounded-lg">
                <div
                  class="sticky top-0 z-20 bg-gray-100 px-4 py-3 border-b flex justify-between items-center"
                >
                  <span class="text-sm text-gray-700">
                    {{ selectedRows.length }} {{ t('of') }} {{ filteredRows.length }}
                    {{ t('selected') }}
                  </span>
                  <div class="flex gap-2">
                    <button
                      @click="$emit('selectAll')"
                      class="text-xs bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700"
                    >
                      {{ t('show_all') }}
                    </button>
                    <button
                      @click="$emit('deselectAll')"
                      class="text-xs bg-gray-400 text-white px-4 py-1.5 rounded hover:bg-gray-500"
                    >
                      {{ t('hide_all') }}
                    </button>
                  </div>
                </div>

                <table class="min-w-full divide-y divide-gray-200 text-sm">
                  <thead class="bg-gray-50 sticky top-12 z-10">
                    <tr>
                      <th class="px-4 py-2 text-left font-semibold text-gray-700">
                        {{ t('visible') }}
                      </th>
                      <th
                        v-for="field in fields"
                        :key="field.name"
                        class="px-4 py-2 text-left font-semibold text-gray-700"
                      >
                        {{ field.name }}
                      </th>
                    </tr>
                  </thead>

                  <!-- Añadido <transition-group> para animación -->
                  <transition-group name="fade-slide" tag="tbody" class="divide-y divide-gray-100">
                    <tr
                      v-for="(row, index) in filteredRows"
                      :key="'row-' + index"
                      class="hover:bg-gray-50 transition-all duration-300"
                    >
                      <td class="px-4 py-2">
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            :checked="selectedRows.includes(index)"
                            @change="$emit('toggleRow', index)"
                            class="sr-only peer"
                          />
                          <div
                            class="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"
                          ></div>
                          <div
                            class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"
                          ></div>
                        </label>
                      </td>
                      <td
                        v-for="key in fields.map((f) => f.name)"
                        :key="key"
                        class="px-4 py-2 text-gray-700"
                      >
                        {{ row[key] }}
                      </td>
                    </tr>
                  </transition-group>
                </table>
              </div>
              <div v-else class="text-sm text-gray-500 mt-4 text-center">
                {{ t('no_results_found') }}
              </div>
            </div>
          </main>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import TextFilter from './filters/TextFilter.vue'
import NumberRangeFilter from './filters/NumberRangeFilter.vue'
import DateRangeFilter from './filters/DateRangeFilter.vue'
import BooleanFilter from './filters/BooleanFilter.vue'
import NumberFilter from './filters/NumberFilter.vue'
import SelectFilter from './filters/SelectFilter.vue'
import { getFilterOptionsFromFieldName } from '../composable/getFilterOptions'
import {
  getFieldType,
  getFilterComponent,
  getColumnValues,
  updateAdvancedFilter,
} from '../composable/DynamicFiltersLogic'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  fields: { name: string }[]
  searchField: string
  searchValue: string
  filteredRows: Record<string, string>[]
  selectedRows: number[]
  allRows: Record<string, string>[]
}>()

const emit = defineEmits([
  'update:searchField',
  'update:searchValue',
  'filter',
  'clear',
  'selectAll',
  'deselectAll',
  'toggleRow',
])

const showModal = ref(false)
const showFilter = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const advancedFilterValues = ref<Record<string, any>>({})
const onUpdateSearchField = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  showFilter.value = false
  emit('update:searchField', value)
  emit('filter') // Recalcular en el padre
  setTimeout(() => {
    showFilter.value = true
  }, 100)
}

const handleAdvancedFilter = (field: string, value: unknown) => {
  console.log('📤 Emitiendo filtro desde SearchFilter:', { field, value })
  updateAdvancedFilter(field, value)
  emit('filter') // Notifica al padre para que actualice filteredRows
}

const components = {
  TextFilter,
  NumberRangeFilter,
  NumberFilter,
  DateRangeFilter,
  BooleanFilter,
  SelectFilter,
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(-10px);
}
</style>
