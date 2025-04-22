<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import '../styles.css'

// Título de la ruta
const title = ref(document.title)
const route = useRoute()
watch(() => route.fullPath, () => {
  title.value = document.title
})

// Estado del menú
const navExpanded = ref(false)

// Alternar el menú
const ToggleNav = () => {
  navExpanded.value = !navExpanded.value
}

// Cerrar el menú
const closeNav = () => {
  navExpanded.value = false
}

// Detectar clics fuera del menú
const handleClickOutside = (event: MouseEvent) => {
  const navMenu = document.querySelector('.w-46')
  const toggleBtn = document.querySelector('.size-12')

  if (
    navExpanded.value &&
    navMenu &&
    toggleBtn &&
    !navMenu.contains(event.target as Node) &&
    !toggleBtn.contains(event.target as Node)
  ) {
    closeNav()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="flex h-auto">
    <!-- Navbar -->
    <nav class="flex h-17 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0 px-5 z-50">
      <div class="flex items-center flex-1 justify-start">
        <p class="text-white font-bold text-xl">TWISTIC | {{ title }}</p>
      </div>

      <!-- Toggle botón -->
      <div
        @click.stop="ToggleNav"
        class="rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 size-12 mr-6 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(255,_255,_255,_0.2)] cursor-pointer">
      </div>
    </nav>

    <!-- Menú desplegable -->
    <div
      class="w-46 bg-neutral-950 rounded-b-2xl fixed right-0 mt-[68px] flex flex-col mr-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50"
      :class="{ 'h-[244px]': navExpanded, 'h-0': !navExpanded }"
    >
      <RouterLink
        to="/dashboard"
        @click="closeNav"
        class="transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900"
        active-class="bg-slate-800"
        :class="{ 'opacity-100 translate-y-0': navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !navExpanded }"
      >
        Dashboard
      </RouterLink>

      <RouterLink
        to="/profile"
        @click="closeNav"
        class="transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900"
        active-class="bg-slate-800"
        :class="{ 'opacity-100 translate-y-0': navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !navExpanded }"
      >
        Profile
      </RouterLink>

      <RouterLink
        to="/notifications"
        @click="closeNav"
        class="transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900"
        active-class="bg-slate-800"
        :class="{ 'opacity-100 translate-y-0': navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !navExpanded }"
      >
        Notifications
      </RouterLink>

      <RouterLink
        to="/logout"
        @click="closeNav"
        class="rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900"
        active-class="bg-slate-800"
        :class="{ 'opacity-100 translate-y-0': navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !navExpanded }"
      >
        Log Out
      </RouterLink>
    </div>
  </div>
</template>

