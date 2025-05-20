import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'

export function Logout() {
  const router = useRouter()

  function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_URL}/closesession`, {}, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || ''
        }
      })

      sessionStorage.clear()
      localStorage.clear()

      document.cookie.split(";").forEach(c => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
      })

      delete axios.defaults.headers.common['Authorization']
      delete axios.defaults.baseURL

      window.location.href = '/'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al cerrar sesión', error.response ? error.response.data : error)
      await router.push('/')
    }
  }

  onMounted(logout)

  return {
    logout
  }
}
