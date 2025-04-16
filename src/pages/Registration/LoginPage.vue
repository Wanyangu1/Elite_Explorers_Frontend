<script setup>
import useAuth from '@/composables/useAuth'
import bgImage from '@/assets/images/staycation/bg.png'

const bgImageUrl = bgImage
const { email, password, login, errorMessage } = useAuth()
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Left Side: Full-Height Image -->
    <div class="hidden md:block w-3/4 bg-cover bg-center">
      <img :src="bgImageUrl" alt="Fallback background image" class="w-full h-full object-cover" />

    </div>

    <!-- Right Side: Logo & Login Form -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center p-10">
      <!-- Logo -->
      <img src="@/assets/images/logo1.png" class="h-16 mb-2" alt="AfroartSafari" />
      <h2 class="text-3xl font-bold text-gray-800">MiteExplorers.com</h2>
      <p class="text-sm font-bold text-gray-400 mb-6">Move · Inspire · Travel · Explore</p>

      <!-- Login Form -->
      <form @submit.prevent="login" class="w-full max-w-md">
        <div class="mb-4">
          <label for="email" class="block text-md font-medium text-gray-700">Email Address:</label>
          <input v-model="email" type="text" id="email" placeholder="Enter your email"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <!-- 🔴 Error message block -->
        <div v-if="errorMessage" class="mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg p-3">
          {{ errorMessage }}
        </div>

        <button type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300">
          Login
        </button>

        <p class="mt-4 text-center text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-blue-500 hover:underline">Sign up</router-link>
        </p>
      </form>
      <div class="text-center mt-10 text-sm">
        <p>&copy; 2025 Mite_Explorers. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive Image Styling */
.bg-cover {
  background-size: cover;
  background-position: center;
  height: 100vh;
  /* Full height */
}
</style>
