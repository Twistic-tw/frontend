<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

interface User {
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

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const user = ref<User | null>(null)
    const loading = ref(true)
    const error = ref(false)

    const fetchUser = async () => {
      try {
        const xsrfToken = getCookie('XSRF-TOKEN')

        const response = await axios.get('https://api-catalogos.twistic.app/api/user', {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': xsrfToken,
            Accept: 'application/json'
          }
        })

        user.value = response.data.user // CORREGIDO AQUÍ
      } catch (err: unknown) {
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
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-800 mb-6 text-center">
      User Profile
    </h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
      Loading user data...
    </div>

    <div v-else-if="!user" class="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-gray-700 dark:text-gray-200">
      No user information found.
    </div>

    <div v-else class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Name</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.nombre }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Email</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.email }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Role</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.cargo }}</p>
      </div>
      <div class="mb-4"></div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Active catalogs</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.active_catalogos }}</p>
      </div>
      <div class="mb-4"></div>
      <div>
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Registration date</h2>
        <p class="text-gray-700 dark:text-gray-200">{{ formatDate(user.created_at) }}</p>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      An error occurred while loading user data.
    </div>
  </div>
</template>
