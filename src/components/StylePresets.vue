<template>
  <!-- Card que abre el modal -->
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="openModal"
  >
    <h2 class="text-xl font-bold text-gray-800">
      {{ $t('style_presets_title') }}
    </h2>

    <!-- Modal de estilos -->
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

// Estado para mostrar/ocultar el modal
const showStyleModal = ref(false)

// Lista de estilos cargados desde el backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylePresets = ref<any[]>([])

// Flag para evitar recargar estilos al volver a abrir el modal
const hasFetched = ref(false)

// Notificaciones
const toast = useToast()

// Función para abrir el modal y cargar estilos solo la primera vez
const openModal = async () => {
  showStyleModal.value = true

  // Si ya se han cargado, no hacer otra petición
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

// Props que recibe desde el componente padre
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
