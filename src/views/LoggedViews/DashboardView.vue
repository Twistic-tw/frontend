<script setup lang="ts">
import { Dashboard } from '../../composable/Dashboard'
import { useI18n } from 'vue-i18n'
console.log('🟢 Dashboard view mounted')
const { t } = useI18n()

const {
  role,
  userName,
  pendingCount,
  inProgressCount,
} = Dashboard()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">
    <!-- Welcome Title -->
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-800 mb-6 text-center">
      {{ t("dashboard_welcome", { userName }) }}
    </h1>

    <!-- Main Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <!-- Create Template -->
      <RouterLink to="/newTemplate" v-if="role && (role === 'client' || role === 'admin')" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">{{ t("dashboard_create_template_title") }}</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_create_template_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_create_template_button") }}
          </button>
        </div>
        <img src="/public/createTemplate.png" alt="Create Template" class="w-24 h-24 object-contain" />
      </RouterLink>

      <!-- Create Catalogs -->
      <RouterLink to="/catalogList" v-if="role && (role === 'client' || role === 'admin')" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <div class="flex items-center mb-2">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">{{ t("dashboard_create_catalog_title") }}</h2>
            <span v-if="inProgressCount > 0" class="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full ml-2 animate-bounce">{{ inProgressCount }}</span>
          </div>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_create_catalog_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_create_catalog_button") }}
          </button>
        </div>
        <img src="/public/createCatalog.png" alt="Create Catalogs" class="w-24 h-24 object-contain" />
      </RouterLink>

      <!-- View Catalogs -->
      <RouterLink to="/catalogs" v-if="role && (role === 'client' || role === 'admin')" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">{{ t("dashboard_view_catalog_title") }}</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_view_catalog_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_view_catalog_button") }}
          </button>
        </div>
        <img src="/public/viewCatalog.png" alt="View Catalogs" class="w-24 h-24 object-contain" />
      </RouterLink>

      <!-- Template Operations -->
      <RouterLink to="/templates" v-if="role === 'admin'" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">{{ t("dashboard_template_ops_title") }}</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_template_ops_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_template_ops_button") }}
          </button>
        </div>
        <img src="/public/templateOperations.png" alt="Template Operations" class="w-24 h-24 object-contain" />
      </RouterLink>

      <!-- Fields Operations -->
      <RouterLink to="/fields" v-if="role === 'admin'" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">{{ t("dashboard_field_ops_title") }}</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_field_ops_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_field_ops_button") }}
          </button>
        </div>
        <img src="/public/fieldsOperations.png" alt="Fields Operations" class="w-24 h-24 object-contain" />
      </RouterLink>

      <!-- Notifications -->
      <RouterLink to="/notifications" v-if="role === 'admin'" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <div class="flex items-center mb-2">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">{{ t("dashboard_notifications_title") }}</h2>
            <span v-if="pendingCount > 0" class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 animate-bounce">{{ pendingCount }}</span>
          </div>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_notifications_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_notifications_button") }}
          </button>
        </div>
        <img src="/public/notifications.png" alt="Manage Notifications" class="w-24 h-24 object-contain" />
      </RouterLink>

      <!-- User Operations -->
      <RouterLink to="/users" v-if="role === 'admin'" class="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition dark:bg-gray-800">
        <div class="flex-1 pr-4">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">{{ t("dashboard_users_title") }}</h2>
          <p class="text-gray-500 dark:text-gray-300 mb-4">{{ t("dashboard_users_desc") }}</p>
          <button class="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:px-8">
            {{ t("dashboard_users_button") }}
          </button>
        </div>
        <img src="/public/usersOperations.png" alt="User Operations" class="w-24 h-24 object-contain" />
      </RouterLink>
    </div>
  </div>
</template>
