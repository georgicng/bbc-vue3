import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      // route level code-splitting
      // this generates a separate chunk (Category.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (Products.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/details/:id',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (Products.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      // route level code-splitting
      // this generates a separate chunk (Products.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      // route level code-splitting
      // this generates a separate chunk (Faq.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FAQView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (Contact.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/support',
      name: 'support',
      // route level code-splitting
      // this generates a separate chunk (Support.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SupportView.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      // route level code-splitting
      // this generates a separate chunk (terms.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TermView.vue')
    },
    {
      path: '/success',
      name: 'success',
      // route level code-splitting
      // this generates a separate chunk (success.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SuccessView.vue')
    }
  ]
})

export default router
