/* import './assets/main.css' */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import PrimeVue from 'primevue/config';

axios.defaults.withCredentials = true;

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);


app.mount('#app')
