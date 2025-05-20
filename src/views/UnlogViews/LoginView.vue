<script setup lang="ts">
import '../../styles.css'
import { Login } from '../../composable/Login'

const {
  email,
  password,
  loading,
  error,
  logUser
} = Login()
</script>

<template>
  <div class="flex-1 mt-[60px] flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
    <div class="max-w-md w-full mx-auto p-6 sm:p-10 bg-white rounded-3xl shadow-lg dark:bg-gray-700">
      <div class="text-center">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-indigo-50">Log into your account</h2>
      </div>

      <div class="mt-8">
        <form @submit.prevent="logUser()" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900 dark:text-indigo-50">Email address</label>
            <div class="mt-2">
              <input v-model="email" type="email" name="email" id="email" autocomplete="email"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm dark:bg-gray-500 dark:text-indigo-50 dark:border-gray-500 dark:focus:ring-gray-800" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-900 dark:text-indigo-50">Password</label>
              <!--<RouterLink to="/passwordRecover" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</RouterLink>-->
            </div>
            <div class="mt-2">
              <input v-model="password" type="password" name="password" id="password" autocomplete="current-password"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm dark:bg-gray-500 dark:text-indigo-50 dark:border-gray-500 dark:focus:ring-gray-800" />
            </div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Log in</button>
          </div>
          <div v-if="loading" class="flex justify-center items-center mt-10">
            <div class="flex items-center space-x-4">
              <!-- Spinner Dual Ring -->
              <div class="w-8 h-8 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>

              <!-- Texto bonito -->
              <span class="text-lg font-semibold text-gray-700 dark:text-indigo-50 animate-pulse">
                Loading, please wait...
              </span>
            </div>
          </div>

          <div v-if="error" class="text-red-500 text-sm mt-2">
            {{ error }}
          </div>

        </form>

        <p class="mt-10 text-center text-sm text-gray-600 dark:text-indigo-50">
          <RouterLink to="/contact" class="text-blue-600 hover:underline dark:text-blue-400">
            Contact with us for your own account!
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

