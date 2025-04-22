<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

// Interfaz del usuario
interface User {
  active_catalogos: number
  nombre: string
  email: string
  cargo: string
  created_at: string
}

// Función para extraer una cookie por nombre
function getCookie(name: string): string {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '')
  return ''
}

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const user = ref<User | null>(null)
    const loading = ref(true)
    const error = ref(false)

    const fetchUser = async () => {
      try {
        const xsrfToken = getCookie('XSRF-TOKEN')

        const response = await axios.get<User>('https://api-catalogos.twistic.app/api/user', {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': xsrfToken,
            Accept: 'application/json'
          }
        })

        user.value = response.data
      } catch (err: unknown) {
        console.error('🔴 [AUTH] Error al obtener el usuario');
        if (axios.isAxiosError(err) && err.response) {
          console.error('🔸 Status:', err.response.status);
          console.error('🔸 Mensaje:', err.response.data.message || 'Sin mensaje');
          console.error('🔸 Data completa:', err.response.data);
        } else if (err instanceof Error) {
          console.error('🔸 Error JS:', err.message);
        } else {
          console.error('🔸 Error desconocido');
        }
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateStr: string): string => {
      return new Date(dateStr).toLocaleString()
    }

    onMounted(fetchUser)

    return {
      user,
      loading,
      error,
      formatDate
    }
  }
})
</script>


<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6 mt-14">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
      Perfil de Usuario
    </h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
      Cargando datos de usuario...
    </div>

    <div v-else-if="!user" class="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-gray-700 dark:text-gray-200">
      No se ha encontrado información de usuario.
    </div>

    <div v-else class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Nombre</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.nombre }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Email</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.email }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Cargo</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.cargo }}</p>
      </div>
      <div class="mb-4"></div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Catálogos activos</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.active_catalogos }}</p>
      </div>
      <div class="mb-4"></div>
      <div>
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Fecha de registro</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ formatDate(user.created_at) }}</p>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      Ha ocurrido un error al cargar los datos del usuario.
    </div>
  </div>
</template>
