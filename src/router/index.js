import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import LoginPage from '@/pages/Registration/LoginPage.vue'
import SignupPage from '@/pages/Registration/SignupPage.vue'
import ServiceDetail from '@/pages/services/ServiceDetail.vue'
import BookingPage from '@/pages/Booking/BookingPage.vue'
import ListProperty from '@/pages/services/ListProperty.vue'
import HelpPage from '@/pages/services/HelpPage.vue'
import TravelDocuments from '@/pages/Documents/TravelDocuments.vue'
import VisaApplication from '@/pages/Documents/VisaApplication.vue'

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
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
    },
    {
      path: '/documents',
      name: 'documents',
      component: TravelDocuments,
    },
    {
      path: '/visa',
      name: 'visa',
      component: VisaApplication,
    },
  ],
})

export default router
