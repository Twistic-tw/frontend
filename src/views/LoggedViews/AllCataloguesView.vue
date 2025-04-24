<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const usuarios = ref([])
const catalogos = ref([])
const usuarioSeleccionado = ref('')

// Cargar usuarios al iniciar
onMounted(async () => {
  cargarCatalogos()
  cargarCatalogosPorUsuario()
  cargarUsuarios()
})

// Cargar usuarios
async function cargarUsuarios() {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/users', {
      withCredentials: true
    })
    usuarios.value = res.data
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

// Cargar catálogos
async function cargarCatalogos() {

try {
  const url = `https://api-catalogos.twistic.app/api/ShowCatalogs`
  const res = await axios.get(url, {
    withCredentials: true
  })
  catalogos.value = res.data.catalogs || []
} catch (error) {
  console.error('Error al cargar catálogos:', error)
  catalogos.value = []
}
}

// Cargar catálogos por usuario
async function cargarCatalogosPorUsuario() {

  try {
    const url = `https://api-catalogos.twistic.app/api/ShowCatalogs?id_user=${usuarioSeleccionado.value}`
    const res = await axios.get(url, {
      withCredentials: true
    })
    catalogos.value = res.data.catalogs || []
  } catch (error) {
    console.error('Error al cargar catálogos por usuario:', error)
    catalogos.value = []
  }
}

// Al cambiar de usuario, carga sus catálogos
watch(usuarioSeleccionado, () => {
  cargarCatalogosPorUsuario()
})
</script>


<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Catalogs</h2>

    <!-- Filtros -->
    <div class="mb-6 max-w-md mx-auto">

      <!-- Filtrar por usuario -->
      <select
        v-model="usuarioSeleccionado"
        placeholder="Select user"
        class="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select user</option>
        <option v-for="user in usuarios" :key="user.id" :value="user.id">
          {{ user.nombre }}
        </option>
      </select>
    </div>

    <!-- Lista de catálogos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="catalogo in catalogos"
        :key="catalogo.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">{{ catalogo.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-white mb-1">Created by: <span class="font-medium text-gray-700 dark:text-white">{{ catalogo.user_name }}</span></p>
        <p class="text-sm text-gray-500 dark:text-white mb-1">Creat date: <span class="font-medium text-gray-700 dark:text-white">{{ new Date(catalogo.created_at).toLocaleDateString() }}</span></p>
      </div>
    </div>

    <div v-if="catalogos.length === 0" class="text-center text-gray-500 mt-8">
      No catalogs available
    </div>
  </div>
</template>
