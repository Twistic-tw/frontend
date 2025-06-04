import { ref, defineEmits, defineProps, withDefaults, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Importa lógica y componentes dinámicos
import {
  getFieldType,
  getFilterComponent,
  getColumnValues,
  updateAdvancedFilter,
  applyAdvancedFilters,
  fieldTypes,
  inferFieldType
} from './DynamicFiltersLogic'

import TextFilter from '../components/filters/TextFilter.vue'
import NumberRangeFilter from '../components/filters/NumberRangeFilter.vue'
import DateRangeFilter from '../components/filters/DateRangeFilter.vue'
import BooleanFilter from '../components/filters/BooleanFilter.vue'

const { t } = useI18n()
const showModal = ref(false)
const sortField = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')

// Aplica ordenación y filtros avanzados
const sortedRows = computed(() => {
  const rows = applyAdvancedFilters(props.filteredRows)
  if (!sortField.value) return rows
  return [...rows].sort((a, b) => {
    const aVal = a[sortField.value]
    const bVal = b[sortField.value]
    if (aVal === bVal) return 0
    return sortDirection.value === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })
})

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') showModal.value = false
}
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (props.filteredRows.length > 0) {
    props.fields.forEach(field => {
      const values = getColumnValues(field.name, props.filteredRows)
      fieldTypes.value[field.name] = inferFieldType(values)
    })
  }
})
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown))

const emit = defineEmits([
  'update:searchField',
  'update:searchValue',
  'filter',
  'clear',
  'selectAll',
  'deselectAll',
  'toggleRow'
])

const props = withDefaults(defineProps<{
  fields: { name: string }[]
  searchField?: string
  searchValue?: string
  filteredRows: Record<string, string>[]
  selectedRows: number[]
}>(), {
  searchField: '',
  searchValue: ''
})

const handleToggle = (index: number) => emit('toggleRow', index)
