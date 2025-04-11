<script setup lang="ts">
import { userRoles } from '../../composable/userRoles.js'
const { role } = userRoles();
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6">

    <!-- Título de bienvenida -->
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
      ¡Bienvenido, Usuario!
    </h1>

    <!-- Tarjetas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <!-- Card 1 -->
      <div v-if="role && (role === 'client' || role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Catálogos disponibles</h2>
        <p class="text-gray-500 dark:text-gray-300">Consulta todos los catálogos activos en la plataforma.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Consultar catálogos
        </button>
      </div>

      <!-- Card 2 -->
      <div v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Ver plantillas</h2>
        <p class="text-gray-500 dark:text-gray-300">Consulta las plantillas disponibles</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Consultar plantillas
        </button>
      </div>

      <!-- Card 3 -->
      <div v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Notificaciones</h2>
        <p class="text-gray-500 dark:text-gray-300">Consulta tus notificaciones.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Consultar notificaciones
        </button>
      </div>

      <!-- Card 4 -->
      <div v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Gestiona usuarios</h2>
        <p class="text-gray-500 dark:text-gray-300">Consulta, modifica y elimina usuarios de la plataforma.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Consultar usuarios
        </button>
      </div>

    </div>

  </div>

</template>

