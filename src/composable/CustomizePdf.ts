import { ref, computed, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function CustomizePdf() {
  const route = useRoute()
  const templateId = route.params.id as string
  const toast = useToast()

  const templateName = ref('')
  const fields = ref<{ name: string; active: boolean }[]>([])
  const loading = ref(true)
  const error = ref(false)
  const generating = ref(false)
  const windowWidth = ref(window.innerWidth)

  const excelData = ref<Record<string, string>[]>([])
  const activeFieldNames = computed(() => fields.value.filter(f => f.active).map(f => f.name))

  // Estilos de tabla
  const colors = ref({
    backgroundColor: '#ffffff',
    backgroundAlpha: 1,
    rowPrimaryColor: '#ffffff',
    rowPrimaryAlpha: 1,
    rowAlternateColor: '#f9fafb',
    rowAlternateAlpha: 1,
    headerColor: '#4f46e5',
    headerAlpha: 1,
    headerText: '#ffffff',
    text: '#000000',
    footerColor: '#4f46e5',
    footerAlpha: 1,
    footerText: '#ffffff',
    showBorders: true,
  })

  // Estilos de título
  const titleSettings = ref({
    size: '2rem',
    align: 'center' as 'left' | 'center' | 'right',
    font: 'Arial',
    fieldFont: 'Arial',
    fieldSize: '1rem',
    fieldAlign: 'left' as 'left' | 'center' | 'right',
  })

  // Imágenes
  const images = ref({
    cover: null as File | null,
    header: null as File | null,
    second: null as File | null,
    background: null as File | null,
    footer: null as File | null,
  })

  // Buscar y filtrar
  const searchField = ref('')
  const searchValue = ref('')
  const filteredRows = ref<Record<string, string>[]>([])
  const selectedRows = ref<Set<number>>(new Set())

  function filterRows() {
    if (!searchField.value || !searchValue.value) {
      filteredRows.value = paginatedRows.value.flat()
      return
    }

    const field = searchField.value.toLowerCase()
    const value = searchValue.value.toLowerCase()

    filteredRows.value = paginatedRows.value
      .flat()
      .filter(row => {
        const cell = row[field]
        return cell && cell.toString().toLowerCase().includes(value)
      })
  }

  // Seleccionar filas
  function toggleRow(index: number) {
    if (selectedRows.value.has(index)) {
      selectedRows.value.delete(index)
    } else {
      selectedRows.value.add(index)
    }
  }

  // Limpiar búsqueda dinámica
  function clearSearch() {
    searchField.value = ''
    searchValue.value = ''
    selectedRows.value.clear()
    filteredRows.value = paginatedRows.value.flat()
  }

  // Imágenes
  const coverUrl = computed(() => images.value.cover ? URL.createObjectURL(images.value.cover) : '')
  const secondUrl = computed(() => images.value.second ? URL.createObjectURL(images.value.second) : '')
  const headerUrl = computed(() => images.value.header ? URL.createObjectURL(images.value.header) : '')
  const backgroundUrl = computed(() => images.value.background ? URL.createObjectURL(images.value.background) : '')
  const footerUrl = computed(() => images.value.footer ? URL.createObjectURL(images.value.footer) : '')

  // Obtener el token XSRF
  const getXsrfToken = () => document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null

  // Obtener el ID del usuario
  const userId = ref<number | null>(null)

  // Convertir hex a rgba
    const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // vincular colores a variable
  const computedColors = computed(() => ({
    background: hexToRgba(colors.value.backgroundColor, colors.value.backgroundAlpha),
    rowPrimary: hexToRgba(colors.value.rowPrimaryColor, colors.value.rowPrimaryAlpha),
    rowAlternate: hexToRgba(colors.value.rowAlternateColor, colors.value.rowAlternateAlpha),
    header: hexToRgba(colors.value.headerColor, colors.value.headerAlpha),
    footer: hexToRgba(colors.value.footerColor, colors.value.footerAlpha),
    headerText: colors.value.headerText,
    text: colors.value.text,
    footerText: colors.value.footerText,
  }))

  // Estilos de cabecera
  const headerStyle = computed<Record<string, string>>(() => ({
    backgroundColor: computedColors.value.header,
    color: computedColors.value.headerText,
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
  }))

  // Estilos de fila
  const rowStyle = (ri: number): Record<string, string> => ({
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
    backgroundColor: ri % 2 === 0 ? computedColors.value.rowPrimary : computedColors.value.rowAlternate,
    color: computedColors.value.text,
    fontFamily: titleSettings.value.fieldFont,
    fontSize: titleSettings.value.fieldSize,
    textAlign: titleSettings.value.fieldAlign,
  })

  // Estilos de celda
  const cellStyle = computed(() => ({
    borderRight: colors.value.showBorders ? '1px solid #ccc' : 'none',
  }))

  // Estilos de pie de página
  const footerStyle = computed<CSSProperties>(() => ({
    backgroundColor: computedColors.value.footer,
    color: computedColors.value.footerText,
    textAlign: 'right',
    fontSize: '12px',
    fontStyle: 'italic',
    padding: '10px 30px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
  }))

  // Paginación
  const rowsPerPage = 25
  const paginatedRows = computed(() => {
    const chunks = []
    for (let i = 0; i < excelData.value.length; i += rowsPerPage) {
      chunks.push(excelData.value.slice(i, i + rowsPerPage))
    }
    return chunks
  })

  // Limitar la cantidad de filas a mostrar
  const limitedChunk = computed(() => paginatedRows.value[0]?.slice(0, 8) ?? [])

  // Mostrar fondo
  const showBackground = (index: number): boolean => {
    const hasFooter = !!images.value.footer
    const isLast = index === paginatedRows.value.length - 1
    return hasFooter && isLast ? false : !!images.value.background
  }

  // Manejar la carga de imágenes
  const handleImageUpload = (e: Event, type: keyof typeof images.value) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null
    // Validar si el archivo existe
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const maxSizeMB = 2

    // Validar el tipo de archivo
    if (!validTypes.includes(file.type)) {
      toast.error(`"${file.name}" is not a valid image type. Please, use JPG or PNG.`)
      ;(e.target as HTMLInputElement).value = ''
      return
    }

    // Validar el tamaño del archivo
    if (file.size > maxSizeMB * 1024 * 1024) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      toast.error(`"${file.name}" weighs ${sizeInMB}MB. Maximum allowed: ${maxSizeMB}MB.`)
      ;(e.target as HTMLInputElement).value = ''
      return
    }

    images.value[type] = file
  }

  // Obtener el token XSRF
  const fetchUserId = async () => {
    const xsrfToken = getXsrfToken()
    if (!xsrfToken) return
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/user`, {
        headers: { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken), Accept: 'application/json' },
        withCredentials: true,
      })
      userId.value = res.data.user.id
    } catch (err) {
      console.error('Error fetching user:', err)
      userId.value = null
    }
  }

  // Obtener plantilla
  const fetchTemplate = async () => {
    try {
      const xsrfToken = getXsrfToken()
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

  // Enviar al backend
  const sendToBackend = async () => {
    if (!userId.value || !images.value.cover || !images.value.header) {
      toast.error('Please upload required images and ensure user is authenticated.')
      generating.value = false
      return
    }

    const xsrfToken = getXsrfToken()
    if (!xsrfToken) {
      toast.error('No CSRF token found.')
      return
    }

    generating.value = true
    try {
      const formData = new FormData()
      formData.append('id_user', userId.value.toString())
      formData.append('template_name', templateName.value)
      formData.append('fields', JSON.stringify(activeFieldNames.value))
      formData.append('excel_data', JSON.stringify(excelData.value))
      formData.append('style', JSON.stringify({
        background: computedColors.value.background,
        rowPrimary: computedColors.value.rowPrimary,
        rowAlternate: computedColors.value.rowAlternate,
        text: computedColors.value.text,
        header: computedColors.value.header,
        headerText: computedColors.value.headerText,
        footerColor: computedColors.value.footer,
        footerTextColor: computedColors.value.footerText,
        size: titleSettings.value.size,
        align: titleSettings.value.align,
        fieldFont: titleSettings.value.fieldFont,
        fieldSize: titleSettings.value.fieldSize,
        borderColor: '#000000',
        borderWidth: '1px',
        showBorders: colors.value.showBorders,
      }))

      Object.entries(images.value).forEach(([key, file]) => {
        if (file) formData.append(key, file)
      })

      const res = await axios.post(`${import.meta.env.VITE_URL}/Pdf`, formData, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
        withCredentials: true,
        responseType: 'blob',
      })

      const blob = new Blob([res.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${templateName.value}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error('Error generating PDF.')
      console.error(err)
    } finally {
      generating.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
    fetchTemplate()
    fetchUserId()
    filteredRows.value = paginatedRows.value.flat()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => windowWidth.value = window.innerWidth)
  })

  return {
    templateName,
    fields,
    colors,
    titleSettings,
    images,
    coverUrl,
    secondUrl,
    headerUrl,
    backgroundUrl,
    footerUrl,
    excelData,
    activeFieldNames,
    loading,
    error,
    generating,
    windowWidth,
    computedColors,
    headerStyle,
    rowStyle,
    cellStyle,
    footerStyle,
    paginatedRows,
    limitedChunk,
    searchField,
    searchValue,
    filteredRows,
    selectedRows,
    filterRows,
    toggleRow,
    clearSearch,
    showBackground,
    handleImageUpload,
    sendToBackend,
    fetchTemplate,
    userId,
    fetchUserId
  }
}

