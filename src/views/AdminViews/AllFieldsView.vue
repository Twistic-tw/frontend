<script setup lang="ts">
import { useFields } from '../../composable/fieldsList'
import BackButton from '@/components/BackButton.vue'

const {
  fields,
  camposSeleccionados,
  todosSeleccionados,
  toggleSeleccionarTodos,
  eliminarCampo,
  eliminarCamposSeleccionados,
} = useFields()
</script>

<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <!-- Título -->
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Available Fields</h2>

    <!-- Toggle + Botón "Delete selected" alineados a la derecha -->
    <div class="flex justify-end items-center mb-6 gap-4 flex-wrap">
      <!-- Botón eliminar seleccionados -->
      <div v-if="camposSeleccionados.length > 0">
        <button
          @click="eliminarCamposSeleccionados"
          class="px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
        >
          Delete selected ({{ camposSeleccionados.length }})
        </button>
      </div>

      <!-- Toggle estilo Apple -->
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
    </div>

    <!-- Grid de campos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="field in fields"
        :key="field.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
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
