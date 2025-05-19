<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import BackButton from '@/components/BackButton.vue'

const toast = useToast()
const fields = ref([])
const camposSeleccionados = ref<number[]>([])

const todosSeleccionados = computed(
  () => camposSeleccionados.value.length === fields.value.length && fields.value.length > 0,
)

function toggleSeleccionarTodos() {
  if (todosSeleccionados.value) {
    camposSeleccionados.value = []
  } else {
    camposSeleccionados.value = fields.value.map((f) => f.id)
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/ViewFields`)
    fields.value = res.data
  } catch (error) {
    console.error('Error loading fields:', error)
    fields.value = []
  }
})

async function eliminarCampo(id: number) {
  if (!confirm('Are you sure you want to delete this field?')) return

  try {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    if (!xsrfToken) {
      toast.error('CSRF token not found. Please reload the page.')
      return
    }

    await axios.delete(`${import.meta.env.VITE_URL}/DeleteField/${id}`, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        Accept: 'application/json',
      },
    })

    fields.value = fields.value.filter((field) => field.id !== id)
    camposSeleccionados.value = camposSeleccionados.value.filter((cid) => cid !== id)
    toast.success('Field deleted successfully.')
  } catch (error) {
    console.error('Error deleting field:', error)
    toast.error('An error occurred while deleting the field.')
  }
}

async function eliminarCamposSeleccionados() {
  if (
    !confirm(
      `Are you sure you want to delete ${camposSeleccionados.value.length} selected field(s)?`,
    )
  )
    return

  try {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]

    if (!xsrfToken) {
      toast.error('CSRF token not found. Please reload the page.')
      return
    }

    await axios.post(
      `${import.meta.env.VITE_URL}/DeleteFields`,
      {
        ids: camposSeleccionados.value,
      },
      {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
      },
    )

    // Actualiza estado local
    fields.value = fields.value.filter((f) => !camposSeleccionados.value.includes(f.id))
    camposSeleccionados.value = []
    toast.success('Selected fields deleted.')
  } catch (error) {
    console.error('Error deleting fields:', error)
    toast.error('There was an error deleting the fields.')
  }
}
</script>

<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <!-- Título -->
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Available Fields</h2>

    <!-- Toggle + Botón "Delete selected" alineados a la derecha -->
    <div class="flex justify-end items-center mb-6 gap-4 flex-wrap">
      <!-- Select all toggle -->
      <div class="flex items-center gap-2">
        <label
          for="toggle-select-all-fields"
          class="text-sm font-medium text-gray-700 dark:text-white"
        >
          {{ todosSeleccionados ? 'Unselect all' : 'Select all' }}
        </label>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            id="toggle-select-all-fields"
            type="checkbox"
            class="sr-only peer"
            :checked="todosSeleccionados"
            @change="toggleSeleccionarTodos"
          />
          <div
            class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"
          ></div>
          <div
            class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all duration-300"
          ></div>
        </label>
      </div>

      <!-- Botón eliminar seleccionados -->
      <div v-if="camposSeleccionados.length > 0">
        <button
          @click="eliminarCamposSeleccionados"
          class="px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
        >
          Delete selected ({{ camposSeleccionados.length }})
        </button>
      </div>
    </div>

    <!-- Grid de campos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="field in fields"
        :key="field.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <!-- Botón de eliminación múltiple -->
        <div v-if="camposSeleccionados.length > 0" class="mt-6 text-center">
          <button
            @click="eliminarCamposSeleccionados"
            class="px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
          >
            Delete selected ({{ camposSeleccionados.length }})
          </button>
        </div>
        <!-- Título con checkbox -->
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold text-indigo-600">{{ field.field }}</h3>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              :value="field.id"
              v-model="camposSeleccionados"
            />
            <div
              class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"
            ></div>
            <div
              class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all duration-300"
            ></div>
          </label>
        </div>

        <p class="text-sm text-gray-500 dark:text-white mb-1">
          Created:
          <span class="font-medium text-gray-700 dark:text-white">
            {{ new Date(field.created_at).toLocaleDateString() }}
          </span>
        </p>
        <p class="text-sm text-gray-500 dark:text-white mb-1">
          Updated:
          <span class="font-medium text-gray-700 dark:text-white">
            {{ new Date(field.updated_at).toLocaleDateString() }}
          </span>
        </p>
        <button
          @click="eliminarCampo(field.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-2"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Si no hay campos -->
    <div v-if="fields.length === 0" class="text-center text-gray-500 mt-8">
      No fields available.
    </div>

    <!-- Botón volver -->
    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
</template>
