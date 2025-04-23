<script setup lang="ts">
import '../../styles.css'
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink} from 'vue-router'


// Datos del formulario
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const router = useRouter()
const loading = ref(false);

// Función de login
const logUser = async () => {
  error.value = null

  try {
    // Primero pedimos el csrf-cookie para obtener XSRF-TOKEN y laravel_session
    await axios.get('https://api-catalogos.twistic.app/sanctum/csrf-cookie', {
      withCredentials: true,
    })

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
        }
      }
    )

    console.log("DATA LOGIN:", response.data);

    if (response.status === 200) {
      loading.value = true;
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
    if (err.response && err.response.status === 401) {
      error.value = 'Credenciales incorrectas';
    } else if (err.response && err.response.status === 419) {
      error.value = 'Token CSRF inválido o caducado';
    } else {
      error.value = 'Error de conexión';
    }
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
                <!-- campos email y password -->

                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Log in
                  </button>
                </div>

                <!-- Mostrar errores -->
                <div v-if="error" class="text-red-600 text-sm text-center">
                  {{ error }}
                </div>

                <!-- Opcional: Cargando -->
                <div v-if="loading" class="text-center text-gray-700 dark:text-indigo-50">
                  Cargando...
                </div>
              </form>


                <p class="mt-10 text-center text-sm/6 text-gray-500">
                    You don't have an account?
                    <RouterLink to="/signup" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign up to have your own</RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>
