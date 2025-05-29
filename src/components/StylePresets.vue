<template>
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="handleOpenModal"
  >
    <h2 class="text-xl font-bold text-gray-800">
      {{ $t('style_presets_title') }}
    </h2>

    <!-- Modal -->
    <StylePresetsModal
      v-if="showStyleModal"
      @close="showStyleModal = false"
      :title-settings="titleSettings"
      :header-style="headerStyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :footer-style="footerStyle"
      :colors="colors"
      :presets="stylePresets"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StylePresetsModal from './StylePresetsModal.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const showStyleModal = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylePresets = ref<any[]>([])
const toast = useToast()

const handleOpenModal = async () => {
  if (stylePresets.value.length === 0) {
    await fetchStylePresets()
  }
  showStyleModal.value = true
}

const fetchStylePresets = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/style-presets`, {
      withCredentials: true
    })
    stylePresets.value = res.data
  } catch (error) {
    toast.error('Error al cargar estilos guardados')
    if (axios.isAxiosError(error)) {
      console.error('Respuesta del servidor:', error.response?.data)
    } else {
      console.error('Error desconocido:', error)
    }
  }
}

defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleSettings: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footerStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any
}>()
</script>
