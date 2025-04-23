<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavUnlog from './Navs/NavUnlog.vue'
import NavAdmin from './Navs/NavAdmin.vue'
import { ref, onMounted, onUnmounted } from 'vue';
import './styles.css'
import axios from 'axios';

// Configuración de Axios para incluir cookies
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

// Ref para saber si hay sesión activa
const isLogged = ref(false);

// Función para verificar si el usuario está autenticado
function checkAuthStatus() {
  axios.get('/user')
    .then(response => {
      console.log('Usuario autenticado:', response.data);
      isLogged.value = true;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        console.log('No autenticado');
        isLogged.value = false;
      } else {
        console.error('Error al verificar autenticación:', error);
      }
    });
}

// Función de logout con verificación real
function logout() {
  axios.post('/logout', {}, {
    withCredentials: true,
    headers: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    }
  })
  .then(response => {
    console.log('Logout exitoso:', response.data);
    checkAuthStatus(); // Verifica el estado tras logout
  })
  .catch(error => {
    console.error('Error en logout:', error);
  });
}

// Botón volver arriba
const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  checkAuthStatus(); // Verifica si está logeado al cargar
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Función para obtener cookies
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900">

    <header>
      <NavAdmin v-if="isLogged" @logout="logout" />
      <NavUnlog v-else/>
    </header>

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
