<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavUnlog from './Navs/NavUnlog.vue';
import NavAdmin from './Navs/NavAdmin.vue';
import './styles.css'

// Manejar mostrar las barras si está logeado
import { ref } from 'vue';

const isLogged = ref(false);

// Saber si está logeado
const userSession = document.cookie.includes('laravel_session') || document.cookie.includes('XSRF-TOKEN');
isLogged.value = userSession;
console.log('isLogged:', isLogged.value);
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900">

    <header>
      <NavAdmin v-if="isLogged" />
      <NavUnlog v-else />
    </header>

    <!-- Solo contenido principal -->
    <main class="flex-1 p-4">
      <RouterView />
    </main>

  </div>
</template>
