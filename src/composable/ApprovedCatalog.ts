// src/composable/ApprovedCatalog.ts
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

// Tipado de la notificación aprobada
export interface Notification {
  id_template: number
  catalog_name: string
  status: string
  id_user: number
  created_at: string
  updated_at: string
}

export function ApprovedCatalog() {
  // Obtenemos el ID del usuario desde sessionStorage
  const userId = ref<number>(parseInt(sessionStorage.getItem('userId') || '0'))

  // Estado principal
  const approvedTemplates = ref<Notification[]>([])
  const loading = ref(true)
  const error = ref(false)

  // Estado del modal para duplicar
  const showDuplicateModal = ref(false)
  const templateToDuplicate = ref<Notification | null>(null)
  const duplicateName = ref('')

  // Obtiene las notificaciones aprobadas
  const fetchApprovedTemplates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/aprovedNotifications`, {
        withCredentials: true,
      })

      console.log('Respuesta del servidor (aprobados):', res.data.notifications)

      // Prevención en caso de que no sea un array válido
      approvedTemplates.value = Array.isArray(res.data.notifications)
        ? res.data.notifications
        : []
    } catch (err) {
      console.error('Error fetching approved notifications:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  // Abre el modal de duplicar plantilla
  const openDuplicateModal = (template: Notification) => {
    templateToDuplicate.value = template
    duplicateName.value = `${template.catalog_name} (copy)`
    showDuplicateModal.value = true
  }

  // Confirma duplicación con nombre personalizado
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

  // Versión simple para duplicar directamente sin modal
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

  // Formatea fechas en formato legible
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  // Montamos la vista y esperamos la carga
  onMounted(async () => {
    await fetchApprovedTemplates()
  })

  // Limpiamos estados si se desmonta el componente
  onBeforeUnmount(() => {
    showDuplicateModal.value = false
    templateToDuplicate.value = null
    duplicateName.value = ''
  })

  // Exportamos las propiedades y funciones
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
