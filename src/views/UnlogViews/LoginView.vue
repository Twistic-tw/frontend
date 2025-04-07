<script setup lang="js">
import '../../styles.css'
import axios from 'axios';
import { ref } from 'vue'
</script>

<template>
    <div class="flex-1 mt-[60px] flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:bg-gradient-to-r dark:from-neutral-950 dark:via-none dark:to-slate-900 p-3">
        <div class="w-120 m-auto p-5 py-20 bg-white rounded-3xl shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)] dark:bg-gray-700">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-indigo-50">Log into your account</h2>
            </div>
    
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form @submit="logUser()" class="space-y-6" action="#" method="POST">
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

<script lang="js">

const email = ref('')
const password = ref('')
const error = ref(null)

const logUser = () => {
  axios.defaults.headers.common['Accept'] = 'application/json'

  axios.get('https://api-catalogos.twistic.app/sanctum/csrf-cookie', { 
    withCredentials: true,
    timeout: 15000,
  })
    .then(() => {
      axios.post('https://api-catalogos.twistic.app/api/loginProcess', {
        email: email.value,
        password: password.value
      }, {
        withCredentials: true,
        timeout: 15000,
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => {
        console.log('Login exitoso:', response.data)
      })
      .catch(err => {
        console.error('Error en login:', err)
        console.log('Mal usuario')
      })
    })
    .catch(err => {
      if (err.code === 'ECONNABORTED') {
        error.value = 'Tiempo de espera agotado'
      } else if (err.response && err.response.status === 401) {
        error.value = 'Credenciales incorrectas'
      } else {
        error.value = 'Error de conexión'
      }
      console.error('Error csrf-cookie:', err)
    })
}

</script>