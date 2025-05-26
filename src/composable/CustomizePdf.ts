import { ref, computed, onMounted, onUnmounted, watch, type CSSProperties } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function CustomizePdf() {
  const route = useRoute()
  const templateId = route.params.id as string
  const toast = useToast()
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
  })

  const titleSettings = ref({
    size: '2rem',
    align: 'center' as 'left' | 'center' | 'right',
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

  const coverUrl = ref('')
  const secondUrl = ref('')
  const headerUrl = ref('')
  const backgroundUrl = ref('')
  const footerUrl = ref('')

  watch(() => images.value.cover, (file) => {
    coverUrl.value = file ? URL.createObjectURL(file) : ''
  })
  watch(() => images.value.second, (file) => {
    secondUrl.value = file ? URL.createObjectURL(file) : ''
  })
  watch(() => images.value.header, (file) => {
    headerUrl.value = file ? URL.createObjectURL(file) : ''
  })
  watch(() => images.value.background, (file) => {
    backgroundUrl.value = file ? URL.createObjectURL(file) : ''
  })
  watch(() => images.value.footer, (file) => {
    footerUrl.value = file ? URL.createObjectURL(file) : ''
  })

  const searchField = ref('')
  const searchValue = ref('')
  const searchActive = ref(false)
  const filteredRows = ref<Record<string, string>[]>([])
  const selectedRows = ref<Set<number>>(new Set())
  const previewRows = computed(() => {
    const selected = excelData.value.filter((_, i) => selectedRows.value.has(i));
    const pages = []
    for (let i = 0; i < selected.length; i += rowsPerPage) {
      pages.push(selected.slice(i, i + rowsPerPage))
    }
    return pages
  })

  function toggleFullscreen() {
    const el = previewRef.value
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => {
        console.error(`Error entering fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen().catch(err => {
        console.error(`Error exiting fullscreen: ${err.message}`)
      })
    }
  }

  function filterRows() {
  const field = searchField.value
  const input = searchValue.value.trim().toLowerCase()
  console.log('Campo:', searchField.value, 'Valor:', searchValue.value)

  if (!field || !input) {
    filteredRows.value = [...excelData.value]
    selectedRows.value = new Set(filteredRows.value.map((_, i) => i))
    searchActive.value = false
    return
  }

  const queries = input.split(',').map((s) => s.trim()).filter(Boolean)

  const resultadoFiltrado: Record<string, string>[] = []
  const nuevaSeleccion = new Set<number>()

  excelData.value.forEach((row, index) => {
    const rawValue = row[field]
    const value = rawValue?.toString().toLowerCase()
    if (!value) return

    const coincide = queries.some((query) => {
      // Rango: 10..50
      if (query.includes('..')) {
        const [min, max] = query.split('..').map((v) => v.trim())
        const numVal = parseFloat(value)
        const isNumRange = !isNaN(parseFloat(min)) && !isNaN(parseFloat(max))
        if (isNumRange) return numVal >= parseFloat(min) && numVal <= parseFloat(max)
        return value >= min && value <= max
      }

      // Operadores
      const match = query.match(/^(>=|<=|!=|>|<|=)(.+)$/)
      if (match) {
        const operator = match[1]
        const target = match[2].trim()
        const numValue = parseFloat(value)
        const numTarget = parseFloat(target)
        switch (operator) {
          case '>': return numValue > numTarget
          case '<': return numValue < numTarget
          case '>=': return numValue >= numTarget
          case '<=': return numValue <= numTarget
          case '=': return value === target
          case '!=': return value !== target
        }
      }

      // Comodines
      if (query.startsWith('*') && query.endsWith('*')) return value.includes(query.slice(1, -1))
      if (query.startsWith('*')) return value.endsWith(query.slice(1))
      if (query.endsWith('*')) return value.startsWith(query.slice(0, -1))

      return value.includes(query)
    })

    if (coincide) {
      resultadoFiltrado.push(row)
      nuevaSeleccion.add(index)
    }
  })

  filteredRows.value = resultadoFiltrado
  selectedRows.value = nuevaSeleccion
  searchActive.value = true
}


  function selectAllFiltered() {
    filteredRows.value.forEach((_, index) => {
      selectedRows.value.add(index)
    })
  }

  function deselectAllFiltered() {
    filteredRows.value.forEach((_, index) => {
      selectedRows.value.delete(index)
    })
  }

  function toggleRow(index: number) {
    if (selectedRows.value.has(index)) {
      selectedRows.value.delete(index)
    } else {
      selectedRows.value.add(index)
    }
  }

  function clearSearch() {
    searchField.value = ''
    searchValue.value = ''
    selectedRows.value.clear()
    const allRows = paginatedRows.value.flat()
    filteredRows.value = allRows
    selectedRows.value = new Set(allRows.map((_, i) => i))
    searchActive.value = false
  }

  const getXsrfToken = () => document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null
  const userId = ref<number | null>(null)

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
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

  const headerStyle = computed<Record<string, string>>(() => ({
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(80px, 1fr))`,
    backgroundColor: computedColors.value.header,
    color: computedColors.value.headerText,
  }))

  const rowStyle = (ri: number): Record<string, string> => ({
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

  const rowsPerPage = 14
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
      toast.error(`"${file.name}" weighs ${sizeInMB}MB. Maximum allowed: ${maxSizeMB}MB.`)
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
      selectedRows.value = new Set(excelData.value.map((_, i) => i))
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
    window.addEventListener('resize', () => (windowWidth.value = window.innerWidth))
    fetchTemplate()
    fetchUserId()
    watch(() => excelData.value, (data) => {
      filteredRows.value = data
      selectedRows.value = new Set(data.map((_, i) => i))
    }, { immediate: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => (windowWidth.value = window.innerWidth))
  })

  return {
    templateName, fields, colors, titleSettings, images,
    coverUrl, secondUrl, headerUrl, backgroundUrl, footerUrl,
    excelData, activeFieldNames, loading, error, generating,
    windowWidth, computedColors, headerStyle, rowStyle, cellStyle, footerStyle,
    paginatedRows, limitedChunk, searchField, searchValue, searchActive,
    filteredRows, selectedRows, previewRows,
    filterRows, selectAllFiltered, deselectAllFiltered, toggleRow, clearSearch,
    showBackground, handleImageUpload, sendToBackend,
    fetchTemplate, userId, fetchUserId, toggleFullscreen,
    previewRef
  }
}
