import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/UnlogViews/LoginView.vue'),
      meta: { title: 'Login' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/LoggedViews/DashboardView.vue'),
      meta: { title: 'Dashboard' }
    },
    {
      path: '/Pdf',
      name: 'pdf',
      component: () => import('../views/UserViews/MakePDFView.vue'),
      meta: { title: 'PDF' }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        try {

          // 1. Borrar el localStorage
          sessionStorage.clear();
          // 2. Borrar todas las cookies
          document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          });
          await axios.post('https://api-catalogos.twistic.app/api/logout', {}, {
            withCredentials: true,
          });

          next('/');
        } catch (error) {
          console.error('Error cerrando sesión:', error);
          // Redirigir al login aunque falle
          next('/');
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UnlogViews/SignupView.vue'),
      meta: { title: 'Singup' }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/UnlogViews/HomeView.vue'),
      meta: { title: 'Catálogos | Twistic' }
    },
    {
      path: '/allcatalogues',
      name: 'allcatalogues',
      component: () => import('../views/AdminViews/AllCataloguesView.vue'),
      meta: { title: 'Catálogos' }
    },
    {
      path: '/allusers',
      name: 'allusers',
      component: () => import('../views/AdminViews/UsersListView.vue'),
      meta: { title: 'Usuarios' }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/LoggedViews/NotificationCenter.vue')
    }
  ],
})

export default router
