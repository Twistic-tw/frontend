/* import './assets/main.css' */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import PrimeVue from 'primevue/config';
import { abilitiesPlugin } from '@casl/vue'
import { defineAbilitiesFor } from './abilities'

axios.defaults.withCredentials = true;
const loadingApp = createApp(LoadingScreen);
loadingApp.mount('#app');

async function bootstrap() {
  try {
    // Consultar al backend el usuario actual
    const response = await axios.get('https://api-catalogos.twistic.app/api/user', {withCredentials: true});

    // Guarda la respuesta
    const user = response.data;
    // Extrae el rol
    const userRole = user.roles[0];

    // Crear las abilities según su rol
    const ability = defineAbilitiesFor(userRole);

    // Crear y montar la app
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(PrimeVue);
    app.use(abilitiesPlugin, ability)

    app.mount('#app');
  } catch (error) {
    console.error('Error al obtener el usuario:', error);

    if (error.response && error.response.status === 401) {
      // Si el usuario no está autenticado, redirigir al login
      window.location.href = '/';
    }else {
      // Manejar otros errores
      console.error('Error inesperado:', error);
    }
  }
}

bootstrap();

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);


app.mount('#app')
