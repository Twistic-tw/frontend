<script setup lang="ts">
import { useCatalogManager } from '../../composable/AllCatalogues'
import BackButton from '@/components/BackButton.vue'

const {
  usuarios,
  catalogos,
  usuarioSeleccionado,
  role,
  baseUrl,
} = useCatalogManager()
</script>



<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Catalogs</h2>

    <!-- Filtros -->
    <div class="mb-6 max-w-md mx-auto">

      <!-- Filtrar por usuario -->
      <select v-if="role && (role === 'admin')"
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
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ catalogo.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-white mb-1">Created by: <span class="font-medium text-gray-700 dark:text-white">{{ catalogo.user_name }}</span></p>
        <p class="text-sm text-gray-500 dark:text-white mb-1">Created date: <span class="font-medium text-gray-700 dark:text-white">{{ new Date(catalogo.created_at).toLocaleDateString() }}</span></p>
        <a
          :href="baseUrl + '/' + catalogo.file_path"
          target="_blank"
          class="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Download
        </a>

      </div>
    </div>

    <div v-if="catalogos.length === 0" class="text-center text-gray-500 mt-8">
      No catalogs available
    </div>
    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
</template>
