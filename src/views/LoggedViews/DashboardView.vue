<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
const userId = ref<number>(0);

const allNotifications = ref<Notification[]>([]);
const error = ref(false);
const loading = ref(true);

// Notificaciones filtradas dinámicamente según rol
const notifications = computed(() => {
  if (role === 'admin') return allNotifications.value;
  return allNotifications.value.filter(n => n.id_user === userId.value);
});

// Contador para el bloque "Create Catalogs" (solo "In Progress")
const inProgressCount = computed(() =>
  notifications.value.filter(n => n.status === 'In Progress').length
);

// Obtener token XSRF
const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
};

// Obtener usuario autenticado
const fetchUserId = async () => {
  const xsrfToken = getXsrfToken();
  if (!xsrfToken) return;

  try {
    const response = await axios.get(`${import.meta.env.VITE_URL}/user`, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json',
      },
      withCredentials: true,
    });
    userId.value = response.data.user.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    userId.value = 0;
  }
};

// Carga inicial de notificaciones
const fetchNotifications = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/ShowNotifications`, {
      withCredentials: true
    });
    allNotifications.value = res.data.notifications || [];
  } catch (err) {
    console.error('Error al obtener notificaciones:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// Al montar el componente
onMounted(async () => {
  await fetchUserId();
  await fetchNotifications();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">

    <!-- Welcome Title -->
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-800 mb-6 text-center">
      Welcome, {{userName}}!
    </h1>

    <!-- Main Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <!-- Create Template Card (client and admin) -->
      <RouterLink
        to="/newTemplate"
        v-if="role && (role === 'client' || role === 'admin')"
        class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <!-- Contenedor de texto -->
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">Create Template</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">Create template for your catalog.</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
            Create Template
          </button>
        </div>

        <!-- Imagen a la derecha -->
        <img src="/public/createTemplate.png" alt="Create Template" class="w-24 h-24 object-contain">
      </RouterLink>


      <!-- Create Catalogs Card (admin) -->
      <RouterLink
        to="/catalogList"
        v-if="role && (role === 'client' || role === 'admin')"
        class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <!-- Contenido izquierdo: texto y contador -->
        <div class="flex-1 pr-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Create Catalogs</h2>
            <span
              v-if="inProgressCount > 0"
              class="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full ml-2 animate-bounce"
            >
              {{ inProgressCount }}
            </span>
          </div>
          <p class="text-gray-500 dark:text-gray-300 mb-4">Create pdf catalogs for your products.</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
            Create Pdf Catalog
          </button>
        </div>

        <!-- Imagen derecha -->
        <img src="/public/createCatalog.png" alt="Create Catalogs" class="w-24 h-24 object-contain">
      </RouterLink>


      <!-- View Catalogs Card (client and admin) -->
      <RouterLink
        to="/catalogs"
        v-if="role && (role === 'client' || role === 'admin')"
        class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <!-- Contenido de texto -->
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">View Catalogs</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">View all active catalogs on the platform.</p>
          <button class="bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
            View Catalogs
          </button>
        </div>

        <!-- Imagen -->
        <img src="/public/viewCatalog.png" alt="View Catalogs" class="w-24 h-24 object-contain">
      </RouterLink>

      <!-- Template Operations Card (admin) -->
      <RouterLink
        to="/templates"
        v-if="role && (role === 'admin')"
        class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <!-- Contenido textual -->
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">Template Operations</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">Create or delete templates for your catalogs.</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
            Manage Templates
          </button>
        </div>

        <!-- Imagen del icono -->
        <img src="/public/templateOperations.png" alt="Template Operations" class="w-24 h-24 object-contain">
      </RouterLink>


      <!-- Fields Operations Card (admin) -->
      <RouterLink to="/fields" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Fields Operations</h2>
        <p class="text-gray-500 dark:text-gray-300">Create or delete fields for your templates.</p>
        <button class="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Fields
        </button>
      </RouterLink>

      <!-- Notifications Card (client and admin) -->
      <RouterLink to="notifications" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Manage Notifications</h2>
          <!-- Contador de notificaciones con animación -->
          <span
          v-if="notifications.length && role === 'admin'"
          class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 animate-bounce"
        >
          {{ notifications.length }}
        </span>
        </div>
        <p class="text-gray-500 dark:text-gray-300">Manage notifications for your catalogs.</p>
        <button class="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Notifications
        </button>
      </RouterLink>

      <!-- Users Card (admin)-->
      <RouterLink to="users" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">User Operations</h2>
        <p class="text-gray-500 dark:text-gray-300">Create, modify or delete users for the platform.</p>
        <button class="mt-4 inline-block bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Manage Users
        </button>
      </RouterLink>

    </div>

  </div>
</template>


