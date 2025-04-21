<script lang="ts">
import axios from 'axios';

export default {
  name: 'NotificationCenter',
  data() {
    return {
      notifications: [],
      loading: true,
      error: false,
    };
  },
  methods: {
    cargarNotificaciones() {
      axios
        .get('https://api-catalogos.twistic.app/api/ShowNotifications', {
          withCredentials: true,
        })
        .then((response) => {
          this.notificaciones = response.data;
        })
        .catch((error) => {
          console.error('Error al cargar notificaciones:', error);
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatdate(fecha) {
      if (!fecha) return '';
      return new Date(fecha).toLocaleString();
    },
  },
  mounted() {
    this.cargarNotificaciones();
  },
};
</script>
<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6 mt-12">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
      Tus Notificaciones
    </h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
      Cargando notificaciones...
    </div>

    <div v-else-if="notifications.length === 0" class="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-gray-700 dark:text-gray-200">
      No tienes notificaciones.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="noti in notifications"
        :key="noti.id"
        class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <h2 class="text-xl font-semibold text-[#da5fff] dark:text-[#ddacfc] mb-2">
          {{ noti.titulo || 'Notificación' }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ noti.mensaje || 'Sin contenido' }}
        </p>
        <p class="text-sm text-gray-400 dark:text-gray-500 mt-3">
          {{ formatdate(noti.created_at) }}
        </p>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      Hubo un error al cargar las notificaciones.
    </div>
  </div>
</template>
