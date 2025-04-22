<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const loading = ref(true)
const error = ref(false)

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://api-catalogos.twistic.app/api/users', { withCredentials: true })
    users.value = response.data.users
  } catch (e) {
    console.error('Error fetching users:', e)
    error.value = true
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString()

onMounted(fetchUsers)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6 mt-14">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">User Management</h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
      Loading users...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{{ user.nombre }}</h2>
          <p class="text-gray-600 dark:text-gray-300"><span class="font-medium text-gray-700 dark:text-gray-200">Email:</span> {{ user.email }}</p>
          <p class="text-gray-600 dark:text-gray-300"><span class="font-medium text-gray-700 dark:text-gray-200">Role:</span> {{ user.cargo }}</p>
          <p class="text-gray-600 dark:text-gray-300"><span class="font-medium text-gray-700 dark:text-gray-200">Registered:</span> {{ formatDate(user.created_at) }}</p>
        </div>
        <div class="mt-4 flex justify-between">
          <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Edit</button>
          <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      Failed to load users.
    </div>
  </div>
</template>

