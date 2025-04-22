<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();

onMounted(async () => {
  try {
    await axios.post('https://api-catalogos.twistic.app/api/logout', {}, {
      withCredentials: true,
    });

    sessionStorage.clear();
    localStorage.clear();
    document.cookie.split(";").forEach(c => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    await router.push('/');
    window.location.reload();
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    await router.push('/');
  }
});
</script>

<template>
  <div style="padding: 2rem; text-align: center;">
    Cerrando sesión...
  </div>
</template>
