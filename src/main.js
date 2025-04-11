/* import './assets/main.css' */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import PrimeVue from 'primevue/config';
import { abilitiesPlugin } from '@casl/vue'
import defineUserAbility from './abilities/abilities';

// Título de la página
let title = 'Twistic';
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    title = to.meta.title;
  } else {
    document.title = 'Twistic';
  }
});

axios.defaults.withCredentials = true;

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);


app.mount('#app')
