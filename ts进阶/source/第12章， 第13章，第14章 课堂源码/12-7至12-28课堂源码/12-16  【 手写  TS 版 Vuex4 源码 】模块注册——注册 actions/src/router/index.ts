import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import foodSort from '@/views/FoodSort.vue'
import hotelSort from '@/views/HotelSort.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'foodSort',
    component: foodSort,
  },
  {
    path: '/foodSort',
    name: 'foodSort',
    component: foodSort,
  },
  {
    path: '/hotelSort',
    name: 'hotelSort',
    component: hotelSort
  },

  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
