<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BackButton from '@/components/BackButton.vue';

interface Notification {
  id_template: number;
  catalog_name: string;
  status: string;
  id_user: number;
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
        class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">{{ template.catalog_name }}</h2>
        <p class="text-gray-500 dark:text-gray-300 mb-4">Status: <span class="font-semibold text-yellow-500">{{ template.status }}</span></p>
        <button class="mt-4 inline-block bg-[#4f39f6] text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-[#3a2ac9]">
          Customize PDF
        </button>
      </RouterLink>
    </div>
    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
</template>


