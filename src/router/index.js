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
import GreenCard from '@/pages/Documents/GreenCard.vue'
import ProfilePage from '@/pages/Registration/ProfilePage.vue'
import TravelDocumentsPage from '@/pages/Documents/TravelDocumentsPage.vue'

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
    {
      path: '/greencard',
      name: 'greencard',
      component: GreenCard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/travel-documents',
      name: 'travel-documents',
      component: TravelDocumentsPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ top: 0, behavior: 'smooth' })
        }, 100) // small delay to ensure DOM is ready
      })
    }
  },
})

export default router
