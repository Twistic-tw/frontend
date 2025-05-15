<script setup lang="ts">
/* ------------------- IMPORTACIONES ------------------- */
import { ref, onMounted, onUnmounted, computed } from 'vue' // Hooks de Vue
import { useRoute } from 'vue-router' // Para acceder a los parámetros de ruta
import axios from 'axios' // Para hacer peticiones HTTP
import type { CSSProperties } from 'vue' // Para definir tipos de CSS
import draggable from 'vuedraggable' // Para arrastrar elementos (no usado en este fragmento)
import BackButton from '@/components/BackButton.vue' // Componente personalizado
import { useToast } from 'vue-toastification' // Para mostrar notificaciones tipo toast

/* ------------------- VARIABLES ------------------- */
const route = useRoute() // Obtenemos la ruta actual
const templateId = route.params.id as string // ID de la plantilla desde la URL
const toast = useToast() // Instancia del sistema de notificaciones

const templateName = ref('') // Nombre de la plantilla actual
const fields = ref<{ name: string; active: boolean }[]>([]) // Campos del Excel con activación
const limitedChunk = computed(() => paginatedRows.value[0]?.slice(0, 15) ?? []) // Limitar la vista previa a 10 filas
const loading = ref(true) // Estado de carga inicial
const error = ref(false) // Estado de error
const windowWidth = ref(window.innerWidth) // Ancho de ventana para diseño responsivo
const generating = ref(false) // Estado de generación del PDF
const cellStyle = computed(() => ({
  borderRight: colors.value.showBorders ? '1px solid #ccc' : 'none',
}))

const showBackground = (index: number) => {
  const hasFooter = !!images.value.footer
  const isLast = index === paginatedRows.value.length - 1

  // Solo evita aplicar fondo a la última página si tiene imagen de pie
  if (hasFooter && isLast) return false

  // Aplica fondo a todas las páginas de datos si hay imagen de fondo
  return !!images.value.background
}

const footerStyle = computed<CSSProperties>(() => ({
  backgroundColor: colors.value.footer,
  color: colors.value.footerText,
  textAlign: 'right',
  fontSize: '12px',
  fontStyle: 'italic',
  padding: '10px 30px',
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
}))

// Actualizar el ancho de la ventana cuando se redimensiona
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

// Registrar el listener al montar el componente
onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
  updateWindowWidth()
})

// Eliminar el listener al desmontar
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

/* ------------------- ESTILOS ------------------- */
const colors = ref({
  background: '#ffffff', // Color de fondo del PDF
  rowPrimary: '#ffffff', // Color de la fila principal
  rowAlternate: '#f9fafb', // Color de la fila alterna
  text: '#000000', //
  title: '#1f2937', //
  header: '#4f46e5', // Color del encabezado
  headerText: '#ffffff', // Color del texto del encabezado
  footer: '#4f46e5', // Color del pie de página
  footerText: '#ffffff', // Color del texto del pie de página
  showBorders: ref(true),
})

const titleSettings = ref({
  size: '2rem',
  align: 'center' as 'left' | 'center' | 'right',
  font: 'Arial',
  fieldFont: 'Arial',
  fieldSize: '1rem',
  fieldAlign: 'left' as 'left' | 'center' | 'right',
})

/* ------------------- IMÁGENES ------------------- */
const images = ref({
  cover: null as File | null,
  header: null as File | null,
  second: null as File | null,
  background: null as File | null,
  footer: null as File | null,
})

// Previsualización de imágenes cargadas localmente
const coverUrl = computed(() => (images.value.cover ? URL.createObjectURL(images.value.cover) : ''))
const headerUrl = computed(() =>
  images.value.header ? URL.createObjectURL(images.value.header) : '',
)
const secondUrl = computed(() =>
  images.value.second ? URL.createObjectURL(images.value.second) : '',
)
const backgroundUrl = computed(() =>
  images.value.background ? URL.createObjectURL(images.value.background) : '',
)
const footerUrl = computed(() =>
  images.value.footer ? URL.createObjectURL(images.value.footer) : '',
)

