<template>
  <button
    @click="goBack"
    class="fixed top-4 left-4 z-50 flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl shadow-lg transition-all duration-200"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Volver atrás
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => router.back();
</script>
