<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification';
import BackButton from '@/components/BackButton.vue';

// Declaración de variables
const toast = useToast();
const usuarios = ref([])
const plantillas = ref([])
const plantillasSeleccionadas = ref<number[]>([])
const todasSeleccionadas = computed(() =>
  plantillasSeleccionadas.value.length === plantillas.value.length &&
  plantillas.value.length > 0
)

// Ejecutar promesas al cargar el componente
onMounted(async () => {
  await loadUsers()
  await loadTemplates()
})

// Function to load users
async function loadUsers() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/Users`, {
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
    const res = await axios.get(`${import.meta.env.VITE_URL}/ViewTemplates`, {
      withCredentials: true
    })
    plantillas.value = res.data
  } catch (error) {
    console.error('Error loading templates:', error)
  }
}

// Function to select all templates
function toggleSeleccionarTodas() {
  if (todasSeleccionadas.value) {
    plantillasSeleccionadas.value = []
  } else {
    plantillasSeleccionadas.value = plantillas.value.map(p => p.id)
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
      await axios.delete(`${import.meta.env.VITE_URL}/DeleteTemplate/${id}`, {
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

// Function to delete multiple templates
async function eliminarSeleccionadas() {
  if (!confirm('Are you sure you want to delete the selected templates?')) return;

  try {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
    if (!xsrfToken) {
      toast.error('CSRF token not found. Please reload the page.');
      return;
    }

    for (const id of plantillasSeleccionadas.value) {
      await axios.delete(`${import.meta.env.VITE_URL}/DeleteTemplate/${id}`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        }
      });
    }

    // Filtrar plantillas eliminadas
    plantillas.value = plantillas.value.filter(p => !plantillasSeleccionadas.value.includes(p.id))
    plantillasSeleccionadas.value = []
    toast.success('Selected templates deleted.')

  } catch (error) {
    console.error('Error deleting templates:', error);
    toast.error('There was an error deleting the templates.')
  }
}
</script>

<template>
  <!-- Encabezado con botón volver atrás -->
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Available Templates</h2>
    <div class="flex justify-between items-center mb-6">
      <button
        @click="toggleSeleccionarTodas"
        class="ml-4 text-sm text-indigo-600 underline hover:text-indigo-800"
      >
        {{ todasSeleccionadas ? 'Unselect all' : 'Select all' }}
      </button>
    </div>


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

    <div v-if="plantillasSeleccionadas.length > 0" class="mt-6 text-center">
      <button
        @click="eliminarSeleccionadas"
        class="px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
      >
        Delete selected ({{ plantillasSeleccionadas.length }})
      </button>
    </div>

    <div v-if="plantillas.length === 0" class="text-center text-gray-500 mt-8">
      No templates available
    </div>
    <!-- Botón Volver -->
    <div class="mt-12">
      <BackButton
  class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
/>
    </div>
  </div>
</template>

