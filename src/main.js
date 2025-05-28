import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

// Traducciones
const i18n = createI18n({
  locale: 'es', // idioma por defecto
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en,
    es
  }
})

// Toastification
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Título dinámico
let title = 'Twistic';
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    title = to.meta.title;
  } else {
    document.title = 'Twistic';
  }
});

// Axios config
axios.defaults.withCredentials = true;

// Opciones de notificación
const options = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 6000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
};

// Crear app
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(Toast, options);
app.use(i18n);
app.mount('#app');
