<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-md">
        <p class="mb-4 text-lg font-medium text-gray-800">{{ message }}</p>
        <div class="flex justify-center gap-4">
          <button
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            @click="$emit('confirm')"
          >
            Delete
          </button>
          <button
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
