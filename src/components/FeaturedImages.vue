<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:bg-gray-50 transition"
    @click="$emit('toggle', cardId)"
  >
    <h2 class="text-xl font-semibold text-gray-800">Featured Images</h2>
    <p class="text-sm text-gray-500 mt-1">
      Click to upload 4 highlighted images for the catalog.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cardId: string
  activeCard: string | null
}>()

defineEmits(['toggle'])
</script>
