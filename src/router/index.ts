// Настройка маршрутизатора для навигации между страницами (SPA)
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  // Использование истории браузера (HTML5 History API)
  history: createWebHistory(import.meta.env.BASE_URL),
  // Определение доступных маршрутов
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      // Маршрут к странице со списком экспонатов
      path: '/exhibits',
      name: 'exhibits',
      component: () => import('../views/ExhibitsView.vue')
    },
    {
      // Динамический маршрут для детального просмотра экспоната по ID
      path: '/exhibits/:id',
      name: 'exhibit-detail',
      component: () => import('../views/ExhibitDetailView.vue'),
      // Разрешение передачи параметров как пропсов (props)
      props: true
    },
    {
      path: '/visitors',
      name: 'visitors',
      component: () => import('../views/VisitorsView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue')
    }
  ]
})
export default router
