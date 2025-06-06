import { ref, computed, onMounted, onUnmounted, watch, type CSSProperties } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { applyAdvancedFilters } from '../composable/DynamicFiltersLogic'

export function CustomizePdf() {
  const route = useRoute()
  const templateId = route.params.id as string
  const toast = useToast()
  const showSaveStyleModal = ref(false)
  const previewRef = ref<HTMLElement | null>(null)
  const templateName = ref('')
  const fields = ref<{ name: string; active: boolean }[]>([])
  const loading = ref(true)
  const error = ref(false)
  const generating = ref(false)
  const windowWidth = ref(window.innerWidth)

  const excelData = ref<Record<string, string>[]>([])
  const activeFieldNames = computed(() => fields.value.filter((f) => f.active).map((f) => f.name))

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
    titleBackground: '#ffffff',
    titleText: '#1f2937',
    titleAlpha: 1,
  })

  const titleSettings = ref({
    size: '2rem',
    align: 'left',
    font: 'Arial',
    fieldFont: 'Arial',
    fieldSize: '1rem',
    fieldAlign: 'left' as 'left' | 'center' | 'right',
  })

  const images = ref({
    cover: null as File | null,
    header: null as File | null,
    second: null as File | null,
    background: null as File | null,
    footer: null as File | null,
  })

  const featuredImages = ref({
    image_one: null,
    image_two: null,
    image_three: null,
    image_four: null,
  })

  const featuredDescriptions = ref({
    desc_one: '',
    desc_two: '',
    desc_three: '',
    desc_four: '',
  })

  const coverUrl = ref('')
  const secondUrl = ref('')
  const headerUrl = ref('')
  const backgroundUrl = ref('')
  const footerUrl = ref('')

  watch(
    () => images.value.cover,
    (file) => {
      coverUrl.value = file ? URL.createObjectURL(file) : ''
    },
  )
  watch(
    () => images.value.second,
    (file) => {
      secondUrl.value = file ? URL.createObjectURL(file) : ''
    },
  )
  watch(
    () => images.value.header,
    (file) => {
      headerUrl.value = file ? URL.createObjectURL(file) : ''
    },
  )
  watch(
    () => images.value.background,
    (file) => {
      backgroundUrl.value = file ? URL.createObjectURL(file) : ''
    },
  )
  watch(
    () => images.value.footer,
    (file) => {
      footerUrl.value = file ? URL.createObjectURL(file) : ''
    },
  )

  const searchField = ref('')
  const searchValue = ref('')
  const searchActive = ref(false)
  const filteredRows = ref<Record<string, string>[]>([])
  const selectedRows = ref<number[]>([])

  // Lista de estilos guardados del usuario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stylePresets = ref<any[]>([])

  const handleSaveStyle = async (name: string) => {
    showSaveStyleModal.value = false
    const xsrfToken = await getXsrfToken()
    if (!xsrfToken) {
      toast.error('No CSRF token found.')
      return
    }

    const payload = {
      name,
      style_data: {
        titleSettings: titleSettings.value,
        colors: colors.value,
        headerStyle: headerStyle.value,
        rowStyle: rowStyle(0),
        cellStyle: cellStyle.value,
        footerStyle: footerStyle.value,
      },
    }

    try {
      await axios.post(`${import.meta.env.VITE_URL}/style-presets`, payload, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
        withCredentials: true,
      })
      toast.success('Estilo guardado correctamente')
      showSaveStyleModal.value = false
      stylePresets.value = await fetchStylePresets()
    } catch (err) {
      toast.error('Error al guardar estilo')
      console.error(err)
    }
  }


  /**
   * Cargar todos los estilos guardados por el usuario actual
   * desde el backend usando autenticación por cookies.
   */
  const fetchStylePresets = async () => {
    const xsrfToken = getXsrfToken()
    if (!xsrfToken) {
      toast.error('No CSRF token found.')
      return []
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/style-presets`, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        },
        withCredentials: true
      })
      return res.data
    } catch (error) {
      toast.error('Error al cargar estilos guardados')
      console.error('fetchStylePresets error:', error)
      return []
    }
  }

  const previewRows = computed(() => {
  const selected = filteredRows.value.filter((_, i) => selectedRows.value.includes(i))
  const pages = []
  for (let i = 0; i < selected.length; i += rowsPerPage) {
    pages.push(selected.slice(i, i + rowsPerPage))
  }
  return pages
})

  /**
   * Aplica un estilo guardado al editor cargando los datos desde el backend
   * y asignándolos a los objetos reactivamente.
   * @param id ID del preset guardado
   */
  const applyStylePreset = async (id: number) => {
    const xsrfToken = getXsrfToken()
    if (!xsrfToken) {
      toast.error('No CSRF token found.')
      return
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/style-presets/${id}`, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        },
        withCredentials: true
      })

      const data = res.data.style_data
      Object.assign(colors.value, data.colors || {})
      Object.assign(titleSettings.value, data.titleSettings || {})
      Object.assign(headerStyle.value, data.headerStyle || {})
      Object.assign(rowStyle, data.rowStyle || {})
      Object.assign(cellStyle.value, data.cellStyle || {})
      Object.assign(footerStyle.value, data.footerStyle || {})

      toast.success('Estilo aplicado correctamente')
    } catch (error) {
      toast.error('Error al aplicar el estilo guardado')
      console.error('applyStylePreset error:', error)
    }
  }

  /**
   * Elimina un estilo guardado del backend por ID
   * y actualiza la lista tras eliminarlo.
   * @param id ID del estilo a eliminar
   */
  const deleteStylePreset = async (id: number) => {
    const xsrfToken = getXsrfToken()
    if (!xsrfToken) {
      toast.error('No CSRF token found.')
      return
    }
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/style-presets/${id}`, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        },
        withCredentials: true
      })
      toast.success('Estilo eliminado correctamente')
      stylePresets.value = await fetchStylePresets()
    } catch (error) {
      toast.error('Error al eliminar el estilo')
      console.error('deleteStylePreset error:', error)
    }
  }

  function toggleRow(index: number) {
    if (selectedRows.value.includes(index)) {
      selectedRows.value = selectedRows.value.filter((i) => i !== index)
    } else {
      selectedRows.value = [...selectedRows.value, index]
    }
  }

  function selectAllFiltered() {
    selectedRows.value = filteredRows.value.map((_, i) => i)
  }

  function deselectAllFiltered() {
    selectedRows.value = []
  }

  function filterRows() {
    console.log('🔍 Ejecutando filterRows()')
  console.log('📋 Datos originales:', excelData.value.length)
  const input = searchValue.value.trim().toLowerCase()

  // Si hay búsqueda libre, usarla
  if (searchField.value && input) {
    const resultadoFiltrado = excelData.value.filter(row => {
      const value = row[searchField.value]?.toString().toLowerCase() || ''
      return value.includes(input)
    })

    filteredRows.value = resultadoFiltrado
    selectedRows.value = resultadoFiltrado.map((_, i) => i)
    searchActive.value = true
  } else {
    // Si no hay búsqueda libre, aplicar los filtros inteligentes
    filteredRows.value = applyAdvancedFilters(excelData.value)
    selectedRows.value = filteredRows.value.map((_, i) => i)
    searchActive.value = true
    console.log('✅ Resultados filtrados:', filteredRows.value.length)
  }
}

  function clearSearch() {
    searchField.value = ''
    searchValue.value = ''
    const allRows = paginatedRows.value.flat()
    filteredRows.value = allRows
    selectedRows.value = allRows.map((_, i) => i)
    searchActive.value = false
  }

  const rowsPerPage = 24
  const paginatedRows = computed(() => {
    const chunks = []
    for (let i = 0; i < excelData.value.length; i += rowsPerPage) {
      chunks.push(excelData.value.slice(i, i + rowsPerPage))
    }
    return chunks
  })

  const limitedChunk = computed(() => paginatedRows.value[0]?.slice(0, 8) ?? [])

  const showBackground = (index: number): boolean => {
    const hasFooter = !!images.value.footer
    const isLast = index === paginatedRows.value.length - 1
    return hasFooter && isLast ? false : !!images.value.background
  }

  function toggleFullscreen() {
    const el = previewRef.value
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) =>
        console.error(`Error entering fullscreen: ${err.message}`),
      )
    } else {
      document
        .exitFullscreen()
        .catch((err) => console.error(`Error exiting fullscreen: ${err.message}`))
    }
  }

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

  const titleBackgroundRgba = computed(() =>
    hexToRgba(colors.value.titleBackground, colors.value.titleAlpha),
  )

  const headerStyle = computed(() => ({
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(80px, 1fr))`,
    backgroundColor: computedColors.value.header,
    color: computedColors.value.headerText,
  }))

  const rowStyle = (ri: number) => ({
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(80px, 1fr))`,
    backgroundColor:
      ri % 2 === 0 ? computedColors.value.rowPrimary : computedColors.value.rowAlternate,
    color: computedColors.value.text,
    fontFamily: titleSettings.value.fieldFont,
    fontSize: titleSettings.value.fieldSize,
    textAlign: titleSettings.value.fieldAlign,
  })

  const cellStyle = computed(() => ({
    borderRight: colors.value.showBorders ? '1px solid #ccc' : 'none',
  }))

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

  const getXsrfToken = () => document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null
  const userId = ref<number | null>(null)

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const handleImageUpload = (e: Event, type: keyof typeof images.value) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null
    if (!file) return
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const maxSizeMB = 2

    if (!validTypes.includes(file.type)) {
      toast.error(`"${file.name}" is not a valid image type. Please, use JPG or PNG.`)
      ;(e.target as HTMLInputElement).value = ''
      return
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      toast.error(`"${file.name}" pesa ${sizeInMB}MB. Máximo permitido: ${maxSizeMB}MB.`)
      ;(e.target as HTMLInputElement).value = ''
      return
    }

    images.value[type] = file
  }

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
      filteredRows.value = excelData.value
      selectedRows.value = excelData.value.map((_, i) => i)
    } catch (err) {
      console.error('Error loading data:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

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
      formData.append(
        'style',
        JSON.stringify({
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
        }),
      )
      Object.entries(images.value).forEach(([key, file]) => {
        if (file) formData.append(key, file)
      })
      Object.entries(featuredImages.value).forEach(([key, file]) => {
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
    window.addEventListener('resize', () => (windowWidth.value = window.innerWidth))
    fetchTemplate()
    fetchUserId()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => (windowWidth.value = window.innerWidth))
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
    searchActive,
    filteredRows,
    selectedRows,
    previewRows,
    rowsPerPage,
    filterRows,
    selectAllFiltered,
    deselectAllFiltered,
    toggleRow,
    clearSearch,
    showBackground,
    handleImageUpload,
    sendToBackend,
    fetchTemplate,
    userId,
    fetchUserId,
    toggleFullscreen,
    previewRef,
    titleBackgroundRgba,
    featuredImages,
    stylePresets,
    handleSaveStyle,
    fetchStylePresets,
    applyStylePreset,
    deleteStylePreset,
  }
}
