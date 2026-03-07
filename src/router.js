import { createRouter, createWebHistory } from 'vue-router'
import BattleArena from './components/BattleArena.vue'
import { useAuth } from './composables/useAuth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BattleArena,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./components/LandingPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('./components/FightHistory.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const { user, ready } = useAuth()
  await ready

  if (to.meta.requiresAuth && !user.value) {
    return { name: 'auth' }
  }

  if (to.meta.guestOnly && user.value) {
    return { name: 'home' }
  }
})

export default router
