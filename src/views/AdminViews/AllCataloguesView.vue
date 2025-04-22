
<template>
    <div class="flex-1 mt-[60px] ml-21 flex-col justify-center px-6 py-12 lg:px-8 mt-4">

    </div>
</template>

<script setup lang="ts">
import '../../styles.css'
import { ref, onMounted } from 'vue';
import axios from 'axios';
const message = ref('');
const loading = ref(true);
const error = ref('');

onMounted(() => {
  // Si usas Sanctum, primero obtén la cookie CSRF
   axios.get('https://api-catalogos.twistic.app/sanctum/csrf-cookie', {
      withCredentials: true,
    })
    .then(() => {
      return axios.get('https://api-catalogos.twistic.app/api/ShowCatalogs',{
        headers:{
            'Access-Control-Allow-Origin':'*'
        }});
    })
    .then(response => {
      message.value = response.data;
      console.log('holiwi?')
      console.log(message);
    })
    .catch(err => {
      error.value = "Ocurrió un error al obtener la información.";
      console.error(err);
      console.log('errorcito errorcito')
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
