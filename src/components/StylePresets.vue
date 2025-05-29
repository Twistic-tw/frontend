<template>
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="handleClick"
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

// Estado del modal
const showStyleModal = ref(false)

// Bandera para saber si ya se ha hecho el fetch
const hasFetched = ref(false)

// Lista de presets obtenidos del backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylePresets = ref<any[]>([])

const toast = useToast()

// Función que se ejecuta al hacer clic en el card
const handleClick = () => {
  if (!showStyleModal.value) {
    openModal()
  }
}

// Función que abre el modal y obtiene los estilos si aún no se han cargado
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

// Función que cierra el modal (se llama desde el evento @close del modal)
const handleClose = () => {
  console.log('Cerrando modal desde handleClose')
  showStyleModal.value = false
}

// Props recibidas desde CustomizePdf
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
