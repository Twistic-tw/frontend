<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-6 overflow-auto relative">
      <!-- Botón cerrar -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 bg-gray-800 text-white hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        aria-label="Cerrar modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        {{ $t('style_presets_title') }}
      </h2>

      <div class="divide-y divide-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div
          v-for="preset in props.presets"
          :key="preset.id"
          class="bg-white hover:bg-gray-50 transition cursor-pointer"
        >
          <!-- Fila principal -->
          <div
            class="flex justify-between items-center p-4"
            @click="toggleExpand(preset.id)"
          >
            <div>
              <p class="font-medium text-gray-800">{{ preset.name }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(preset.created_at) }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click.stop="applyPreset(preset.id)"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
              >
                {{ $t('style_presets_apply') }}
              </button>
              <button
                @click.stop="toggleExpand(preset.id)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
              >
                {{ $t('style_presets_view') }}
              </button>
              <button
                @click.stop="deletePreset(preset.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
              >
                {{ $t('style_presets_delete') }}
              </button>
            </div>
          </div>

          <!-- Fila desplegable -->
          <div v-if="expandedPreset === preset.id" class="bg-gray-50 px-4 pb-4">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div
                v-for="(colorValue, key) in preset.style_data?.colors"
                :key="key"
                class="flex flex-col items-start gap-1"
              >
                <span class="text-xs text-gray-500">{{ key }}</span>
                <div :style="{ backgroundColor: colorValue }" class="w-full h-8 rounded border"></div>
              </div>
            </div>

            <div class="mt-6 text-sm text-gray-700">
              <p><strong>{{ $t('field_font') }}:</strong> {{ preset.style_data?.titleSettings?.fieldFont }}</p>
              <p><strong>{{ $t('font_size') }}:</strong> {{ preset.style_data?.titleSettings?.fieldSize }}</p>
              <p><strong>{{ $t('show_borders') }}:</strong> {{ preset.style_data?.colors?.showBorders ? '✅' : '❌' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleSettings: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerStyle: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowStyle: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellStyle: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footerStyle: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presets: any[]
}>()

const toast = useToast()
const expandedPreset = ref<number | null>(null)

const toggleExpand = (id: number) => {
  expandedPreset.value = expandedPreset.value === id ? null : id
}

const applyPreset = (id: number) => {
  const preset = props.presets.find(p => p.id === id)
  if (!preset) return
  const data = preset.style_data

  Object.assign(props.titleSettings, data.titleSettings || {})
  Object.assign(props.headerStyle, data.headerStyle || {})
  Object.assign(props.rowStyle, data.rowStyle || {})
  Object.assign(props.cellStyle, data.cellStyle || {})
  Object.assign(props.footerStyle, data.footerStyle || {})
  Object.assign(props.colors, data.colors || {})

  toast.success('Estilo aplicado correctamente')
}

const deletePreset = async (id: number) => {
  try {
    await axios.delete(`${import.meta.env.VITE_URL}/style-presets/${id}`, {
      withCredentials: true
    })
    toast.success('Estilo eliminado. Vuelve a abrir para ver los cambios.')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    toast.error('Error al eliminar el estilo')
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
</script>
