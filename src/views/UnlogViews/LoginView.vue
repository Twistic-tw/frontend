<script setup lang="ts">
import '../../styles.css';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

// Datos del formulario
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);
const router = useRouter();

// Función de login
const logUser = async () => {
  error.value = null;
  loading.value = true;

  try {
    // Paso 1: Pedir cookies iniciales (XSRF-TOKEN y laravel_session)
    await axios.get(`${import.meta.env.VITE_SANCTUM_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    });

    // Paso 2: Obtener el token CSRF actual desde las cookies
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
    if (!xsrfToken) {
      throw new Error('No se encontró el token CSRF');
    }

    // Paso 3: Hacer login y dejar que el navegador actualice la laravel_session
    const response = await axios.post(`${import.meta.env.VITE_URL}/loginProcess`,
      {
        email: email.value,
        password: password.value
      },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken)
        }
      }
    );

    if (response.status === 200) {
      let userRole = response.data.user_rol[0] || 'client';

      switch (userRole) {
        case 'ROLE_ADMINISTRATOR':
          userRole = 'admin';
          break;
        default:
          userRole = 'client';
          break;
      }

      // Guardar datos del usuario
      sessionStorage.setItem('userRole', userRole);
      sessionStorage.setItem('userName', response.data.nombre);
      sessionStorage.setItem('userEmail', response.data.email);

      // Redirigir
      router.push('/dashboard');
    } else {
      error.value = 'Error inesperado';
    }

  } catch (err) {
    if (err.response?.status === 401) {
      error.value = 'Credenciales incorrectas';
    } else if (err.response?.status === 419) {
      error.value = 'Token CSRF inválido o caducado';
    } else {
      error.value = 'Error de conexión';
    }
    console.error(error.value, err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex-1 mt-[60px] flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-100 to-white">
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
              <RouterLink to="/passwordRecover" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</RouterLink>
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
          Contact with us for your own account!
        </p>
      </div>
    </div>
  </div>
</template>

