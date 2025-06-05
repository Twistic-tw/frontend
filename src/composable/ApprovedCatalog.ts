import { ref, onMounted } from 'vue'
import axios from 'axios'

export interface Notification {
  id_template: number
  catalog_name: string
  status: string
  id_user: number
  created_at: string
  updated_at: string
}

export function ApprovedCatalog() {
  // Obtenemos el ID del usuario directamente desde sessionStorage
  const userId = ref<number>(parseInt(sessionStorage.getItem('userId') || '0'))

  const approvedTemplates = ref<Notification[]>([])
  const loading = ref(true)
  const error = ref(false)

  // Estado para duplicar con nombre personalizado
  const showDuplicateModal = ref(false)
  const templateToDuplicate = ref<Notification | null>(null)
  const duplicateName = ref('')

  const fetchApprovedTemplates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/aprovedNotifications`, {
        withCredentials: true,
      })
      approvedTemplates.value = res.data.notifications
    } catch (err) {
      console.error('Error fetching approved notifications:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const openDuplicateModal = (template: Notification) => {
    templateToDuplicate.value = template
    duplicateName.value = `${template.catalog_name} (copy)`
    showDuplicateModal.value = true
  }

  const confirmDuplicate = async () => {
    if (!templateToDuplicate.value) return

    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/templates/${templateToDuplicate.value.id_template}/duplicate`,
        { name: duplicateName.value },
        { withCredentials: true }
      )

      await fetchApprovedTemplates()
      showDuplicateModal.value = false
    } catch (err) {
      console.error('Error duplicating template:', err)
    }
  }

  const duplicateTemplate = async (id: number) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL}/templates/${id}/duplicate`, {}, {
        withCredentials: true
      })
      await fetchApprovedTemplates()
    } catch (err) {
      console.error(err)
    }
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  // Solo obtenemos notificaciones aprobadas, sin llamar a /user
  onMounted(async () => {
    fetchApprovedTemplates()
  })

  return {
    userId,
    approvedTemplates,
    loading,
    error,
    formatDate,
    duplicateTemplate,
    showDuplicateModal,
    templateToDuplicate,
    duplicateName,
    openDuplicateModal,
    confirmDuplicate
  }
}
