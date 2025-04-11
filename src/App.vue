<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavUnlog from './Navs/NavUnlog.vue'
import NavAdmin from './Navs/NavAdmin.vue'
import { computed } from 'vue';
import './styles.css'

// Computado para saber si hay sesión activa
const isLogged = computed(() =>
  document.cookie.includes('laravel_session') || document.cookie.includes('XSRF-TOKEN')
);

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900">

    <header>
      <NavAdmin v-if="isLogged" />
      <NavUnlog v-else/>
    </header>

    <!-- Solo contenido principal -->
    <main class="flex-1 p-4">
      <RouterView v-slot="{ Component }">
        <transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-500 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

  </div>
</template>
