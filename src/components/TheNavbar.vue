<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axiosInstance from '@/axiosconfig/axiosInstance'
import useLogout from '@/composables/useLogout'

const { logout } = useLogout()
const isTopRightMenuOpen = ref(false)
const user = ref(null)
const isScrolled = ref(false)

const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/profile')
    user.value = response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

onMounted(() => {
  fetchUserProfile()
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}
const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const navLinks = [
  { name: 'All Services', icon: 'fas fa-cogs', category: '' },
  { name: 'Hotels', icon: 'fas fa-bed', category: 'Stays' },
  { name: 'Flights', icon: 'fas fa-plane', category: 'Flights' },
  { name: 'Car Rentals', icon: 'fas fa-car', category: 'Car Rentals' },
  { name: 'Tour Packages', icon: 'fas fa-camera-retro', category: 'Attractions' }
]
</script>

<template>
  <header class="fixed w-full z-50 transition-all duration-300" :class="{
    'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg': isScrolled,
    'bg-gradient-to-r from-blue-500 to-blue-600': !isScrolled
  }">
    <!-- Top Navigation -->
    <div class="max-w-7xl mx-auto px-6 py-0">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <img src="@/assets/images/logo4.png" class="h-10" alt="MiteExplorers Logo" />
          <span class="text-xl font-bold text-white hidden sm:inline">MiteExplorers</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-6">
          <!-- Currency Selector -->
          <div class="relative group">
            <a href="https://www.oanda.com/currency-converter/en/?from=USD&to=KES&amount=100" target="_blank"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition">
              <span class="font-medium text-white">USD</span>
              <img class="h-6 w-6 rounded-full" src="@/assets/images/usa.png" alt="USA Flag" />
            </a>
          </div>

          <router-link to="/help" class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <i class="fas fa-question-circle text-white"></i>
            <span class="text-white">Help</span>
          </router-link>

          <router-link to="/ListProperty"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <i class="fas fa-building text-white"></i>
            <span class="text-white">List Property</span>
          </router-link>

          <!-- User Authentication Links -->
          <template v-if="user">
            <div class="relative" ref="dropdownRef">
              <button @click="toggleDropdown"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white">
                <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span>{{ user.name }}</span>
                <!-- Chevron -->
                <svg :class="[
                  'w-4 h-4 transition-transform duration-300',
                  dropdownOpen ? 'rotate-180' : ''
                ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 py-2">
                <router-link to="/profile"
                  class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-all duration-200">
                  <i class="fas fa-user text-blue-500"></i>
                  <span>My Profile</span>
                </router-link>

                <button @click="logout"
                  class="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-all duration-200">
                  <i class="fas fa-sign-out-alt text-red-500"></i>
                  <span>Logout</span>
                </button>
              </div>

            </div>
          </template>
          <template v-else>
            <router-link to="/login"
              class="px-4 py-2 rounded-lg bg-white/0 border border-white text-white hover:bg-white hover:text-blue-600 transition">
              Login
            </router-link>
            <router-link to="/signup" class="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition">
              Sign Up
            </router-link>
          </template>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="isTopRightMenuOpen = !isTopRightMenuOpen"
          class="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <div v-if="isTopRightMenuOpen" class="lg:hidden mt-4 pb-4 space-y-2">
          <a href="https://www.oanda.com/currency-converter/en/?from=USD&to=KES&amount=100" target="_blank"
            class="flex items-center space-x-2 px-4 py-3 rounded-lg bg-white/10 text-white">
            <span>USD</span>
            <img class="h-6 w-6 rounded-full" src="@/assets/images/usa.png" alt="USA Flag" />
          </a>

          <router-link to="/help" class="flex items-center space-x-2 px-4 py-3 rounded-lg bg-white/10 text-white">
            <i class="fas fa-question-circle"></i>
            <span>Help</span>
          </router-link>

          <router-link to="/ListProperty"
            class="flex items-center space-x-2 px-4 py-3 rounded-lg bg-white/10 text-white">
            <i class="fas fa-building"></i>
            <span>List Property</span>
          </router-link>

          <template v-if="user">
            <div class="px-4 py-3 rounded-lg bg-white/10">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="text-white">{{ user.name }}</span>
              </div>
              <div class="mt-2 space-y-2">
                <router-link to="/profile" class="block px-4 py-2 rounded-lg bg-white/5 text-white">
                  My Profile
                </router-link>
                <router-link to="/bookings" class="block px-4 py-2 rounded-lg bg-white/5 text-white">
                  My Bookings
                </router-link>
                <button @click="logout" class="w-full text-left px-4 py-2 rounded-lg bg-red-500/10 text-red-300">
                  Logout
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="block px-4 py-2 rounded-lg bg-white/10 text-white text-center">
              Login
            </router-link>
            <router-link to="/signup" class="block px-4 py-2 rounded-lg bg-white text-blue-600 text-center">
              Sign Up
            </router-link>
          </template>
        </div>
      </transition>
    </div>

    <!-- Category Navigation -->
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-2">
        <div class="flex overflow-x-auto space-x-2 py-1 hide-scrollbar">
          <router-link v-for="link in navLinks" :key="link.name" :to="{ path: '/', query: { category: link.category } }"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition flex items-center space-x-2 border border-white/20"
            active-class="bg-white/10 border-white/30">
            <i :class="link.icon"></i>
            <span class="hidden sm:inline">{{ link.name }}</span> <!-- <-- this is the magic -->
          </router-link>

        </div>
      </div>
    </div>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-24"></div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Smooth transitions */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
