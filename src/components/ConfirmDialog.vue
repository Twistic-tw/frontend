<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-md w-full">
      <p class="mb-4 text-lg text-gray-800">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          @click="$emit('confirm')"
        >
          Delete
        </button>
        <button
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>

