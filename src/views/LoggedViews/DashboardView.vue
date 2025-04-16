<script setup lang="ts">
const role = sessionStorage.getItem('userRole');
const userName = sessionStorage.getItem('userName');
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6 mt-12">

    <!-- Título de bienvenida -->
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
      ¡Bienvenido, {{userName}}!
    </h1>

    <!-- Tarjetas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <!-- Card Catalogs -->
      <RouterLink to="/catalogs" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Crear catálogos</h2>
        <p class="text-gray-500 dark:text-gray-300">Crea catálogos para tus productos.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Crear catálogo
        </button>
      </RouterLink>

      <RouterLink to="/catalogs" v-if="role && (role === 'client' || role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Ver catálogos</h2>
        <p class="text-gray-500 dark:text-gray-300">Consulta todos los catálogos activos en la plataforma.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Consultar catálogos
        </button>
      </RouterLink>

      <!-- Card Templates -->
       <RouterLink to="/templates" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Operaciones en plantillas</h2>
        <p class="text-gray-500 dark:text-gray-300">Crea o elimina plantillas para tus catálogos.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Operaciones en plantillas
        </button>
      </RouterLink>

      <!-- Card Notifications -->
      <RouterLink to="notifications" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Crear notificaciones</h2>
        <p class="text-gray-500 dark:text-gray-300">Crea notificaciones para tus catálogos.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Crear notificación
        </button>
      </RouterLink>

      <!-- Card Users -->
      <RouterLink to="users" v-if="role && (role === 'admin')" class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Crear usuarios</h2>
        <p class="text-gray-500 dark:text-gray-300">Crea usuarios para la plataforma.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Crear usuario
        </button>
      </RouterLink>

    </div>

  </div>

</template>

