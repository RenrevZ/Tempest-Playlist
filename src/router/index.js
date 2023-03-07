import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { projectAuth } from '@/firebase/config'

const requireAuth = (to,from,next) => {
  let user = projectAuth.currentUser

  if(!user){
    next({name:'login'})
  }else{
    next()
  }
}
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
    component:  () => import('@/views/playlist/Create'),
    beforeEnter: requireAuth
  },
  {
    path: '/index',
    name: 'Index',
    component:  () => import('@/views/playlist/index'),
    beforeEnter: requireAuth
  },
  {
    path: '/playlis/:id',
    name: 'PlaylistDetails',
    component:  () => import('@/views/playlist/Show'),
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/playlist/user',
    name: 'UserPlaylist',
    component:  () => import('@/views/UserPlaylist'),
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
