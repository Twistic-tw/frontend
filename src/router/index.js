import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/UnlogViews/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/LoggedViews/DashboardView.vue')
    },
    {
      path: '/Pdf',
      name: 'pdf',
      component: () => import('../views/UserViews/MakePDFView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        try {
          await axios.post('https://api-catalogos.twistic.app/api/logout', {}, {
            withCredentials: true
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
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/UnlogViews/HomeView.vue')
    },
    {
      path: '/allcatalogues',
      name: 'allcatalogues',
      component: () => import('../views/AdminViews/AllCataloguesView.vue')
    },
    {
      path: '/allusers',
      name: 'allusers',
      component: () => import('../views/AdminViews/UsersListView.vue')
    },
  ],
})

export default router
