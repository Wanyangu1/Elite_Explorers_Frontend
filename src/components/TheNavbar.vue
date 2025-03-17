<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axiosconfig/axiosInstance'
import useLogout from '@/composables/useLogout'

const { logout } = useLogout()
const isTopRightMenuOpen = ref(false)
const isBottomMenuOpen = ref(false)
const user = ref(null)

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
})
</script>

<template>
  <div class="text-white" style="background-color: rgba(59, 130, 246, 0.7);">
    <!-- Top Navigation -->
    <div class="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center relative">
      <a href="/" class="text-2xl font-bold">
        <span class="text-white">MiteExplorers.com</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="https://www.oanda.com/currency-converter/en/?from=USD&to=EUR&amount=1"
          class="text-white font-semibold hover:text-gray-300">
          USD
        </router-link>
        <img class="rounded-full h-8 w-8" src="@/assets/images/usa.png" alt="USA Flag" />
        <router-link to="/" class="text-white font-semibold hover:text-gray-300">
          <i class="fas fa-question-circle"></i> Help
        </router-link>
        <router-link to="/" class="text-white font-semibold hover:text-gray-300">
          List Your Property
        </router-link>

        <!-- User Authentication Links -->
        <template v-if="user">
          <div class="flex items-center space-x-4">
            <div class="border border-white text-white px-4 py-1 rounded-md font-semibold">
              <i class="fas fa-user"></i> {{ user.name }}
            </div>
            <button
              class="border border-white text-white px-4 py-1 rounded-md font-semibold hover:bg-red-600 hover:border-red-600 transition duration-300"
              @click="logout">
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <router-link to="/login"
            class="border-2 border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">
            Login
          </router-link>
          <router-link to="/signup"
            class="border-2 border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">
            Signup
          </router-link>
        </template>
      </div>

      <!-- Mobile Hamburger Menu -->
      <button class="md:hidden text-white text-xl" @click="isTopRightMenuOpen = !isTopRightMenuOpen">
        <i class="fas fa-bars"></i>
      </button>

      <div v-if="isTopRightMenuOpen"
        class="absolute top-0 right-0 mt-12 w-48 p-4 rounded-lg shadow-lg z-50 bg-blue-700">
        <!-- Currency Converter -->
        <router-link to="https://www.oanda.com/currency-converter/en/?from=USD&to=EUR&amount=1" target="_blank"
          class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
          <i class="fas fa-dollar-sign mr-2"></i> USD
        </router-link>

        <!-- Help -->
        <router-link to="/"
          class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
          <i class="fas fa-question-circle mr-2"></i> Help
        </router-link>

        <!-- List Your Property -->
        <router-link to="/"
          class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
          <i class="fas fa-building mr-2"></i> List Your Property
        </router-link>

        <!-- User Links -->
        <template v-if="user">
          <div class="block text-white py-2">
            <div class="flex items-center font-semibold">
              <i class="fas fa-user-circle mr-2"></i> {{ user.name }}
            </div>
            <button
              class="mt-2 border border-white text-white px-4 py-1 rounded-md font-semibold hover:bg-red-600 transition duration-300"
              @click="logout">
              <i class="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        </template>
        <template v-else>
          <!-- Login -->
          <router-link to="/login"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-sign-in-alt mr-2"></i> Login
          </router-link>

          <!-- Signup -->
          <router-link to="/signup"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-user-plus mr-2"></i> Signup
          </router-link>
        </template>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="px-6 py-2">
      <div class="max-w-screen-xl mx-auto flex justify-start space-x-6 hidden md:flex">
        <router-link to="/services"
          class="text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-bed"></i> Stays
        </router-link>
        <router-link to="/comingsoon"
          class="text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-plane"></i> Flights
        </router-link>
        <router-link to="/comingsoon"
          class="text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-car"></i> Car Rentals
        </router-link>
        <router-link to="/comingsoon"
          class="text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-camera-retro"></i> Attractions
        </router-link>
        <router-link to="/comingsoon"
          class="text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
          <i class="fas fa-taxi"></i> Airport Taxis
        </router-link>
      </div>

      <!-- Mobile Bottom Navigation -->
      <div class="md:hidden">
        <button class="text-white text-xl" @click="isBottomMenuOpen = !isBottomMenuOpen">
          <i class="fas fa-bars"></i>
        </button>
        <div v-if="isBottomMenuOpen" class="absolute top-0 left-0 mt-24 w-48 p-4 rounded-lg shadow-lg z-50 bg-blue-800">
          <router-link to="/services"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-bed mr-2"></i> Stays
          </router-link>
          <router-link to="/comingsoon"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-plane mr-2"></i> Flights
          </router-link>
          <router-link to="/comingsoon"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-car mr-2"></i> Car Rentals
          </router-link>
          <router-link to="/comingsoon"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-camera-retro mr-2"></i> Attractions
          </router-link>
          <router-link to="/comingsoon"
            class="flex items-center text-white py-2 hover:bg-blue-600 hover:text-white transition duration-300">
            <i class="fas fa-taxi mr-2"></i> Airport Taxis
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styling */
</style>
