<script setup lang="ts">
import '../../styles.css'
import { RouterLink} from 'vue-router'
</script>
<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 px-4 sm:px-6 md:px-8 space-y-24 mt-14">

    <!-- Bloque 1: Encabezado -->
    <section class="text-center space-y-4 animate-fadeInUp px-2">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-gray-800">
        Welcome to TWISTIC Catalogues
      </h1>
      <p class="text-base sm:text-lg text-slate-700 dark:text-indigo-600 max-w-xl mx-auto mt-6 mb-6 sm:mt-10 px-2">
        The easiest way to create, customize, and manage product catalogues for your business in just a few steps.
      </p>
    </section>

    <!-- Bloque 2: Beneficios -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 animate-fadeInUp delay-100">
      <div class="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-lg text-center transition transform hover:-translate-y-1 hover:shadow-2xl mx-auto w-full max-w-sm">
        <h2 class="text-xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Easy Catalogue Creation</h2>
        <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Upload your data and generate catalogues automatically. Simple, fast, and intuitive.
        </p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-lg text-center transition transform hover:-translate-y-1 hover:shadow-2xl mx-auto w-full max-w-sm">
        <h2 class="text-xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Real-Time Notifications</h2>
        <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Stay updated with instant notifications about your catalogue status.
        </p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-lg text-center transition transform hover:-translate-y-1 hover:shadow-2xl mx-auto w-full max-w-sm">
        <h2 class="text-xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Custom Templates</h2>
        <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Design and manage templates for consistent and professional catalogues.
        </p>
      </div>
    </section>

    <!-- Bloque 3: Call to Action -->
    <section class="text-center space-y-4 sm:space-y-6 animate-fadeInUp delay-200 px-2 mb-6">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        Ready to simplify your catalogue creation?
      </h2>
      <RouterLink
        to="/signup"
        class="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow hover:bg-indigo-700 transition"
      >
        Get Started Now
      </RouterLink>
    </section>

  </div>
</template>


