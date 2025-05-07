<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification';

const toast = useToast();
const usuarios = ref([])
const plantillas = ref([])

onMounted(async () => {
  await loadUsers()
  await loadTemplates()
})

// Function to load users
async function loadUsers() {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/Users', {
      withCredentials: true
    })
    usuarios.value = res.data
  } catch (error) {
    console.error('Error loading users:', error)
  }
}

// Function to load templates
async function loadTemplates() {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/ViewTemplates', {
      withCredentials: true
    })
    plantillas.value = res.data
  } catch (error) {
    console.error('Error loading templates:', error)
  }
}

// Delete template
async function eliminarPlantilla(id) {
  if (confirm('Are you sure you want to delete this template?')) {
    try {
      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
      if (!xsrfToken) {
        toast.error('CSRF token not found. Please reload the page.');
        return;
      }
      await axios.delete(`https://api-catalogos.twistic.app/api/DeleteTemplate/${id}`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        }
      })
      plantillas.value = plantillas.value.filter(p => p.id !== id)
      toast.success('Template successfully deleted.')
    } catch (error) {
      console.error('Error deleting template:', error)
      toast.error('There was an error deleting the template.')
    }
  }
}
</script>

<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Available Templates</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plantilla in plantillas"
        :key="plantilla.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">{{ plantilla.name }}</h3>

        <p class="text-sm text-gray-500 dark:text-white mb-1">
          Created by: <span class="font-medium text-gray-700 dark:text-white">{{ plantilla.user_name || 'Unknown' }}</span>
        </p>

        <p class="text-sm text-gray-500 dark:text-white mb-3">
          Created date: <span class="font-medium text-gray-700 dark:text-white">{{ new Date(plantilla.created_at).toLocaleDateString() }}</span>
        </p>

        <div>
          <h4 class="text-sm font-semibold text-gray-700 dark:text-white mb-2">Fields:</h4>
          <ul class="list-disc list-inside text-gray-600 dark:text-white">
            <li v-for="field in plantilla.fields " :key="field.id">{{ field.field }}</li>
          </ul>
        </div>
        <!-- Botón Eliminar -->
        <button
          @click="eliminarPlantilla(plantilla.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-4"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-if="plantillas.length === 0" class="text-center text-gray-500 mt-8">
      No templates available
    </div>
  </div>
</template>

