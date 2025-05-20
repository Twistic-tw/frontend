// src/composables/useTemplateWithoutNotification.ts
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function NewCatalog() {
  const step = ref(1)
  const loading = ref(false)
  const excelHeaders = ref<string[]>([])
  const userId = ref<number | null>(null)
  const role = sessionStorage.getItem('userRole')
  const toast = useToast()

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
    if (!xsrfToken) return null

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
      toast('CSRF token or file missing.')
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
      form.value.selected_headers = excelHeaders.value.map((field) => ({
        name: field,
        active: false,
      }))
      nextStep()
    } catch (error) {
      console.error('Error analyzing the file:', error)
      toast('Error analyzing the file.')
    } finally {
      loading.value = false
    }
  }

  const submitForm = async () => {
    loading.value = true

    if (!userId.value) {
      await fetchUserId()
      if (!userId.value) {
        toast('User ID could not be fetched.')
        loading.value = false
        return
      }
    }

    const xsrfToken = getXsrfToken()
    if (!xsrfToken || !form.value.excel_file) {
      toast('Session expired or file missing.')
      loading.value = false
      return
    }

    const formData = new FormData()
    formData.append('file', form.value.excel_file)
    formData.append('template_name', form.value.catalog_name)
    formData.append('id_user', String(userId.value))
    formData.append('user_role', role || '')
    formData.append(
      'fields',
      JSON.stringify(
        form.value.selected_headers
          .filter((fieldObj) => fieldObj.active)
          .map((fieldObj, index) => ({
            field: fieldObj.name,
            active: true,
            order: index,
          })),
      ),
    )
    formData.append('message', form.value.message)

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/CreateTemplate`, formData, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        console.log('User role:', role)
        step.value = 6
      }
    } catch (error) {
      toast('Error creating the template. Contact support.')
      console.error('Error creating the template:', error)
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
    step.value = 1
  }

  const goToDashboard = () => {
    window.location.href = '/dashboard'
  }

  const goToTemplateChoice = () => {
    window.location.href = '/CatalogList'
  }

  onMounted(fetchUserId)

  return {
    role,
    step,
    loading,
    excelHeaders,
    userId,
    form,
    nextStep,
    prevStep,
    handleFileUpload,
    getXsrfToken,
    fetchUserId,
    analyzeExcel,
    submitForm,
    resetForm,
    goToDashboard,
    goToTemplateChoice
  }
}
