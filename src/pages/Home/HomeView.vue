<script setup>
import { ref, onMounted } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import axiosInstance from '@/axiosconfig/axiosInstance'

const hotels = ref([])
const filteredHotels = ref([])
const wishlist = ref([])
const trendingDestinations = ref([])
const searchQuery = ref('')

const toggleWishlist = (hotelId) => {
  if (wishlist.value.includes(hotelId)) {
    wishlist.value = wishlist.value.filter((id) => id !== hotelId)
  } else {
    wishlist.value.push(hotelId)
  }
}

const fetchHotels = async () => {
  try {
    const hotelResponse = await axiosInstance.get(`/api/hotels/`)
    const hotelsData = hotelResponse.data

    const imageResponse = await axiosInstance.get(`/api/hotel-images/`)
    const hotelImagesData = imageResponse.data

    hotels.value = hotelsData.map((hotel) => {
      const relatedImages = hotelImagesData.filter((image) => image.hotel === hotel.id)
      if (relatedImages.length > 0) {
        hotel.image = relatedImages[0].image
      }
      return hotel
    })

    filteredHotels.value = hotels.value

    trendingDestinations.value = hotelImagesData.slice(0, 5)
  } catch (error) {
    console.error('Error fetching hotels and images:', error)
  }
}

const filterHotels = () => {
  if (searchQuery.value.trim() === '') {
    filteredHotels.value = hotels.value
  } else {
    filteredHotels.value = hotels.value.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
}

// Fetch the hotels when the component is mounted
onMounted(fetchHotels)

// Scroll functions for the carousel
const scrollContainer = ref(null)

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

const videoRef = ref(null)

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.playbackRate = 0.4
  }
})
</script>

<template>
  <TheNavbar />

  <!-- Hero Section with Background Video -->
  <div class="relative h-96">
    <video ref="videoRef" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover">
      <source src="@/assets/images/staycation/video/stay1.mp4" type="video/mp4" />
      <img src="@/assets/images/staycation/fallback.jpg" alt="Fallback background image"
        class="absolute inset-0 w-full h-full object-cover" />
    </video>
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative h-full flex flex-col justify-center items-start text-white px-8 lg:px-16 space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold">Welcome to Mite_Explorers</h1>
      <P class="text-2xl md:text-xl font-bold max-w-xl">Move. Inspire . Travel. Explore</P>
      <p class="text-xl md:text-xl font-semi max-w-xl">
        Discover handpicked destinations, luxurious stays, and seamless travel experiences designed
        to make every journey unforgettable.
      </p>
      <div class="space-y-4">
        <div class="flex space-x-4">
          <router-link to="/services"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-blue-600 hover:text-white">
            Explore Stays
          </router-link>
          <router-link to="/comingsoon"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-indigo-600 hover:text-white">
            Book Flights
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Bar Section -->
  <div class="py-8 bg-gray-50 px-4 md:px-16">
    <div class="max-w-3xl mx-auto flex items-center space-x-4">
      <input v-model="searchQuery" @input="filterHotels" type="text" placeholder="Search for hotels, destinations..."
        class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
      <button @click="filterHotels"
        class="bg-transparent border-2 border-black text-indigo-600 py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-indigo-600 hover:text-white transition">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </button>
    </div>
  </div>

  <!-- Message for no results -->
  <div v-if="filteredHotels.length === 0" class="text-center text-lg font-semibold text-red-600 mt-4">
    No results found for "{{ searchQuery }}".
  </div>

  <!-- Property Cards Section -->
  <section class="py-16 bg-gray-100">
    <div class="px-4">
      <h2 class="text-2xl font-bold mb-2">Property types unique to USA</h2>
      <p class="text-md mb-2 font-sans">Stay in style for your next trip</p>

      <div class="relative">
        <!-- Left Arrow -->
        <button @click="scrollLeft"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div ref="scrollContainer" class="scroll-container flex space-x-6 py-4 px-1 snap-x scroll-smooth w-full">
          <!-- Property Cards - Add more as needed -->
          <div v-for="hotel in filteredHotels" :key="hotel.id"
            class="relative rounded-lg overflow-hidden shadow-lg snap-center w-72 h-72 flex-shrink-0">
            <img :src="hotel.image" :alt="hotel.name" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-10 p-4 text-center text-white">
                <h3 class="text-2xl font-bold">{{ hotel.name }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Arrow -->
        <button @click="scrollRight"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>

  <!-- Property Listing Section -->
  <section class="py-16 bg-gray-200">
    <div class="max-w-6xl mx-auto px-2">
      <h2 class="text-2xl font-bold mb-4">Our Featured Properties</h2>
      <p class="text-md mb-6">Explore the most luxurious properties and destinations we offer.</p>
      <div v-if="filteredHotels.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="hotel in filteredHotels" :key="hotel.id" class="relative bg-white shadow-md rounded-lg p-2">
            <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-xl"
              @click="toggleWishlist(hotel.id)">
              <i :class="[
                wishlist.includes(hotel.id) ? 'fas fa-heart' : 'far fa-heart',
                'text-red-600',
              ]"></i>
            </button>
            <div v-if="hotel.image" class="mb-4">
              <img :src="hotel.image" alt="Hotel Image" class="w-full h-56 object-cover rounded-md" />
            </div>
            <h2 class="text-xl font-semibold">{{ hotel.name }}</h2>
            <p>{{ hotel.location }}</p>
            <p>Price per night: ${{ hotel.price_per_night }}</p>
            <router-link :to="'/services/' + hotel.id"
              class="mt-4 inline-block px-4 py-2 rounded-md text-md border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <TheFooter />
</template>

<style scoped>
.scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.scroll-container::-webkit-scrollbar {
  display: none;
  /* Hide the scrollbar */
}

.scroll-container {
  -ms-overflow-style: none;
  /* Hide scrollbar for IE */
  scrollbar-width: none;
  /* Hide scrollbar for Firefox */
}

/* Ensuring mobile responsiveness for carousel */
@media (max-width: 768px) {
  .scroll-container {
    scroll-snap-type: none;
    /* Disable snapping on small screens for smooth scrolling */
  }
}
</style>
