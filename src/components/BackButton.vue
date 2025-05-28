<template>
  <button
    @click="goBack"
    class="flex items-center text-sm text-gray-700 bg-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow transition-all duration-200 ease-in-out transform active:scale-95"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    {{ $t('back_button') }}
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

