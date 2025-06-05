<script setup lang="ts">
import { ApprovedCatalog } from '../../composable/ApprovedCatalog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const role = sessionStorage.getItem('userRole') || ''

const {
  approvedTemplates,
  loading,
  error,
  formatDate,
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
        class="block p-6 bg-white rounded-2xl shadow hover:shadow-lg transition dark:bg-gray-800"
      >
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {{ template.catalog_name }}
        </h2>
        <p class="text-sm text-gray-500 mb-2">
          {{ t("approved_created") }} {{ formatDate(template.created_at) }}
        </p>

        <!-- Botón visible solo para admin -->
        <button
          v-if="role === 'admin'"
          class="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition hover:bg-gray-700"
        >
          {{ t("duplicate") }}
        </button>
      </RouterLink>
    </div>
  </div>
</template>
