<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router'
const route = useRoute();
import NavUnlog from './Navs/NavUnlog.vue'
import NavAdmin from './Navs/NavAdmin.vue'
import { ref, onMounted, onUnmounted } from 'vue';
import './styles.css'

// Botón volvder arriba
const showButton = ref(false)
const handleScroll = () => { showButton.value = window.scrollY > 200 }
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">

    <header>
      <NavAdmin v-if="route.meta.requiereNavAdmin" />
      <NavUnlog v-else />
    </header>

    <main class="flex-1 pt-14">
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
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>

  </div>

  <!-- Botón Volver Arriba -->
  <transition name="fade-up">
    <button v-if="showButton" @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-2xl
      hover:from-indigo-600 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(79,57,246,0.6)]
      transition-transform duration-500 ease-in-out transform hover:scale-110 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </transition>
</template>

<style lang="css" scoped>
.fade-up-enter-active, .fade-up-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-enter-from, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-enter-to, .fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