/* -------- VALIDACIÓN Y CARGA DE IMÁGENES -------- */
// Verifica tipo y tamaño de archivo antes de guardarlo
const handleImageUpload = (
  e: Event,
  type: 'cover' | 'header' | 'second' | 'footer' | 'background',
) => {
  const file = (e.target as HTMLInputElement).files?.[0] || null
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'] // Tipos permitidos
  const maxSizeMB = 2 // Tamaño máximo

  if (!validTypes.includes(file.type)) {
    toast.error(`"${file.name}" is not a valid image type. Please, use JPG or PNG.`)
    ;(e.target as HTMLInputElement).value = '' // Limpiar input
    return
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
    toast.error(`"${file.name}" weighs ${sizeInMB}MB. Maximum allowed: ${maxSizeMB}MB.`)
    ;(e.target as HTMLInputElement).value = '' // Limpiar input
    return
  }

  images.value[type] = file
}

/* ------------------- DATOS ------------------- */
const excelData = ref<Record<string, string>[]>([]) // Datos cargados desde Excel

// Nombres de los campos activos seleccionados
const activeFieldNames = computed(() => fields.value.filter((f) => f.active).map((f) => f.name))

// Estilo del encabezado de la tabla
const headerStyle = computed<Record<string, string>>(() => ({
  backgroundColor: colors.value.header,
  color: colors.value.headerText,
  gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
}))

// Estilo dinámico para cada fila (colores alternos)
const rowStyle = (ri: number): Record<string, string> => ({
  gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
  backgroundColor: ri % 2 === 0 ? colors.value.rowPrimary : colors.value.rowAlternate,
  color: colors.value.text,
  fontFamily: titleSettings.value.fieldFont,
  fontSize: titleSettings.value.fieldSize,
  textAlign: titleSettings.value.fieldAlign,
})

// Agrupar filas en bloques de 25 (una por página)
const rowsPerPage = 25
const paginatedRows = computed(() => {
  const chunks = []
  for (let i = 0; i < excelData.value.length; i += rowsPerPage) {
    chunks.push(excelData.value.slice(i, i + rowsPerPage))
  }
  return chunks
})

