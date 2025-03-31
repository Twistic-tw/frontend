/* import './assets/main.css' */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

axios.defaults.withCredentials = true;

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
axios.get('http://api-catalogos.twistic.app//sanctum/csrf-cookie', { withCredentials: true });

app.mount('#app')
