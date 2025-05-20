import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function newTemplate() {
  const toast = useToast()
  const step = ref(1)
  const loading = ref(false)
  const excelHeaders = ref<string[]>([])
  const userId = ref<number | null>(null)
  const role = sessionStorage.getItem('userRole')
  const filePath = ref<string>('')

  const form = ref({
    catalog_name: '',
    excel_file: null as File | null,
    selected_headers: [] as { name: string; active: boolean }[],
    message: '',
  })

  const nextStep = () => step.value++
  const prevStep = () => step.value--

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      form.value.excel_file = target.files[0]
    }
  }

  const getXsrfToken = (): string | null => {
    return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null
  }

  const fetchUserId = async () => {
    const xsrfToken = getXsrfToken()
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
      console.error('Error fetching user ID:', error)
      userId.value = null
    }
  }

  const analyzeExcel = async () => {
    loading.value = true

    const xsrfToken = getXsrfToken()
    if (!xsrfToken || !form.value.excel_file) {
      toast.error('CSRF token or file missing.')
      loading.value = false
      return
    }

    const formData = new FormData()
    formData.append('file', form.value.excel_file)

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/excelscan`, formData, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
        withCredentials: true,
      })

      excelHeaders.value = response.data.fields
      filePath.value = response.data.file_path
      form.value.selected_headers = excelHeaders.value.map((field) => ({
        name: field.trim(),
        active: true,
      }))

      nextStep()
    } catch (error) {
      console.error('Error analyzing or uploading the file:', error)
      toast.error('Error analizando o subiendo el archivo.')
    } finally {
      loading.value = false
    }
  }

  const submitForm = async () => {
    if (!userId.value) {
      await fetchUserId()
      if (!userId.value) {
        toast.error('User ID could not be fetched.')
        loading.value = false
        return
      }
    }

    const xsrfToken = getXsrfToken()
    if (!xsrfToken || !form.value.excel_file) {
      toast.error('Session expired or file missing.')
      loading.value = false
      return
    }

    const formData = new FormData()
    formData.append('file', form.value.excel_file)
    formData.append('template_name', form.value.catalog_name)
    formData.append('id_user', String(userId.value))
    formData.append('message', form.value.message || 'Solicitud de creación de plantilla')
    formData.append('user_role', role || '')

    const selectedFields = form.value.selected_headers
      .filter((field) => field.active)
      .map((field, index) => ({
        field: field.name,
        active: true,
        order: index,
      }))
    formData.append('fields', JSON.stringify(selectedFields))

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/CreateTemplateWithNotification`,
        formData,
        {
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )

      if (response.status === 200) {
        step.value = 6
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data)
        toast.error('Error creating the template.')
      } else {
        console.error('Unexpected error:', error)
        toast.error('An unexpected error occurred.')
      }
    } finally {
      loading.value = false
    }
  }

  const resetForm = () => {
    form.value = {
      catalog_name: '',
      excel_file: null,
      selected_headers: [],
      message: '',
    }
    excelHeaders.value = []
    filePath.value = ''
    step.value = 1
  }

  const goToDashboard = () => {
    window.location.href = '/dashboard'
  }

  const goToTemplateSelection = () => {
    window.location.href = '/catalogList'
  }

  onMounted(fetchUserId)

  return {
    role,
    step,
    loading,
    form,
    excelHeaders,
    filePath,
    handleFileUpload,
    analyzeExcel,
    submitForm,
    resetForm,
    nextStep,
    prevStep,
    goToDashboard,
    goToTemplateSelection
  }
}
