import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export function Login() {
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref<null | string>(null)
  const router = useRouter()

  const logUser = async () => {
    error.value = null
    loading.value = true

    try {
      await axios.get(`${import.meta.env.VITE_SANCTUM_URL}/sanctum/csrf-cookie`, {
        withCredentials: true
      })

      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
      if (!xsrfToken) {
        throw new Error('No se encontró el token CSRF')
      }

      const response = await axios.post(`${import.meta.env.VITE_URL}/loginProcess`,
        {
          email: email.value,
          password: password.value
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken)
          }
        }
      )

      if (response.status === 200) {
        let userRole = response.data.user_rol[0] || 'client'

        switch (userRole) {
          case 'ROLE_ADMINISTRATOR':
            userRole = 'admin'
            break
          default:
            userRole = 'client'
            break
        }

        sessionStorage.setItem('userRole', userRole)
        sessionStorage.setItem('userName', response.data.nombre)
        sessionStorage.setItem('userEmail', response.data.email)

        router.push('/dashboard')
      } else {
        error.value = 'Error inesperado'
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        error.value = 'Credenciales incorrectas'
      } else if (err.response?.status === 419) {
        error.value = 'Token CSRF inválido o caducado'
      } else {
        error.value = 'Error de conexión'
      }
      console.error(error.value, err)
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    loading,
    error,
    logUser
  }
}
