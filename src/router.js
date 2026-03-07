import { createRouter, createWebHistory } from 'vue-router'
import BattleArena from './components/BattleArena.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BattleArena,
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./components/AuthPage.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('./components/FightHistory.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
