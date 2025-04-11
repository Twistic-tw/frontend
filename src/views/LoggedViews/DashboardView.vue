<script setup lang="js">

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
      <div class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Catálogos disponibles</h2>
        <p class="text-gray-500 dark:text-gray-300">Consulta todos los catálogos activos en la plataforma.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Ver catálogos
        </button>
      </div>

      <!-- Card 2 -->
      <div class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Generar PDF</h2>
        <p class="text-gray-500 dark:text-gray-300">Crea un nuevo documento PDF a partir de tus datos.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Crear PDF
        </button>
      </div>

      <!-- Card 3 -->
      <div class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Enviar notificaciones</h2>
        <p class="text-gray-500 dark:text-gray-300">Notifica a los usuarios sobre cambios o novedades.</p>
        <button class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Enviar
        </button>
      </div>

    </div>

  </div>

</template>

