// Este archivo define la lógica de inferencia y filtros avanzados
import { ref } from 'vue'

export const fieldTypes = ref<Record<string, 'text' | 'number' | 'date' | 'boolean'>>({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const advancedFilters = ref<Record<string, any>>({})

// Inferir tipo de campo a partir de valores
export function inferFieldType(values: string[]): 'text' | 'number' | 'date' | 'boolean' {
  let isNumber = true
  let isDate = true
  let isBoolean = true

  for (const val of values.slice(0, 20)) {
    const v = val?.trim()?.toLowerCase()
    if (!v) continue

    if (isNaN(Number(v))) isNumber = false
    if (isNaN(Date.parse(v))) isDate = false
    if (!['true', 'false', '1', '0', 'sí', 'no'].includes(v)) isBoolean = false
  }

  if (isBoolean) return 'boolean'
  if (isDate) return 'date'
  if (isNumber) return 'number'
  return 'text'
}

// Obtener tipo de campo con cache previa
export function getFieldType(fieldName: string): 'text' | 'number' | 'date' | 'boolean' {
  return fieldTypes.value[fieldName] || 'text'
}

export function getFilterComponent(type: 'text' | 'number' | 'date' | 'boolean') {
  switch (type) {
    case 'text': return 'TextFilter'
    case 'number': return 'NumberRangeFilter'
    case 'date': return 'DateRangeFilter'
    case 'boolean': return 'BooleanFilter'
    default: return 'TextFilter'
  }
}

// Obtener valores de columna (solo no vacíos)
export function getColumnValues(fieldName: string, rows: Record<string, string>[]): string[] {
  return rows.map(row => row[fieldName]).filter(v => !!v)
}

// Guardar filtro aplicado
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateAdvancedFilter(field: string, value: any) {
  advancedFilters.value[field] = value
}

// Aplicar filtros (ejemplo básico)
export function applyAdvancedFilters(rows: Record<string, string>[]): Record<string, string>[] {
  return rows.filter(row => {
    return Object.entries(advancedFilters.value).every(([field, filter]) => {
      const val = row[field]?.toString()?.toLowerCase()
      if (!val) return false

      switch (filter?.type) {
        case 'text':
          return val.includes(filter.value.toLowerCase())
        case 'number':
          return Number(val) >= filter.min && Number(val) <= filter.max
        case 'date': {
          const dateVal = new Date(val)
          return dateVal >= new Date(filter.start) && dateVal <= new Date(filter.end)
        }
        case 'boolean':
          return val === (filter.value.toString().toLowerCase())
        default:
          return true
      }
    })
  })
}
