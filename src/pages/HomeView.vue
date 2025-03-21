<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import useServices from '@/composables/useServices'
import bgImage from '@/assets/images/staycation/bg.png'
import geometricImage from '@/assets/images/geometric2.png'

const bgImageUrl = bgImage
const geometricUrlImage = geometricImage

const { searchQuery, filteredServices } = useServices()
const route = useRoute()

onMounted(() => {
  console.log('HomeView mounted')
})
</script>

<template>
  <TheNavbar />

  <!-- Hero Section -->
  <div class="relative h-96">
    <div class="absolute inset-0">
      <img :src="bgImageUrl" alt="Background image" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black opacity-40"></div>
    </div>
    <div class="relative z-10 h-full flex flex-col justify-center items-start text-white px-8 lg:px-16 space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold">Welcome to Mite_Explorers</h1>
      <p class="text-2xl md:text-xl font-bold max-w-xl text-blue-200">Move · Inspire · Travel · Explore</p>
      <p class="text-xl md:text-xl font-semi max-w-xl">
        Explore breathtaking destinations, indulge in luxurious stays, and enjoy effortless travel experiences—crafted
        to make every journey extraordinary.
      </p>
      <div class="space-y-4">
        <div class="flex space-x-4">
          <router-link to="/services"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-blue-800 hover:text-white">
            Explore Stays
          </router-link>
          <router-link to="/comingsoon"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-blue-800 hover:text-white">
            View More
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Bar Section -->
  <div class="relative py-8 bg-gray-50 px-4 md:px-16">
    <!-- Geometric Overlay -->
    <div class="absolute top-0 right-0 w-1/2 h-full hidden md:block">
      <img :src="geometricUrlImage" alt="Elite Explorers" class="w-full h-full object-cover opacity-50" />
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center mb-6 text-black">
      <h1 class="text-2xl md:text-4xl mb-2 font-bold">
        Explore Destinations, Activities and Experiences
      </h1>
      <p>Your travel agency of choice</p>
    </div>

    <!-- Search Bar -->
    <div class="relative z-10 max-w-3xl mx-auto flex items-center space-x-4">
      <input v-model="searchQuery" type="text" placeholder="Search for hotels, destinations..."
        class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
      <button
        class="bg-transparent border-2 border-black text-indigo-600 py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-indigo-600 hover:text-white transition">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </button>
    </div>

    <!-- Message for no results -->
    <div v-if="filteredServices.length === 0" class="text-center text-lg font-semibold text-red-600 mt-4">
      No results found for "{{ searchQuery }}".
    </div>
  </div>

  <!-- Featured Services Section -->
  <section class="py-16 relative bg-gray-200">
    <div class="absolute top-0 right-0 w-full h-full hidden md:block">
      <img :src="geometricUrlImage" alt="Elite Explorers" class="w-full h-full object-cover opacity-50" />
    </div>
    <div class="max-w-6xl mx-auto px-2">
      <h2 class="text-2xl font-bold mb-4">{{ route.query.category ? route.query.category : 'All Services' }}</h2>
      <p class="text-md mb-6">Explore the most luxurious services and destinations we offer.</p>

      <div v-if="filteredServices.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <router-link v-for="service in filteredServices" :key="service.id" :to="`/services/${service.id}`"
            class="block bg-white shadow-md rounded-lg p-4 hover:shadow-md transition duration-300 relative">
            <div v-if="service.image" class="mb-4">
              <img :src="service.image" alt="Service Image" class="w-full h-56 object-contain rounded-md" />
            </div>
            <h2 class="text-xl font-semibold">{{ service.title }}</h2>
            <p class="text-green-600 font-semibold">Provider: {{ service.provider }}</p>
            <p class="text-black">Price: USD {{ service.price }}</p>
            <!-- Availability Tag with Rating -->
            <div class="flex justify-between items-center">
              <p :class="[
                'px-2 py-1 rounded-full text-white text-sm inline-flex items-center',
                service.available ? 'bg-green-500' : 'bg-red-500'
              ]">
                {{ service.available ? 'Available' : 'Not Available' }}
              </p>
              <!-- Star Rating -->
              <div class="flex items-center space-x-1 text-yellow-400">
                <i v-for="n in 5" :key="n" class="fas"
                  :class="n <= service.rating ? 'fa-star' : 'fa-star-half-alt'"></i>
              </div>
            </div>

          </router-link>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No featured services available.</div>
    </div>
  </section>

  <TheFooter />
</template>
