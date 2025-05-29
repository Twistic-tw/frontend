<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-6 overflow-auto relative">
      <!-- Botón cerrar -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition"
      >
        &times;
      </button>

      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        {{ $t('style_presets_title') }}
      </h2>

      <div class="divide-y divide-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div
          v-for="preset in presets"
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
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">🎨 {{ $t('title_background_color') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.titleBackground }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">📝 {{ $t('title_color') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.titleText }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">📌 {{ $t('header_background') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.headerColor }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">🔤 {{ $t('header_text') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.headerText }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">📄 {{ $t('primary_row') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.rowPrimaryColor }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">📄 {{ $t('alternate_row') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.rowAlternateColor }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">🖋️ {{ $t('content_text') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.text }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">📥 {{ $t('footer_background') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.footerColor }"
                    class="w-full h-8 rounded border"></div>
              </div>
              <div class="flex flex-col items-start gap-1">
                <span class="text-xs text-gray-500">📢 {{ $t('footer_text') }}</span>
                <div :style="{ backgroundColor: preset.style_data?.colors?.footerText }"
                    class="w-full h-8 rounded border"></div>
              </div>
            </div>

            <!-- Tipografía -->
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
import { ref, onMounted } from 'vue'
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
  colors: any
}>()

// Estado
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const presets = ref<any[]>([])
const expandedPreset = ref<number | null>(null)
const toast = useToast()

// Obtener lista
const fetchPresets = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/style-presets`, {
      withCredentials: true
    })
    presets.value = res.data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    toast.error('Error loading saved styles')
  }
}

// Expandir fila
const toggleExpand = (id: number) => {
  expandedPreset.value = expandedPreset.value === id ? null : id
}

// Aplicar preset
const applyPreset = async (id: number) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/style-presets/${id}`, {
      withCredentials: true
    })
    const data = res.data.style_data
    Object.assign(props.titleSettings, data.titleSettings || {})
    Object.assign(props.headerStyle, data.headerStyle || {})
    Object.assign(props.rowStyle, data.rowStyle || {})
    Object.assign(props.cellStyle, data.cellStyle || {})
    Object.assign(props.footerStyle, data.footerStyle || {})
    Object.assign(props.colors, data.colors || {})
    toast.success('Estilo aplicado correctamente')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    toast.error('Error applying style')
  }
}

// Eliminar preset
const deletePreset = async (id: number) => {
  try {
    await axios.delete(`${import.meta.env.VITE_URL}/style-presets/${id}`, {
      withCredentials: true
    })
    toast.success('Estilo eliminado')
    fetchPresets()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    toast.error('Error deleting style')
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })

onMounted(fetchPresets)
</script>
