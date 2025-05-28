<script setup lang="ts">
import '../../styles.css'
import { Contact } from '../../composable/Contact'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const {
  email,
  name,
  message,
  statusMessage,
  handleRegister
} = Contact()
</script>

<template>
  <div class="flex-1 mt-[60px] flsex-col justify-center px-6 py-12 lg:px-8 from-gray-100 to-white">
    <div class="w-120 m-auto p-5 py-20 rounded-3xl bg-white shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)] dark:bg-gray-700">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-indigo-50">
          {{ t("contact_title") }}
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleRegister">

          <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">
              {{ t("name_label") }}
            </label>
            <div class="mt-2">
              <input v-model="name" type="text" name="name" id="name" autocomplete="name"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"/>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">
              {{ t("email_contact_label") }}
            </label>
            <div class="mt-2">
              <input v-model="email" type="email" name="email" id="email" autocomplete="email"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"/>
            </div>
          </div>

          <div>
            <label for="message" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">
              {{ t("message_label") }}
            </label>
            <div class="mt-2">
              <textarea v-model="message" name="message" id="message" rows="4"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"
              ></textarea>
            </div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">
              {{ t("send_button") }}
            </button>
          </div>

          <div v-if="statusMessage" class="mt-4 text-center text-gray-900 dark:text-indigo-50">
            {{ statusMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
