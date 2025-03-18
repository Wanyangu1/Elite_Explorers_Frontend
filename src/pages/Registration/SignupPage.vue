<script setup>
import useAuth from '@/composables/useAuth'
import bgImage from '@/assets/images/staycation/bg.png';

const { name, email, password, signup } = useAuth();
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Left Side: Background Image -->
    <div class="hidden md:block w-3/4">
      <img :src="bgImage" alt="Background Image" class="h-screen w-full object-cover" />
    </div>

    <!-- Right Side: Signup Form -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
      <!-- Logo -->
      <img src="@/assets/images/logo1.png" class="h-16 mb-4" alt="AI AA NGO" />
      <h2 class="text-3xl font-bold text-gray-800">MiteExplorers.com</h2>
      <p class="text-sm font-bold text-gray-400 mb-6">Move · Inspire · Travel · Explore</p>

      <!-- Signup Form -->
      <form @submit.prevent="signup" class="w-full max-w-md p-2">
        <div class="mb-2">
          <label for="name" class="block text-md font-medium text-gray-700">Full Name</label>
          <input v-model="name" type="text" id="name" placeholder="Enter your name"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-md font-medium text-gray-700">Email Address</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-md font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <button type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300">
          Sign Up
        </button>

        <p class="mt-4 text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Log in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
