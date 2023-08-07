import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Pages/DashboardPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Pages/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Pages/RegisterPage.vue')
    }
  ]
})

export default router
