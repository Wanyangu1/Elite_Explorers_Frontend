import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import LoginPage from '@/pages/Registration/LoginPage.vue'
import SignupPage from '@/pages/Registration/SignupPage.vue'
import ServiceDetail from '@/pages/services/ServiceDetail.vue'
import BookingPage from '@/pages/Booking/BookingPage.vue'
import ListProperty from '@/pages/services/ListProperty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      component: BookingPage,
    },
    {
      path: '/ListProperty',
      name: 'ListProperty',
      component: ListProperty,
    },
  ],
})

export default router
