import { createRouter, createWebHistory } from 'vue-router'
import BattleArena from './components/BattleArena.vue'
import { useAuth } from './composables/useAuth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BattleArena,
    meta: {
      requiresAuth: true,
      title: 'Who Wins? - Battle Arena',
      description: 'Choose two animals and watch AI decide the winner in the ultimate animal showdown!',
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./components/LandingPage.vue'),
    meta: {
      guestOnly: true,
      title: 'Who Wins? - The Ultimate Animal Showdown!',
      description: 'Pick two animals and find out who would win in the ultimate showdown! Fun, kid-friendly animal battle simulator.',
    },
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('./components/FightHistory.vue'),
    meta: {
      requiresAuth: true,
      title: 'Who Wins? - Fight History',
      description: 'Review your past animal battles and see which creatures came out on top.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { name: 'auth' },
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
