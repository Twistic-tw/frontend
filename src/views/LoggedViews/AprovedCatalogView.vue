<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import { ApprovedCatalog } from '../../composable/ApprovedCatalog'
import { useI18n } from 'vue-i18n'
import DuplicateModal from '@/components/DuplicateModal.vue'

const { t } = useI18n()

// El rol no es reactivo, pero se lee una vez al cargar
const role = sessionStorage.getItem('userRole') || ''

// Importamos todo del composable
const {
  approvedTemplates,
  loading,
  error,
  formatDate,
  showDuplicateModal,
  duplicateName,
  openDuplicateModal,
  confirmDuplicate
} = ApprovedCatalog()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      {{ t("approved_title") }}
    </h1>

    <div v-if="loading" class="text-center text-gray-600">
      {{ t("approved_loading") }}
    </div>

    <div v-if="error" class="text-center text-red-600">
      {{ t("approved_error") }}
    </div>

    <div v-else-if="approvedTemplates.length === 0" class="text-center text-gray-600">
      {{ t("approved_empty") }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <RouterLink
        v-for="template in approvedTemplates"
        :key="template.id_template"
        :to="`/customizePdf/${template.id_template}`"
        class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800"
      >
        <!-- Contenido -->
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">
            {{ template.catalog_name }}
          </h2>
          <p class="text-sm text-gray-500 mb-1">
            {{ t("approved_created") }} {{ formatDate(template.created_at) }}
          </p>
          <p class="text-sm text-gray-500 mb-4">
            {{ t("approved_updated") }} {{ formatDate(template.updated_at) }}
          </p>

          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("approved_customize_button") }}
          </button>

          <!-- Solo admins pueden duplicar -->
          <button
            v-if="role === 'admin'"
            @click.stop.prevent="openDuplicateModal(template)"
            class="bg-gray-800 text-white ml-[1em] px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8"
          >
            {{ t("duplicate") }}
          </button>
        </div>

        <!-- Imagen -->
        <img src="/viewCatalog.png" alt="View Catalog" class="w-24 h-24 object-contain" />
      </RouterLink>
    </div>

    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>

  <!-- Modal de duplicado -->
  <DuplicateModal
    v-model:show="showDuplicateModal"
    :default-name="duplicateName"
    :existing-names="approvedTemplates.map(t => t.catalog_name)"
    @close="showDuplicateModal = false"
    @confirm="confirmDuplicate"
  />
</template>
