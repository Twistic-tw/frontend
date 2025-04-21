<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

interface Notification {
  catalog_name: string
  file_path: string
  fields_order: string | null
  id_user: number
  message: string
  status: string
}

export default defineComponent({
  name: 'NotificationCenter',
  setup() {
    const notifications = ref<Notification[]>([])
    const loading = ref(true)
    const error = ref(false)

    const fetchNotifications = async () => {
      try {
        const res = await axios.get('https://api-catalogos.twistic.app/api/ShowNotifications', {
          withCredentials: true
        })
        notifications.value = res.data.notifications
      } catch (err) {
        console.error(err)
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const parseFields = (jsonStr: string | null): string => {
      try {
        if (!jsonStr) return '-'
        const fields = JSON.parse(jsonStr)
        return Array.isArray(fields) ? fields.join(', ') : '-'
      } catch {
        return '-'
      }
    }

    onMounted(fetchNotifications)

    return {
      notifications,
      loading,
      error,
      parseFields
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6 mt-14">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
      Notificaciones
    </h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
      Cargando notificaciones...
    </div>

    <div v-else-if="!notifications.length" class="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-gray-700 dark:text-gray-200">
      No hay notificaciones disponibles.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="noti in notifications"
        :key="noti.catalog_name + noti.message"
        class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          {{ noti.catalog_name }}
        </h2>

        <p class="text-gray-600 dark:text-gray-300 mb-1">
          <strong>Ruta del archivo:</strong> {{ noti.file_path }}
        </p>

        <p class="text-gray-600 dark:text-gray-300 mb-1">
          <strong>Orden de campos:</strong> {{ parseFields(noti.fields_order) }}
        </p>

        <p class="text-gray-600 dark:text-gray-300 mb-1">
          <strong>ID del usuario:</strong> {{ noti.id_user }}
        </p>

        <p class="text-gray-600 dark:text-gray-300 mb-1">
          <strong>Mensaje:</strong> {{ noti.message }}
        </p>

        <p class="text-sm font-medium mt-2 text-white px-2 py-1 rounded w-fit"
           :class="{
             'bg-green-600': noti.status === 'Finalizada',
             'bg-yellow-500': noti.status === 'Pendiente',
             'bg-blue-500': noti.status === 'En proceso'
           }">
          {{ noti.status }}
        </p>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      Ocurrió un error al cargar las notificaciones.
    </div>
  </div>
</template>

