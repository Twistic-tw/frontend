<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BackButton from '@/components/BackButton.vue';

interface Notification {
  id_template: number;
  catalog_name: string;
  status: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

const userId = ref<number>(0);
const approvedTemplates = ref<Notification[]>([]);
const loading = ref(true);
const error = ref(false);

// Obtener token XSRF
const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
};

// Obtener el usuario autenticado
const fetchUserId = async () => {
  try {
    const xsrfToken = getXsrfToken();
    const res = await axios.get(`${import.meta.env.VITE_URL}/user`, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json',
      },
      withCredentials: true,
    });
    userId.value = res.data.user.id;
  } catch (err) {
    console.error('Error fetching user:', err);
    error.value = true;
  }
};

// Obtener las plantillas aprobadas (In Progress)
const fetchApprovedTemplates = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/aprovedNotifications`, {
      withCredentials: true
    });
    approvedTemplates.value = res.data.notifications;
  } catch (err) {
    console.error('Error fetching approved notifications:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// Formatear fechas
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


onMounted(async () => {
  await fetchUserId();
  await fetchApprovedTemplates();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Select a Template to Create Your PDF</h1>

    <div v-if="loading" class="text-center text-gray-600">Loading templates...</div>
    <div v-if="error" class="text-center text-red-600">Failed to load templates.</div>

    <div v-else-if="approvedTemplates.length === 0" class="text-center text-gray-600">
      No approved templates available.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <RouterLink
        v-for="template in approvedTemplates"
        :key="template.id_template"
        :to="`/customizePdf/${template.id_template}`"
        class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <!-- Contenido de texto -->
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">{{ template.catalog_name }}</h2>
          <p class="text-sm text-gray-500 mb-1">Creado: {{ formatDate(template.created_at) }}</p>
          <p class="text-sm text-gray-500 mb-4">Actualizado: {{ formatDate(template.updated_at) }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            Customize PDF
          </button>
        </div>

        <!-- Imagen -->
        <img src="/viewCatalog.png" alt="View Catalog" class="w-24 h-24 object-contain" />
      </RouterLink>

    </div>
    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
</template>


