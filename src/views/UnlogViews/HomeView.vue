<script setup lang="ts">
import '../../styles.css'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

// Registrar función $t
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-100 to-slate-300 px-4 sm:px-6 md:px-8 space-y-32 pt-16 scroll-smooth">

    <!-- Header Section -->
    <section class="text-center animate-fadeInUp space-y-6">
      <h1 class="text-4xl md:text-6xl font-bold text-slate-800 tracking-tight transition duration-300">
        {{ t("welcome_title") }} <span class="text-indigo-600"></span>
      </h1>
      <p class="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {{ t("welcome_subtitle") }}
      </p>
    </section>

    <!-- How It Works -->
    <section class="max-w-6xl mx-auto animate-fadeInUp delay-100 space-y-20 px-4">
      <!-- Step 1 -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-10">
        <div class="md:w-1/2 text-center md:text-left">
          <h3 class="text-2xl font-semibold text-slate-800 mb-3">{{ $t("step1_title_home") }}</h3>
          <p class="text-slate-600 text-base leading-relaxed">{{ $t("step1_description") }}</p>
        </div>
        <div class="md:w-1/2">
          <img src="/public/start.png" alt="Upload Excel" class="rounded-xl shadow-lg w-full" />
        </div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-10">
        <div class="md:w-1/2 text-center md:text-left">
          <h3 class="text-2xl font-semibold text-slate-800 mb-3">{{ $t("step2_title_home") }}</h3>
          <p class="text-slate-600 text-base leading-relaxed">{{ $t("step2_description") }}</p>
        </div>
        <div class="md:w-1/2">
          <img src="/public/fields.png" alt="Select Fields" class="rounded-xl shadow-lg w-full" />
        </div>
      </div>

      <!-- Step 3 -->
      <div class="flex flex-col-reverse md:flex-row items-center gap-10">
        <div class="md:w-1/2 text-center md:text-left">
          <h3 class="text-2xl font-semibold text-slate-800 mb-3">{{ $t("step3_title_home") }}</h3>
          <p class="text-slate-600 text-base leading-relaxed">{{ $t("step3_description") }}</p>
        </div>
        <div class="md:w-1/2">
          <img src="/public/ready.png" alt="Generate PDF" class="rounded-xl shadow-lg w-full" />
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeInUp delay-200">
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-2xl">
        <h2 class="text-xl font-bold text-slate-800 mb-2">{{ $t("benefit1_title") }}</h2>
        <p class="text-slate-600">{{ $t("benefit1_text") }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-2xl">
        <h2 class="text-xl font-bold text-slate-800 mb-2">{{ $t("benefit2_title") }}</h2>
        <p class="text-slate-600">{{ $t("benefit2_text") }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-2xl">
        <h2 class="text-xl font-bold text-slate-800 mb-2">{{ $t("benefit3_title") }}</h2>
        <p class="text-slate-600">{{ $t("benefit3_text") }}</p>
      </div>
    </section>

    <!-- Call To Action -->
    <section class="text-center animate-fadeInUp delay-300">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{{ $t("cta_title") }}</h2>
      <RouterLink
        to="/contact"
        class="inline-block px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 mb-6"
      >
        {{ $t("cta_button") }}
      </RouterLink>
    </section>
  </div>
</template>
