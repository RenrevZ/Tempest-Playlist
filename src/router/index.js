import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component:  () => import('../views/auth/Login')
  },
  {
    path: '/signup',
    name: 'signup',
    component:  () => import('../views/auth/Signup')
  },
  {
    path: '/playlist/create',
    name: 'Createplaylist',
    component:  () => import('@/views/playlist/Create')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
