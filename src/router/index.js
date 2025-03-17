import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import LoginPage from '@/pages/Registration/LoginPage.vue'
import SignupPage from '@/pages/Registration/SignupPage.vue'
import ServiceDetail from '@/pages/services/ServiceDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/services',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/services/:id',
      name: 'services',
      component: ServiceDetail,
    },
    {
      path: '/booking',
      name: 'BookingPage',
      component: () => import('@/pages/Booking/BookingPage.vue'),
      props: (route) => ({ ...route.query }),
    },
  ],
})

export default router
