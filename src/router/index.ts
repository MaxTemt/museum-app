// Настройка маршрутизатора для навигации между страницами (SPA)
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  // Использование истории браузера (HTML5 History API)
  history: createWebHistory(import.meta.env.BASE_URL),
  // Определение доступных маршрутов
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/exhibits',
      name: 'exhibits',
      component: () => import('../views/ExhibitsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/exhibits/:id',
      name: 'exhibit-detail',
      component: () => import('../views/ExhibitDetailView.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/visitors',
      name: 'visitors',
      component: () => import('../views/VisitorsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Навигационный гард для защиты маршрутов
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem('museum_auth_user')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})
export default router
