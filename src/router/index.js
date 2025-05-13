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
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LoggedViews/LogoutView.vue'),
      meta: { title: 'Logout' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/UnlogViews/ContactView.vue'),
      meta: { title: 'Contact' }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/UnlogViews/HomeView.vue'),
      meta: { title: 'Catálogos | Twistic'}
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/LoggedViews/DashboardView.vue'),
      meta: { title: 'Dashboard' , requiereNavAdmin: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/LoggedViews/ProfileView.vue'),
      meta: { title: 'Profile' , requiereNavAdmin: true}
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: () => import('../views/UserViews/MakePDFView.vue'),
      meta: { title: 'PDF' , requiereNavAdmin: true}
    },
    {
      path: '/templates',
      name: 'templates',
      component: () => import('../views/AdminViews/AllTemplatesView.vue'),
      meta: { title: 'Templates' , requiereNavAdmin: true}
    },
    {
      path: '/newTemplate',
      name: 'newTemplate',
      component: () => import('../views/LoggedViews/NewTemplateView.vue'),
      meta: { title: 'New Template' , requiereNavAdmin: true}
    },
    {
      path: '/fields',
      name: 'fields',
      component: () => import('../views/AdminViews/AllFieldsView.vue'),
      meta: { title: 'Fields' , requiereNavAdmin: true}
    },
    {
      path: '/newCatalog',
      name: 'newCatalog',
      component: () => import('../views/LoggedViews/NewCatalogView.vue'),
      meta: { title: 'Create Catalog' , requiereNavAdmin: true}
    },
    {
      path: '/catalogList',
      name: 'catalogList',
      component: () => import('../views/LoggedViews/AprovedCatalogView.vue'),
      meta: { title: 'Aproved Catalogs' , requiereNavAdmin: true}
    },
    {
      path: '/catalogs',
      name: 'catalogs',
      component: () => import('../views/LoggedViews/AllCataloguesView.vue'),
      meta: { title: 'Catalogs List' , requiereNavAdmin: true}
    },
    {
      path: '/customizePdf/:id',
      name: 'customizePdf',
      component: () => import('../views/LoggedViews/CustomizePdfView.vue'),
      meta: { title: 'Customize PDF' , requiereNavAdmin: true}
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/AdminViews/UsersListView.vue'),
      meta: { title: 'Users Management' , requiereNavAdmin: true}
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/LoggedViews/NotificationCenter.vue'),
      meta: { title: 'Notifications' , requiereNavAdmin: true}
    }
  ],
})

// Navigation Guard

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiereNavAdmin;
  let isLoggedIn = false;

  try {
    // Asegura nueva cookie XSRF al cargar
    await fetch(`${import.meta.env.VITE_SANCTUM_URL}/sanctum/csrf-cookie`, {
      credentials: 'include'
    });

    // Verifica sesión
    const res = await fetch(`${import.meta.env.VITE_URL}/user`, {
      credentials: 'include',
    });

    // Verifica si la respuesta es exitosa
    if (res.ok) {
      const userData = await res.json();
      isLoggedIn = true;
      // Verifica si el correo electrónico de la sesión coincide con el del usuario
      const sessionEmail = sessionStorage.getItem('userEmail');
      // Si no coincide, cierra sesión
      if (sessionEmail && userData.email !== sessionEmail) {
        sessionStorage.clear();
        return next({ path: '/login', query: { redirect: to.fullPath } });
      }
      // Almacena el correo electrónico del usuario en sessionStorage
      sessionStorage.setItem('userEmail', userData.email);
    } else {
      isLoggedIn = false;
    }

  } catch (error) {
    console.warn('Error al verificar autenticación:', error);
  }

  if (requiresAuth && !isLoggedIn) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  return next();
});


export default router
