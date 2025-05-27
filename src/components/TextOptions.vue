<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:bg-gray-50 transition" @click="$emit('toggle', cardId)">
    <h2 class="text-xl font-bold text-gray-800">Text Options</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cardId: string
  activeCard: string | null
}>()

defineEmits(['toggle'])
</script>
