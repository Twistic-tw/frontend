import { ref } from 'vue'

export const fieldTypes = ref<Record<string, 'text' | 'number' | 'date' | 'boolean'>>({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const advancedFilters = ref<Record<string, any>>({})

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

export function getFieldType(fieldName: string): 'text' | 'number' | 'date' | 'boolean' {
  const type = fieldTypes.value[fieldName]
  if (!type) {
    console.warn(`Field type not found for "${fieldName}". Defaulting to 'text'.`)
  }
  return type || 'text'
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

export function getColumnValues(fieldName: string, rows: Record<string, string>[]): string[] {
  return rows.map(row => row[fieldName]).filter(v => !!v)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateAdvancedFilter(field: string, value: any) {
  const expectedType = getFieldType(field)

  const isValid = (() => {
    switch (expectedType) {
      case 'text':
        return typeof value?.value === 'string'
      case 'number':
        return typeof value?.min === 'number' && typeof value?.max === 'number'
      case 'date':
        return Boolean(Date.parse(value?.start)) && Boolean(Date.parse(value?.end))
      case 'boolean':
        return typeof value?.value === 'boolean' || ['true', 'false', '1', '0', 'sí', 'no'].includes(value?.value?.toLowerCase?.())
      default:
        return false
    }
  })()

  if (!isValid) {
    console.warn(`Invalid filter value for field "${field}" of type "${expectedType}"`, value)
    return
  }

  advancedFilters.value[field] = value
}

export function applyAdvancedFilters(
  rows: Record<string, string>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any> = advancedFilters.value
): Record<string, string>[] {
  return rows.filter(row => {
    return Object.entries(filters).every(([field, filter]) => {
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
