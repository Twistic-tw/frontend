<script setup lang="ts">
import { useTemplates } from '../../composable/templateList'
import BackButton from '@/components/BackButton.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useI18n } from 'vue-i18n'

const {
  plantillas,
  plantillasSeleccionadas,
  todasSeleccionadas,
  toggleSeleccionarTodas,
  eliminarPlantilla,
  eliminarSeleccionadas,
  showConfirm,
  confirmMessage,
  handleConfirm,
  cancelConfirm
} = useTemplates()

const { t } = useI18n()
</script>

<template>

  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen mt-3">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      {{ t('templates.title') }}
    </h2>

    <div class="flex justify-end items-center mb-6 gap-4 flex-wrap">
      <div v-if="plantillasSeleccionadas.length > 0">
        <button
          @click="eliminarSeleccionadas"
          class="px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
        >
          {{ t('templates.deleteSelected', { count: plantillasSeleccionadas.length }) }}
        </button>
      </div>

      <div class="flex items-center gap-2">
        <label for="toggle-select-all" class="text-sm font-medium text-gray-700 dark:text-white">
          {{ todasSeleccionadas ? t('templates.unselectAll') : t('templates.selectAll') }}
        </label>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            id="toggle-select-all"
            type="checkbox"
            class="sr-only peer"
            :checked="todasSeleccionadas"
            @change="toggleSeleccionarTodas"
          />
          <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
          <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all duration-300"></div>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plantilla in plantillas"
        :key="plantilla.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold text-indigo-600">{{ plantilla.name }}</h3>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              :value="plantilla.id"
              v-model="plantillasSeleccionadas"
            />
            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all duration-300"></div>
          </label>
        </div>

        <p class="text-sm text-gray-500 dark:text-white mb-1">
          {{ t('templates.createdBy') }}:
          <span class="font-medium text-gray-700 dark:text-white">
            {{ plantilla.user_name || 'Unknown' }}
          </span>
        </p>

        <p class="text-sm text-gray-500 dark:text-white mb-3">
          {{ t('templates.createdDate') }}:
          <span class="font-medium text-gray-700 dark:text-white">
            {{ new Date(plantilla.created_at).toLocaleDateString() }}
          </span>
        </p>

        <div>
          <h4 class="text-sm font-semibold text-gray-700 dark:text-white mb-2">
            {{ t('templates.fields') }}:
          </h4>
          <ul class="list-disc list-inside text-gray-600 dark:text-white">
            <li v-for="field in plantilla.fields" :key="field.id">{{ field.field }}</li>
          </ul>
        </div>

        <button
          @click="() => eliminarPlantilla(plantilla.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-4"
        >
          {{ t('templates.delete') }}
        </button>
      </div>
    </div>

    <div v-if="plantillas.length === 0" class="text-center text-gray-500 mt-8">
      {{ t('templates.noneAvailable') }}
    </div>

    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
  <ConfirmDialog
    :visible="showConfirm"
    :message="confirmMessage"
    @confirm="handleConfirm"
    @cancel="cancelConfirm"
  />
</template>
