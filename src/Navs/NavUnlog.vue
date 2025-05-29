<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import '../styles.css'

const { locale } = useI18n()
// Registrar función $t
const { t } = useI18n()

const languages = [
  { code: 'en', label: '🇬🇧 EN' },
  { code: 'es', label: '🇪🇸 ES' },
  { code: 'fr', label: '🇫🇷 FR' },
  { code: 'de', label: '🇩🇪 DE' },
  { code: 'it', label: '🇮🇹 IT' },
  { code: 'zh', label: '🇨🇳 中文' }
]

const selectedLang = ref(locale.value)

const changeLanguage = (lang: string) => {
  locale.value = lang
  selectedLang.value = lang
}
</script>

<template>
  <div class="flex h-auto dark:bg-neutral-950 z-50">
    <nav class="flex h-15 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0 px-5">
      <router-link to="/" class="flex items-center space-x-2">
        <img src="/public/TW_LOGO_BLANCOy_gris.png" alt="Twistic Logo" class="h-[6.5rem] w-auto" />
      </router-link>

      <div class="flex justify-end items-center flex-1 gap-4">
        <!-- Selector de idioma -->
        <select
          v-model="selectedLang"
          @change="changeLanguage(selectedLang)"
          class="bg-slate-800 text-white rounded-xl px-3 py-2 shadow hover:bg-slate-700 focus:outline-none transition"
        >
          <option
            v-for="lang in languages"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.label }}
          </option>
        </select>

        <RouterLink
          to="/login"
          class="mx-2 px-6 py-2 text-center text-lg font-semibold tracking-tight rounded-2xl transition duration-200 ease-in-out text-white hover:bg-slate-800"
          active-class="bg-slate-900"
        >
          {{ t("welcome_subtitle") }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s ease-out;
}
</style>
