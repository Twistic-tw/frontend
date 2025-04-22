<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavUnlog from './Navs/NavUnlog.vue'
import NavAdmin from './Navs/NavAdmin.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue';
import './styles.css'

// Computado para saber si hay sesión activa
const isLogged = computed(() =>
  document.cookie.includes('laravel_session') || document.cookie.includes('XSRF-TOKEN')
);

const showButton = ref(false)
const handleScroll = () => {
  showButton.value = window.scrollY > 200
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900">

    <header>
      <NavAdmin v-if="isLogged" />
      <NavUnlog v-else/>
    </header>

    <!-- Solo contenido principal -->
    <main class="flex-1 mt-14">
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
  <button v-if="showButton" @click="scrollToTop"
  class="fixed bottom-6 right-6 bg-[#4f39f6] text-white p-3 rounded-full shadow-lg hover:bg-[#3a2ac9] transition-transform duration-300 hover:scale-110">
    ↑
  </button>
</template>
