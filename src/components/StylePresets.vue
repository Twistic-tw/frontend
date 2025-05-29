<template>
  <div
    class="bg-white p-4 rounded-2xl shadow-md mb-6 cursor-pointer hover:shadow-lg transition"
    @click="$emit('open')"
  >
    <h2 class="text-xl font-bold text-gray-800">
      {{ $t('style_presets_title') }}
    </h2>
  </div>
</template>

<script setup lang="ts">
defineEmits(['open'])
</script>
