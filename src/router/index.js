import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/registro',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/registro/exito',
    name: 'RegisterSuccess',
    component: () => import('@/views/RegisterSuccessPage.vue'),
  },
  {
    path: '/precios',
    name: 'Pricing',
    component: () => import('@/views/PricingPage.vue'),
  },
  {
    path: '/caracteristicas',
    name: 'Features',
    component: () => import('@/views/FeaturesPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
