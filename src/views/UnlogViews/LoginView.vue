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

    console.log('CSRF cookie obtenida')

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

    console.log('Login exitoso:', response.data)
    if (response.status === 200 && response.data.user_rol) {
      let userRole = response.data.user_rol[0] || 'client'

      switch (userRole) {
        case 'ROLE_ADMINISTRATOR':
          userRole = 'admin'
          break
        default:
          userRole = 'client'
          break
      }

      sessionStorage.setItem('userRole', userRole)
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
    <div class="flex-1 mt-[60px] flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:bg-gradient-to-r dark:from-neutral-950 dark:via-none dark:to-slate-900 p-3">
        <div class="w-120 m-auto p-5 py-20 bg-white rounded-3xl shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)] dark:bg-gray-700">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-indigo-50">Log into your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form @submit.prevent="logUser()" class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">Email address</label>
                        <div class="mt-2">
                            <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">Password</label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm/6 text-gray-500">
                    You don't have an account?
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign up to have your own</a>
                </p>
            </div>
        </div>
    </div>
</template>
