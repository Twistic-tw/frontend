// src/composable/getFilterOptions.ts
import { fieldFilterOptions } from './FieldFilterOptions'
export type FieldFilterOption = {
  value: string;
  label: string;
};

const filterOptionsMap: Record<string, FieldFilterOption[]> = {
  text: [
    { value: 'contains', label: 'filter_contains' },
    { value: 'not_contains', label: 'filter_not_contains' },
    { value: 'equals', label: 'filter_equals' },
    { value: 'starts_with', label: 'filter_starts_with' },
    { value: 'ends_with', label: 'filter_ends_with' },
  ],
  number: [
    { value: 'greater_than', label: 'filter_greater_than' },
    { value: 'less_than', label: 'filter_less_than' },
    { value: 'equals', label: 'filter_equals' },
    { value: 'between', label: 'filter_between' },
  ],
  date: [
    { value: 'before', label: 'filter_before' },
    { value: 'after', label: 'filter_after' },
    { value: 'between', label: 'filter_between' },
  ],
  boolean: [
    { value: 'is_true', label: 'filter_is_true' },
    { value: 'is_false', label: 'filter_is_false' },
  ],
  select: [
    { value: 'equals', label: 'filter_equals' },
    { value: 'not_equals', label: 'filter_not_equals' },
    { value: 'in', label: 'filter_in' },
  ],
}

/**
 * Obtiene el tipo de filtro para un campo, normaliza y devuelve sus opciones.
 */
function normalize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function getFilterOptionsFromFieldName(fieldName: string): FieldFilterOption[] {
  console.log('Buscando filtros para:', fieldName) // 🔍 entrada

  const key = Object.keys(fieldFilterOptions).find(
    def => normalize(def) === normalize(fieldName)
  )

  console.log('Clave encontrada en fieldFilterOptions:', key) // 🔍 clave real encontrada
  const fieldDef = key ? fieldFilterOptions[key] : null

  if (!fieldDef) {
    console.warn('❌ No se encontró configuración para:', fieldName)
    return []
  }

  console.log('🎯 Filtros encontrados:', filterOptionsMap[fieldDef.type])
  return filterOptionsMap[fieldDef.type] || []
}



