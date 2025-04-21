import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';
import { useLogout } from '../composable/logout.js';

const { logout } = useLogout();

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
      path: '/pdf',
      name: 'pdf',
      component: () => import('../views/UserViews/MakePDFView.vue'),
      meta: { title: 'PDF' }
    },
    {
      path: '/templates',
      name: 'templates',
      component: () => import('../views/AdminViews/AllTemplatesView.vue'),
      meta: { title: 'Templates' }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        await logout();
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
      path: '/catalogs',
      name: 'catalogs',
      component: () => import('../views/AdminViews/AllCataloguesView.vue'),
      meta: { title: 'Catalogs List' }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/AdminViews/UsersListView.vue'),
      meta: { title: 'Users' }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/LoggedViews/NotificationCenter.vue'),
      meta: { title: 'Notifications' }
    },/*
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/ErrorViews/UnAuthorizedView.vue'),
      meta: { title: 'No autorizado' }
    }*/
  ],
})

// Proteger las rutas con Sanctum
router.beforeEach(async (to, from, next) => {
  const publicPages = ['home', 'login'];
  const requiresAuth = !publicPages.includes(to.name);

  if (!requiresAuth) {
    try {
      const response = await axios.get('https://api-catalogos.twistic.app/api/user');
      if (response.status === 200) {
        next();
      } else {
        next({ name: 'login' });
      }
    } catch (error) {
      next({ name: 'login' });
    }
  } else {
    next(); // Rutas públicas, deja pasar
  }
});

export default router
