<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import '../styles.css'

const { locale } = useI18n()
const selectedLang = ref(locale.value)

const changeLanguage = (lang: string) => {
  locale.value = lang
  selectedLang.value = lang
}

const role = sessionStorage.getItem('userRole')
const title = ref(document.title)
const route = useRoute()
watch(() => route.fullPath, () => {
  title.value = document.title
})

const navExpanded = ref(false)
const ToggleNav = () => {
  navExpanded.value = !navExpanded.value
}
const closeNav = () => {
  navExpanded.value = false
}
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
        <router-link to="dashboard" class="flex items-center space-x-2">
          <img src="/public/TW_LOGO_BLANCOy_gris.png" alt="Twistic Logo" class="h-[6.5rem] w-auto" />
        </router-link>
      </div>

      <!-- Selector de idioma -->
      <div class="mr-6">
        <select v-model="selectedLang" @change="changeLanguage(selectedLang)" class="rounded-xl px-3 py-1 bg-neutral-800 text-white text-sm shadow focus:outline-none">
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="de">DE</option>
          <option value="fr">FR</option>
          <option value="it">IT</option>
        </select>
      </div>

      <!-- Toggle botón -->
      <div
        @click.stop="ToggleNav"
        class="size-12 mr-4 rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 border-indigo-500 hover:border-cyan-400 transition-all duration-500 ease-out shadow-lg hover:shadow-indigo-500/50 cursor-pointer transform opacity-0 translate-x-[20px] animate-slide-in-right"
      >
        <img src="/avatar.png" alt="Avatar" class="w-full h-full object-cover" />
      </div>
    </nav>

    <!-- Menú desplegable -->
    <div
      class="w-46 bg-neutral-950 rounded-b-2xl fixed right-0 mt-[68px] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50"
      :class="{ 'max-h-[630px]': navExpanded, 'max-h-0': !navExpanded }"
    >
      <!-- Aquí sigue igual el menú -->
      <!-- ... todos los RouterLink ... -->
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in-right {
  0% {
    transform: translateX(80px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out forwards;
}
</style>