/* ------------------- CARGAR PLANTILLA ------------------- */
const fetchTemplate = async () => {
  try {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    const res = await axios.get(`${import.meta.env.VITE_URL}/Templates/${templateId}/data`, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        Accept: 'application/json',
      },
    })
    templateName.value = res.data.template.name
    fields.value = (res.data.fields || []).map((f: string) => ({ name: f, active: true }))
    excelData.value = res.data.excel_data || []
  } catch (err) {
    console.error('Error loading data:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

/* ------------------- USUARIO ------------------- */
const userId = ref<number | null>(null) // ID del usuario autenticado

// Obtener token XSRF desde las cookies
const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null
}

// Obtener usuario actual autenticado desde el backend
const fetchUserId = async () => {
  const xsrfToken = getXsrfToken()
  if (!xsrfToken) return

  try {
    const response = await axios.get(`${import.meta.env.VITE_URL}/user`, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    userId.value = response.data.user.id
  } catch (error) {
    console.error('Error al obtener el usuario logueado:', error)
    userId.value = null
  }
}

/* ------------------- MARCAR NOTIFICACIÓN ------------------- */
/*
const finishNotification = async () => {
  try {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
    await axios.post(`${import.meta.env.VITE_URL}/FinishNotification/${templateId}`, {}, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json',
      },
      withCredentials: true,
    });
    console.log('Notificación marcada como completada');
  } catch (err) {
    console.error('Error al marcar la notificación como completada:', err);
  }
};
*/
/* ------------------- ENVÍO AL BACKEND ------------------- */
const sendToBackend = async () => {
  if (!userId.value) {
    console.error('No hay usuario autenticado.')
    return
  }

  const xsrfToken = getXsrfToken()
  if (!xsrfToken) {
    console.error('No se pudo obtener el token CSRF.')
    return
  }

  generating.value = true // Activar spinner
  const toastId = toast.info('Creating your PDF, please wait...', { timeout: false }) // Mostrar toast persistente

  try {
    const formData = new FormData()

    formData.append('id_user', userId.value.toString())
    formData.append('template_name', templateName.value)
    formData.append('fields', JSON.stringify(activeFieldNames.value))
    formData.append('excel_data', JSON.stringify(excelData.value))
    formData.append(
      'style',
      JSON.stringify({
        background: colors.value.background,
        rowPrimary: colors.value.rowPrimary,
        rowAlternate: colors.value.rowAlternate,
        text: colors.value.text,
        title: colors.value.title,
        header: colors.value.header,
        headerText: colors.value.headerText,
        footerColor: colors.value.footer,
        footerTextColor: colors.value.footerText,
        size: titleSettings.value.size,
        align: titleSettings.value.align,
        fieldFont: titleSettings.value.fieldFont,
        fieldSize: titleSettings.value.fieldSize,
        borderColor: '#000000',
        borderWidth: '1px',
        showBorders: colors.value.showBorders,
      }),
    )

    // Agregar imágenes al FormData
    if (images.value.cover) formData.append('cover', images.value.cover)
    if (images.value.second) formData.append('second', images.value.second)
    if (images.value.header) formData.append('header', images.value.header)
    if (images.value.background) formData.append('background', images.value.background)
    if (images.value.footer) formData.append('footer', images.value.footer)

    const res = await axios.post(`${import.meta.env.VITE_URL}/Pdf`, formData, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        Accept: 'application/json',
      },
      withCredentials: true,
      responseType: 'blob',
    })

    // Crear un enlace temporal para descargar el PDF
    const blob = new Blob([res.data], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${templateName.value}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    //await finishNotification();
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const responseText = reader.result as string
          const errorData = JSON.parse(responseText)
          console.error('Mensaje de error detallado del backend:', errorData)
          toast.error(errorData.message || 'Error desconocido')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (parseError) {
          console.error('Error de parseo del error:', reader.result)
          toast.error('Error inesperado al generar el PDF.')
        }
      }
      reader.readAsText(err.response.data)
    } else {
      console.error('Error inesperado:', err)
      toast.error('Error inesperado en la conexión con el backend.')
    }
  } finally {
    generating.value = false // Desactivar spinner
    toast.dismiss(toastId) // Cerrar toast
  }
}

/* ------------------- INICIO ------------------- */
onMounted(() => {
  fetchTemplate()
  fetchUserId()
})
</script>

<template>
  <!-- Overlay spinner centrado -->
  <div
    v-if="generating"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="text-white text-lg font-semibold flex items-center gap-3">
      <svg
        class="animate-spin h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      Creating your PDF...
    </div>
  </div>

  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4 overflow-y-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Customize {{ templateName }} Catalog
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-else-if="error" class="text-center text-red-500">Error loading data.</div>

    <!-- Overlay spinner centrado -->
  <!-- Editor y Preview en grid -->
