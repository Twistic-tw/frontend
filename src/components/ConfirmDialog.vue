<template>
  <div v-if="showConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-md">
      <p class="mb-4 text-lg">Are you sure?</p>
      <div class="flex justify-center gap-4">
        <button class="bg-red-600 text-white px-4 py-2 rounded" @click="confirmarEliminar">Delete</button>
        <button class="bg-gray-300 px-4 py-2 rounded" @click="showConfirm = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showConfirm = ref(false)

function eliminar() {
  // Tu lógica de eliminación
  console.log("Deleted")
}

function confirmarEliminar() {
  eliminar()
  showConfirm.value = false
}
</script>
