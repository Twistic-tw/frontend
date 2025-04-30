<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

interface Notification {
  id: number
  catalog_name: string
  file_path: string
  fields_order: string | null
  id_user: number
  message: string
  status: string
  created_at: string
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

    const approveNotification = async (id: number) => {
      try {
        await axios.post(`https://api-catalogos.twistic.app/api/ReadNotification/${id}`, {}, {
          withCredentials: true
        });
        notifications.value = notifications.value.map(n =>
          n.id === id ? { ...n, status: 'approve' } : n
        );
      } catch (error) {
        console.error('Error approving notification:', error);
        alert('Error approving notification.');
      }
    };


    const parseFields = (jsonStr: string | null): string => {
      try {
        if (!jsonStr) return '-'
        const fields = JSON.parse(jsonStr)
        return Array.isArray(fields) ? fields.join(', ') : '-'
      } catch {
        return '-'
      }
    }

    const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }


    onMounted(fetchNotifications)

    return {
      notifications,
      loading,
      error,
      parseFields,
      formatDate,
      approveNotification
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4">
    <h1 class="text-3xl font-bold text-[#0F172A] mb-6 text-center">
      Notifications
    </h1>

    <div v-if="loading" class="text-center text-[#334155]">
      Loading notifications...
    </div>

    <div v-else-if="!notifications.length" class="text-center bg-white p-6 rounded-2xl shadow-md text-[#334155]">
      No notifications available.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="noti in notifications"
        :key="noti.catalog_name + noti.message"
        class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold text-indigo-600 mb-2">
          {{ noti.catalog_name }}
        </h2>

        <p class="text-[#334155] dark:text-white mb-1">
          <strong>File path:</strong> {{ noti.file_path }}
        </p>

        <p class="text-[#334155] dark:text-white mb-1">
          <strong>Fields order:</strong> {{ parseFields(noti.fields_order) }}
        </p>

        <p class="text-[#334155] dark:text-white mb-1">
          <strong>User ID:</strong> {{ noti.id_user }}
        </p>

        <p class="text-[#334155] dark:text-white mb-1">
          <strong>Created date:</strong> {{ formatDate(noti.created_at) }}
        </p>

        <p class="text-[#334155] dark:text-white mb-1">
          <strong>Message:</strong> {{ noti.message }}
        </p>

        <h2
          class="font-medium mt-2 text-white px-2 py-1 rounded w-fit" :class="{
            'bg-[#10B981]': noti.status === 'Completed',
            'bg-[#F59E0B]': noti.status === 'Pending',
            'bg-[#3B82F6]': noti.status === 'In Progress'
          }"
        >
          {{ noti.status }}
        </h2>
        <button
          v-if="noti.status === 'Pending'"
          @click="approveNotification(noti.id)"
          class="mt-3 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded shadow"
        >
         Approve
        </button>

      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      An error occurred while loading notifications.
    </div>
  </div>
</template>



