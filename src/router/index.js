import { createRouter, createWebHistory, ref } from 'vue-router'

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

// Creamos una referencia reactiva para almacenar el usuario logueado
// Esto se mantiene en memoria mientras no se recargue la página
const user = ref<User | null>(null)

// Guard de navegación que se ejecuta antes de cada cambio de ruta
router.beforeEach(async (to, from, next) => {
  // Comprobamos si la ruta que vamos a visitar requiere autenticación
  const requiresAuth = to.meta.requiereNavAdmin;

  // Inicializamos la variable para saber si el usuario está logueado
  let isLoggedIn = false;

  // Si todavía no hemos guardado los datos del usuario...
  if (!user.value) {
    try {
      // Paso 1: Solicitamos la cookie CSRF (Laravel Sanctum la requiere antes de hacer login o leer /user)
      await fetch(`${import.meta.env.VITE_SANCTUM_URL}/sanctum/csrf-cookie`, {
        credentials: 'include', // Incluimos cookies en la petición
      });

      // Paso 2: Solicitamos los datos del usuario logueado
      const res = await fetch(`${import.meta.env.VITE_URL}/user`, {
        credentials: 'include',
      });

      // Si la respuesta es correcta (status 200)...
      if (res.ok) {
        // Guardamos el usuario en memoria para no repetir la llamada en futuras rutas
        user.value = await res.json();
        isLoggedIn = true;
      }
    } catch {
      // Si falla cualquier paso, marcamos que no hay sesión activa
      isLoggedIn = false;
    }
  } else {
    // Si ya teníamos el usuario en memoria, consideramos que está logueado
    isLoggedIn = true;
  }

  // Si la ruta requiere autenticación y el usuario no está logueado, redirigimos al login
  if (requiresAuth && !isLoggedIn) {
    return next('/login');
  }

  // En cualquier otro caso, permitimos continuar a la ruta solicitada
  return next();
});



export default router
