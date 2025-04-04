import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pdf',
      name: 'pdf',
      component: () => import('../views/UserViews/MakePDFView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/UnlogViews/LoginView.vue'),
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
