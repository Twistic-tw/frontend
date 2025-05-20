// src/composables/useNotificationsDashboard.ts
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export function Dashboard() {
  const role = sessionStorage.getItem('userRole')
  const userName = sessionStorage.getItem('userName')
  const userId = ref<number>(0)

  const allNotifications = ref<Notification[]>([])
  const error = ref(false)
  const loading = ref(true)

  interface Notification {
    catalog_name: string
    file_path: string
    fields_order: string | null
    id_user: number
    message: string
    status: string
  }

  const pendingCount = computed(() =>
    allNotifications.value.filter(n => n.status === 'Pending' && (role === 'admin' || n.id_user === userId.value)).length
  )

  const inProgressCount = computed(() =>
    allNotifications.value.filter(n => n.status === 'In Progress' && (role === 'admin' || n.id_user === userId.value)).length
  )

  const getXsrfToken = (): string | null => {
    return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null
  }

  const fetchUserId = async () => {
    const xsrfToken = getXsrfToken()
    if (!xsrfToken) return

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/user`, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json',
        },
        withCredentials: true,
      })
      userId.value = response.data.user.id
    } catch (error) {
      console.error('Error fetching user ID:', error)
      userId.value = 0
    }
  }

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/ShowNotifications`, {
        withCredentials: true
      })

      allNotifications.value = res.data.notifications || []

    } catch (err) {
      console.error('Error al obtener notificaciones:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await fetchUserId()
    await fetchNotifications()
  })

  return {
    role,
    userName,
    userId,
    allNotifications,
    error,
    loading,
    pendingCount,
    inProgressCount,
    fetchNotifications,
    fetchUserId
  }
}
