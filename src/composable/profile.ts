import { ref, onMounted } from 'vue'
import axios from 'axios'

export interface User {
  active_catalogos: number
  nombre: string
  email: string
  cargo: string
  created_at: string
}

function getCookie(name: string): string {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '')
  return ''
}

export function useUserProfile() {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref(false)

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleString()
  }

  const fetchUser = async () => {
    try {
      const xsrfToken = getCookie('XSRF-TOKEN')

      const response = await axios.get(`${import.meta.env.VITE_URL}/user`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': xsrfToken,
          Accept: 'application/json',
        },
      })

      const userData = response.data.user

      const countResponse = await axios.get(`${import.meta.env.VITE_URL}/CountCatalogs`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': xsrfToken,
          Accept: 'application/json',
        },
      })

      const activeCatalogs = countResponse.data.count ?? 0

      user.value = {
        ...userData,
        active_catalogos: activeCatalogs,
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Status:', err.response.status)
        console.error('Mensaje:', err.response.data.message || 'Sin mensaje')
        console.error('Data completa:', err.response.data)
      } else if (err instanceof Error) {
        console.error('Error JS:', err.message)
      } else {
        console.error('Error desconocido')
      }
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchUser)

  return {
    user,
    loading,
    error,
    formatDate,
  }
}
