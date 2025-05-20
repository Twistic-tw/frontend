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

  const coverUrl = computed(() => images.value.cover ? URL.createObjectURL(images.value.cover) : '')
  const secondUrl = computed(() => images.value.second ? URL.createObjectURL(images.value.second) : '')
  const headerUrl = computed(() => images.value.header ? URL.createObjectURL(images.value.header) : '')
  const backgroundUrl = computed(() => images.value.background ? URL.createObjectURL(images.value.background) : '')
  const footerUrl = computed(() => images.value.footer ? URL.createObjectURL(images.value.footer) : '')

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
    backgroundColor: computedColors.value.header,
    color: computedColors.value.headerText,
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
  }))

  const rowStyle = (ri: number): Record<string, string> => ({
    gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
    backgroundColor: ri % 2 === 0 ? computedColors.value.rowPrimary : computedColors.value.rowAlternate,
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

  const rowsPerPage = 25
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

      console.log('FormData:', formData)

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
    } catch (err) {
  if (axios.isAxiosError(err) && err.response && err.response.data instanceof Blob) {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const text = reader.result as string
        const json = JSON.parse(text)
        console.error('📄 Error desde el backend (detalle):', json)
        toast.error(json.message || 'Error interno del servidor.')
      } catch (parseError) {
        console.error('❌ No se pudo parsear el error:', reader.result)
        toast.error('Error interno inesperado.')
      }
    }

    reader.readAsText(err.response.data)
  } else {
    console.error('Error inesperado:', err)
    toast.error('Error al generar el PDF.')
  }
}

  onMounted(() => {
    window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
    fetchTemplate()
    fetchUserId()
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
    showBackground,
    handleImageUpload,
    sendToBackend,
    fetchTemplate,
    userId,
    fetchUserId
  }
}

