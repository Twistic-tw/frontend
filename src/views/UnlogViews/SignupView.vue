<script setup lang="ts">
import '../../styles.css'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Datos del formulario
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const nombre = ref('');
const cargo = ref('');

// Mensaje de estado
const statusMessage = ref('');

// Función para registrar
function handleRegister() {
  statusMessage.value = 'Registrando...';

  axios.post('https://api-catalogos.twistic.app/api/register', {
    nombre: nombre.value,
    cargo: cargo.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value
  })
  .then(() => {
    statusMessage.value = 'Registro completado. Redirigiendo...';
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  })
  .catch(error => {
    console.error('Error en el registro:', error);
    statusMessage.value = 'Error al registrar. Revisa los datos.';
  });
}
</script>


<template>
  <div class="flex-1 mt-[60px] flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:bg-gradient-to-r dark:from-neutral-950 dark:via-none dark:to-slate-900">
    <div class="w-120 m-auto p-5 py-20 rounded-3xl bg-white shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)] dark:bg-gray-700">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-indigo-50">Create an account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">Email address</label>
            <div class="mt-2">
              <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"/>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">Password</label>
            <div class="mt-2">
              <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"/>
            </div>
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-900 dark:text-indigo-50">Confirm Password</label>
            <div class="mt-2">
              <input v-model="passwordConfirmation" type="password" name="password_confirmation" id="password_confirmation" autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800"/>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">
              Sign up
            </button>
          </div>

          <!-- Mostrar mensaje de estado -->
          <div v-if="statusMessage" class="mt-4 text-center text-gray-900 dark:text-indigo-50">
            {{ statusMessage }}
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
          You already have an account?
          <a href="/login" class="font-semibold text-cyan-500 hover:text-cyan-400">Log in with it to enjoy the app</a>
        </p>
      </div>
    </div>
  </div>
</template>







