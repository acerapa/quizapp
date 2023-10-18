import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Pages/HomeView.vue'

// routes
import quizRoutes from './quiz-routes.js'

// middleware
import { isAuthenticated } from '../middleware/middleware.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/layout/WithoutSideNav.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Pages/LoginPage.vue'),
          meta: {
            title: 'Quiz App | Login'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/Pages/RegisterPage.vue'),
          meta: {
            title: 'Quiz App | Register'
          }
        },
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            title: 'Quiz App | Home'
          }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: 'Quiz App | About'
          }
        },
      ]
    },
    {
      path: '/',
      component: () => import('../views/layout/WithSideNav.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Pages/DashboardPage.vue'),
          meta: {
            title: 'Quiz App | Dashboard',
            requiresAuth: true
          }
        },
        {
          path: '/files',
          name: 'files',
          component: () => import('../views/Pages/FilesPage.vue'),
          meta: {
            title: 'Quiz App | Files',
            requiresAuth: true
          }
        },
        ...quizRoutes
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {

    // check auth
    if (isAuthenticated()) next()
    else next({ name: 'login' })

  } else {
    next()
  }
})

export default router
