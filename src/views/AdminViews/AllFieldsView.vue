<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification';

const toast = useToast();
const fields = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/ViewFields')
    fields.value = res.data
  } catch (error) {
    console.error('Error loading fields:', error)
    fields.value = []
  }
})

// Delete field
async function eliminarCampo(id) {
  if (confirm('Are you sure you want to delete this field?')) {
    try {
      // Get CSRF token from cookie
      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];

      if (!xsrfToken) {
        toast.error('CSRF token not found. Please reload the page.');
        return;
      }

      await axios.delete(`https://api-catalogos.twistic.app/api/DeleteField/${id}`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        }
      })

      // Remove from local array
      fields.value = fields.value.filter(field => field.id !== id)
      toast.success('Field deleted successfully.')

    } catch (error) {
      console.error('Error deleting field:', error)
      toast.error('An error occurred while deleting the field.')
    }
  }
}
</script>


<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Available fields</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="field in fields"
        :key="field.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">#{{ field.id }} - {{ field.field }}</h3>
        <p class="text-sm text-gray-500 dark:text-white mb-1">Created: <span class="font-medium text-gray-700 dark:text-white">{{ new Date(field.created_at).toLocaleDateString() }}</span></p>
        <p class="text-sm text-gray-500 dark:text-white mb-1">Updated: <span class="font-medium text-gray-700 dark:text-white">{{ new Date(field.updated_at).toLocaleDateString() }}</span></p>
        <!-- Botón Eliminar -->
        <button
          @click="eliminarCampo(field.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-2"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-if="fields.length === 0" class="text-center text-gray-500 mt-8">
      No fields available.
    </div>
  </div>
</template>
