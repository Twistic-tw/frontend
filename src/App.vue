<script setup lang="js">
import { RouterView } from 'vue-router'
import NavUnlog from './Navs/NavUnlog.vue'
import './styles.css'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900">

    <header>
      <NavUnlog />
    </header>

    <!-- Solo contenido principal -->
    <main class="flex-1 p-4">
      <RouterView />
    </main>

  </div>
</template>
