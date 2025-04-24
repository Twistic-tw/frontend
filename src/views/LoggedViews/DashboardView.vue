<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Notification {
  catalog_name: string;
  file_path: string;
  fields_order: string | null;
  id_user: number;
  message: string;
  status: string;
}

const role = sessionStorage.getItem('userRole');
const userName = sessionStorage.getItem('userName');

const notifications = ref<Notification[]>([]);
const error = ref(false);
const loading = ref(true);

const fetchNotifications = async () => {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/ShowNotifications', {
      withCredentials: true
    });
    notifications.value = res.data.notifications || [];
  } catch (err) {
    console.error('Error al obtener notificaciones:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchNotifications);
</script>


<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">

    <!-- Welcome Title -->
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-800 mb-6 text-center">
      Welcome, {{userName}}!
    </h1>

    <!-- Main Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <!-- Create Catalogs Card (admin) -->
      <RouterLink to="/catalogs" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Create Catalogs</h2>
        <p class="text-gray-500 dark:text-gray-300">Create catalogs for your products.</p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Create Catalogs
        </button>
      </RouterLink>

      <!-- View Catalogs Card (client and admin) -->
      <RouterLink to="/catalogs" v-if="role && (role === 'client' || role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">View Catalogs</h2>
        <p class="text-gray-500 dark:text-gray-300">View all active catalogs on the platform.</p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          View Catalogs
        </button>
      </RouterLink>

      <!-- Template Operations Card (admin) -->
      <RouterLink to="/templates" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Template Operations</h2>
        <p class="text-gray-500 dark:text-gray-300">Create or delete templates for your catalogs.</p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Templates
        </button>
      </RouterLink>

      <!-- Fields Operations Card (admin) -->
      <RouterLink to="/fields" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Fields Operations</h2>
        <p class="text-gray-500 dark:text-gray-300">Create or delete fields for your templates.</p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Fields
        </button>
      </RouterLink>

      <!-- Notifications Card (client and admin) -->
      <RouterLink to="notifications" v-if="role && (role === 'client' || role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Manage Notifications</h2>
          <!-- Contador de notificaciones con animación -->
          <span
            v-if="notifications.length"
            class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 animate-bounce"
          >
            {{ notifications.length }}
          </span>
        </div>
        <p class="text-gray-500 dark:text-gray-300">Manage notifications for your catalogs.</p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Notifications
        </button>
      </RouterLink>

      <!-- Users Card (admin)-->
      <RouterLink to="users" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">User Operations</h2>
        <p class="text-gray-500 dark:text-gray-300">Create, modify or delete users for the platform.</p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Users
        </button>
      </RouterLink>

    </div>

  </div>
</template>


