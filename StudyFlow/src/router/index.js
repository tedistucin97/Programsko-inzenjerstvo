import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import SubjectsView from '../views/SubjectsView.vue'
import TasksView from '../views/TasksView.vue'
import StatsView from '../views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'moji-kolegiji',
          name: 'subjects',
          component: SubjectsView,
        },
        {
          path: 'svi-zadaci',
          name: 'tasks',
          component: TasksView,
        },
        {
          path: 'statistika',
          name: 'stats',
          component: StatsView,
        },
      ],
    },
  ],
})

let authReady = false

const waitForAuth = () => {
  if (authReady) return Promise.resolve()
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      authReady = true
      unsubscribe()
      resolve()
    })
  })
}

router.beforeEach(async (to, _from, next) => {
  await waitForAuth()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = auth.currentUser

  if (requiresAuth && !user) {
    next({ name: 'login' })
    return
  }

  if ((to.name === 'login' || to.name === 'register') && user) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
