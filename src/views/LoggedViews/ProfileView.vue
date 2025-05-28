<script setup lang="ts">
import { useUserProfile } from '../../composable/profile'
import BackButton from '@/components/BackButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { user, loading, error, formatDate } = useUserProfile()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-800 mb-6 text-center">
      {{ t('profile.title') }}
    </h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-300">
      {{ t('profile.loading') }}
    </div>

    <div
      v-else-if="!user"
      class="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-gray-700 dark:text-gray-200"
    >
      {{ t('profile.notFound') }}
    </div>

    <div v-else class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          {{ t('profile.name') }}
        </h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.nombre }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          {{ t('profile.email') }}
        </h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.email }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          {{ t('profile.role') }}
        </h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.cargo }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          {{ t('profile.activeCatalogs') }}
        </h2>
        <p class="text-gray-700 dark:text-gray-200">{{ user.active_catalogos }}</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          {{ t('profile.registrationDate') }}
        </h2>
        <p class="text-gray-700 dark:text-gray-200">{{ formatDate(user.created_at) }}</p>
      </div>
    </div>

    <div v-if="error" class="text-center text-red-500 mt-6">
      {{ t('profile.error') }}
    </div>

    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
</template>
