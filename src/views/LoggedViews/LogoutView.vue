<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();
function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


onMounted(async () => {
  try {
    await axios.post('https://api-catalogos.twistic.app/api/closesession', {}, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
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
    console.error('Error al cerrar sesión', error.response ? error.response.data : error);
    await router.push('/');
  }
});
</script>

<template>
  <div style="padding: 2rem; text-align: center;">
    Signing out...
  </div>
</template>
