<template>
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="openIfNotVisible"
  >
    <!-- Título del card -->
    <h2 class="text-xl font-bold text-gray-800">
      {{ $t('style_presets_title') }}
    </h2>

    <!-- Modal de estilos -->
    <StylePresetsModal
      v-if="showStyleModal"
      @close="handleClose"
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

// Estado para mostrar u ocultar el modal
const showStyleModal = ref(false)

// Bandera para evitar múltiples peticiones
const hasFetched = ref(false)

// Lista de presets recibida desde la API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylePresets = ref<any[]>([])

const toast = useToast()

// 👉 Función llamada desde el @click, se asegura de que el modal se abra sólo una vez
const openIfNotVisible = () => {
  if (!showStyleModal.value) {
    openModal()
  }
}

// 👉 Abre el modal y hace la petición si no se ha hecho ya
const openModal = async () => {
  showStyleModal.value = true

  if (!hasFetched.value) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/style-presets`, {
        withCredentials: true
      })
      stylePresets.value = res.data
      hasFetched.value = true
    } catch (error) {
      toast.error('Error al cargar estilos guardados')
      console.error('fetchStylePresets error:', error)
    }
  }
}

// 👉 Cierra el modal
const handleClose = () => {
  showStyleModal.value = false
}

// Props recibidas desde CustomizePdfView
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
