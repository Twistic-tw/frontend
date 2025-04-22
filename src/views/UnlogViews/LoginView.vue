<script setup lang="ts">
import '../../styles.css'
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'


// Datos del formulario
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const router = useRouter()

// Función para obtener el valor de una cookie
function getCookie(name: string): string {
  const value: string = `; ${document.cookie}`
  const parts: string[] = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? ''
  return ''
}

// Función de login
const logUser = async () => {
  error.value = null

  try {
    // Primero pedimos el csrf-cookie para obtener XSRF-TOKEN y laravel_session
    await axios.get('https://api-catalogos.twistic.app/sanctum/csrf-cookie', {
      withCredentials: true,
    })

    // Recuperamos el XSRF-TOKEN de la cookie
    const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'))

    // Ahora enviamos el login
    const response = await axios.post('https://api-catalogos.twistic.app/api/loginProcess',
      {
        email: email.value,
        password: password.value
      },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrfToken
        }
      }
    )

    console.log("DATA LOGIN:", response.data);

    if (response.status === 200) {
      let userRole = response.data.user_rol[0] || 'client'

      switch (userRole) {
        case 'ROLE_ADMINISTRATOR':
          userRole = 'admin'
          break
        default:
          userRole = 'client'
          break
      }

      // Guardar los datos principales del usuario
      sessionStorage.setItem('userRole', userRole)
      sessionStorage.setItem('userName', response.data.nombre);
      sessionStorage.setItem('userEmail', response.data.email);
      router.push('/dashboard')
    } else {
      error.value = 'Error inesperado'
    }

  } catch (err) {
    console.error('Error en login:', err)
    error.value = 'Error de conexión'
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 px-6 py-12">
    <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,_0,_0,_0.1)] dark:bg-gray-800">
      <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Log into your account
      </h2>

      <form @submit.prevent="logUser()" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email address
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            autocomplete="email"
            required
            class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            autocomplete="current-password"
            required
            class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
          />
          <div class="text-right mt-2">
            <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Log In
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        You don't have an account?
        <RouterLink to="/signup" class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
          Sign up to have your own
        </RouterLink>
      </p>
    </div>
  </div>
</template>