<div class="flex flex-col md:flex-row gap-6 w-full max-w-[1600px] mx-auto px-4">
  <!-- Columna izquierda: Campos, Estilos e Imágenes -->
  <div class="w-full md:w-[50%] space-y-8">
    <!-- Campos activos -->
    <div>
      <h2 class="text-xl font-semibold text-gray-800 mb-3">Active Fields</h2>
      <draggable v-model="fields" item-key="name" class="space-y-2">
        <template #item="{ element }">
          <div class="flex justify-between items-center bg-white border rounded shadow p-3">
            <span>{{ element.name }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="element.active" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
              <div class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
            </label>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Estilos e Imágenes -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Estilos -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Customize Style</h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">PDF Background</label>
            <input type="color" v-model="colors.background" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Primary Row</label>
            <input type="color" v-model="colors.rowPrimary" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alternate Row</label>
            <input type="color" v-model="colors.rowAlternate" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Header Background</label>
            <input type="color" v-model="colors.header" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Header Text</label>
            <input type="color" v-model="colors.headerText" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <input type="color" v-model="colors.text" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Footer Background</label>
            <input type="color" v-model="colors.footer" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
            <input type="color" v-model="colors.footerText" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Show Table Borders</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="colors.showBorders" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
              <div class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Field Font</label>
            <select v-model="titleSettings.fieldFont" class="w-full p-2 border rounded">
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Imágenes -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Images</h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Cover</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'cover')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Second Cover</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'second')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Header</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'header')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Footer</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'footer')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Background</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'background')" class="file-input w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de generación -->
    <button
      @click="sendToBackend"
      class="w-full bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 hover:scale-105 transition"
    >
      Generate PDF
    </button>
  </div>

      <!-- DERECHA: Vista previa -->
      <div class="w-full lg:w-1/2">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Live Preview</h2>
        <div
          id="pdf-content"
          class="overflow-y-auto overflow-x-hidden max-w-full origin-top-left w-full"
          style="aspect-ratio: 794/1123; transform: scale(1)"
        >
          <!-- Portada -->
          <div v-if="images.cover" class="a4-page">
            <img
              :src="coverUrl"
              alt="Cover Image"
              class="a4-image-content no-radius w-full h-full object-cover"
            />
          </div>

          <!-- Segunda portada -->
          <div v-if="images.second" class="a4-page">
            <img
              :src="secondUrl"
              alt="Second Cover"
              class="a4-image-content no-radius w-full h-full object-contain"
            />
          </div>

          <!-- Páginas de contenido -->
          <div
            v-for="(chunk, index) in paginatedRows"
            :key="'page-' + index"
            class="a4-page"
            :style="{
              backgroundImage: showBackground(index) ? `url(${backgroundUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }"
          >
            <!-- Cabecera -->
            <div v-if="images.header" class="mb-4" style="height: 120px; overflow: hidden">
              <img
                :src="headerUrl"
                alt="Header Image"
                class="w-full object-cover rounded-b-lg"
                style="height: 120px"
              />
            </div>

            <!-- Tabla -->
            <div
              class="w-full text-sm border border-transparent rounded-[8px] shadow-sm p-6 table-preview-shadow"
            >
              <div class="grid font-medium" :style="headerStyle">
                <div
                  v-for="(key, i) in activeFieldNames"
                  :key="'header-' + i"
                  class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0"
                >
                  {{ key }}
                </div>
              </div>
              <div
                v-for="(row, ri) in limitedChunk"
                :key="'row-' + index + '-' + ri"
                class="grid"
                :style="rowStyle(ri)"
              >
                <div
                  v-for="(key, i) in activeFieldNames"
                  :key="'cell-' + index + '-' + ri + '-' + i"
                  class="px-4 py-2 last:border-r-0"
                  :style="cellStyle"
                >
                  {{ row[key] }}
                </div>
              </div>
            </div>

            <!-- Pie de página -->
            <div
              v-if="index === paginatedRows.length - 1 && images.footer"
              class="a4-image full-a4"
            >
              <img :src="footerUrl" alt="Footer Image" class="a4-image-content no-radius" />
            </div>
            <div class="footer-bar" :style="footerStyle">Page {{ index + 1 }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
    </div>
</template>

<style scoped>
.file-input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.a4-page {
  position: relative;
  width: 794px;
  height: 1123px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto 2rem;
  page-break-after: always;
  overflow: hidden;
  z-index: 1;
}

.a4-page > *:not(.absolute) {
  position: relative;
  z-index: 10;
}

.a4-image.full-a4 {
  width: 794px;
  height: 1123px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0;
}

.a4-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.no-radius {
  border-radius: 0;
}

.table-preview-shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
  width: 100%;
}
</style>
