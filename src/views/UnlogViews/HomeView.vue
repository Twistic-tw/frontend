<script setup lang="ts">
import '../../styles.css'
import { RouterLink} from 'vue-router'
</script>
<template>
  <div class="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-8">

    <!-- Sección de bienvenida -->
    <div class="text-center md:text-left max-w-xl space-y-6 mb-12 md:mb-0 md:mr-12">
      <h2 class="text-4xl font-bold text-slate-800 dark:text-white font-sans">
        Create simple catalogues <br class="hidden md:inline"> in just a few steps
      </h2>

      <RouterLink
        to="/login"
        class="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow hover:bg-indigo-700 transition"
      >
        Log In
      </RouterLink>

      <p class="text-slate-700 dark:text-slate-300 text-lg">
        or, if you don't have an account,
        <RouterLink
          to="/signup"
          class="underline font-semibold text-cyan-700 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-100 transition"
        >
          Sign Up
        </RouterLink>
      </p>
    </div>

    <!-- Sección del logo -->
    <div class="text-center space-y-8">
      <h1 class="text-6xl md:text-8xl font-extrabold text-slate-800 dark:text-white">
        TWISTIC
      </h1>

      <div class="flex items-center justify-center space-x-6 text-slate-800 dark:text-slate-200 text-lg font-medium">
        <span>Automatic</span>
        <div class="w-1 h-1 bg-slate-600 dark:bg-slate-400 rounded-full"></div>
        <span>Easy</span>
        <div class="w-1 h-1 bg-slate-600 dark:bg-slate-400 rounded-full"></div>
        <span>Customizable</span>
      </div>
    </div>

  </div>
</template>
