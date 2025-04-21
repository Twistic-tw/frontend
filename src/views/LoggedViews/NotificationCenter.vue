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
  <div class="max-w-3xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-[#b294f3] text-center mb-6">Tus Notificaciones</h1>

    <div v-if="loading" class="text-center text-gray-500">
      Cargando notificaciones...
    </div>

    <div v-else-if="notifications.length === 0" class="text-center text-blue-400 bg-blue-50 p-4 rounded">
      No tienes notificaciones.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="noti in notifications"
        :key="noti.id"
        class="bg-white shadow-md border-l-4 border-[#589ce2] rounded px-5 py-4"
      >
        <h2 class="text-xl font-semibold text-[#da5fff]">{{ noti.titulo || 'Notificación' }}</h2>
        <p class="text-gray-700 mt-1">{{ noti.mensaje || 'Sin contenido' }}</p>
        <p class="text-sm text-gray-400 mt-2">{{ formatdate(noti.created_at) }}</p>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-4">
      Error cargando las notificaciones.
    </div>
  </div>
</template>
