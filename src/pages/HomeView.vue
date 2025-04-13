<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import useServices from '@/composables/useServices';
import bgImage from '@/assets/images/staycation/bg.png';

const bgImageUrl = bgImage;

const { searchQuery, filteredServices } = useServices();
const route = useRoute();

const activeCategory = computed(() => route.query.category || '');
const categoryFilteredServices = computed(() => {
  if (!activeCategory.value) return filteredServices.value;
  return filteredServices.value.filter(service =>
    service.category?.toLowerCase() === activeCategory.value.toLowerCase()
  );
});
const quickView = (service) => {
  const serviceId = service.id;
  window.open(`/services/${serviceId}`, '_blank');
  console.log('Quick view:', service);
};
const resetFilters = () => {
  // Implement filter reset logic
  searchQuery.value = '';
  activeCategory.value = '';
  currentPage.value = 1;
};
// Pagination configuration
const itemsPerPage = 8;
const currentPage = ref(1);
const paginationError = ref('');

// Watch search query to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Watch route changes to reset pagination
watch(route, () => {
  currentPage.value = 1;
});

// Paginate services
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return categoryFilteredServices.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(categoryFilteredServices.value.length / itemsPerPage);
});

const visiblePages = computed(() => {
  const range = 2;
  const start = Math.max(1, currentPage.value - range);
  const end = Math.min(totalPages.value, currentPage.value + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const changePage = (newPage) => {
  newPage = Math.max(1, Math.min(newPage, totalPages.value));
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
    paginationError.value = '';
  } else {
    paginationError.value = 'No more pages available.';
  }
};

onMounted(() => {
  console.log('HomeView mounted');
});

// 🔍 Flight Search Logic
const origin = ref('');
const destination = ref('');
const departDate = ref('');


const searchFlights = () => {
  const originCode = origin.value.toLowerCase();
  const destinationCode = destination.value.toLowerCase();
  const formattedDate = departDate.value;

  const tripUrl = `https://tp.media/r?marker=622454&trs=406741&p=8626&u=https%3A%2F%2Fus.trip.com%2Fflights%2Fshowfarefirst%3Fdcity%3D${originCode}%26acity%3D${destinationCode}%26ddate%3D${formattedDate}%26triptype%3Dow%26class%3Dy%26quantity%3D1%26searchboxarg%3Dt%26nonstoponly%3Doff%26locale%3Den-US%26curr%3DUSD&campaign_id=121`;

  window.open(tripUrl, '_blank');
};
// 🔍 Hotel Search Logic
const hotelDestination = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');
const rooms = ref(1);
const adults = ref(2);
const children = ref(0);

const searchHotels = () => {
  const destination = encodeURIComponent(hotelDestination.value);
  const checkIn = checkInDate.value;
  const checkOut = checkOutDate.value;

  const tripUrl = `https://tp.media/r?marker=622454&trs=406741&p=8626&u=https%3A%2F%2Fus.trip.com%2Fhotels%2Flist%3Fcity%3D0%26checkIn%3D${checkIn}%26checkOut%3D${checkOut}%26barCurr%3DUSD%26searchType%3DA%26searchWord%3D${destination}%26crn%3D${rooms.value}%26adult%3D${adults.value}%26children%3D${children.value}&campaign_id=121`;

  window.open(tripUrl, '_blank');
};
</script>

<template>
  <TheNavbar />
  <!-- Hero Section -->
  <div class="relative h-screen min-h-[32rem]">
    <!-- Background with parallax effect -->
    <div class="absolute inset-0 overflow-hidden">
      <img :src="bgImageUrl" alt="Travel the world with Mite_Explorers"
        class="w-full h-full object-cover object-center scale-110 animate-zoom-in-out" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-blue-900/40"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.7))]"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-center">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="max-w-2xl">
          <!-- Tagline -->
          <div class="flex items-center mb-4">
            <span class="inline-block w-12 h-1 bg-blue-400 mr-3"></span>
            <span class="text-blue-300 font-medium tracking-wider">YOUR JOURNEY BEGINS HERE</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Discover <span class="text-blue-300">The World</span> With Confidence
          </h1>

          <!-- Subheading -->
          <p class="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
            We curate unforgettable travel experiences with seamless visa assistance, luxury stays, and personalized
            itineraries tailored just for you.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap lg:mb-8 gap-4">
            <router-link to="/greencard"
              class="flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <i class="fas fa-map-marked-alt mr-3"></i>
              GreenCard
            </router-link>

            <router-link to="/documents"
              class="flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-lg transition-all duration-300">
              <i class="fas fa-passport mr-3"></i>
              Visa Assistance
            </router-link>
          </div>
        </div>
      </div>

      <!-- Scrolling Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" class="text-white">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800/90 to-indigo-900/90 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-white">50+</div>
            <div class="text-sm text-blue-200 uppercase tracking-wider">Destinations</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-white">10K+</div>
            <div class="text-sm text-blue-200 uppercase tracking-wider">Happy Travelers</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-white">24/7</div>
            <div class="text-sm text-blue-200 uppercase tracking-wider">Support</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-white">100%</div>
            <div class="text-sm text-blue-200 uppercase tracking-wider">Visa Success</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Flight Search Section (shown only when Flights tab is active) -->
  <div v-if="activeCategory === 'Flights'" class="flight-search-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        <!-- Header with decorative elements -->
        <div class="relative pt-8 px-6 sm:pt-12 sm:px-8">
          <div class="absolute top-0 right-0 opacity-20">
            <svg class="h-32 w-32 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 12l8 10 8-10-8-10z" />
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Find Your Perfect Flight</span>
          </h2>
          <p class="mt-3 max-w-2xl text-lg text-blue-100">
            Compare prices across hundreds of airlines to get the best deal
          </p>
        </div>

        <!-- Search Form with floating labels -->
        <div class="px-6 pb-8 sm:px-8 sm:pb-10">
          <form @submit.prevent="searchFlights" class="mt-8 space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Origin Input -->
              <div class="relative">
                <label for="origin"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  From
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-plane-departure text-blue-300"></i>
                  </div>
                  <input v-model="origin" id="origin" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="City or Airport" />
                </div>
              </div>

              <!-- Destination Input -->
              <div class="relative">
                <label for="destination"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  To
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-plane-arrival text-blue-300"></i>
                  </div>
                  <input v-model="destination" id="destination" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="City or Airport" />
                </div>
              </div>

              <!-- Date Picker -->
              <div class="relative">
                <label for="departDate"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Departure
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="far fa-calendar-alt text-blue-300"></i>
                  </div>
                  <input v-model="departDate" id="departDate" type="date" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg appearance-none" />
                </div>
              </div>

              <!-- Search Button -->
              <div class="flex items-end">
                <button type="submit"
                  class="w-full h-full bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-700 flex items-center justify-center">
                  <i class="fas fa-search mr-2"></i>
                  Search Flights
                </button>
              </div>
            </div>

            <!-- Advanced Options Toggle -->
            <div class="pt-2">
              <button type="button" class="text-blue-200 hover:text-white text-sm font-medium flex items-center">
                <span>Advanced options</span>
                <i class="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Hotel Search Section (shown only when Hotels tab is active) -->
  <div v-else-if="activeCategory === 'Stays'" class="hotel-search-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        <!-- Header with decorative elements -->
        <div class="relative pt-8 px-6 sm:pt-12 sm:px-8">
          <div class="absolute top-0 right-0 opacity-20">
            <svg class="h-32 w-32 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 12l8 10 8-10-8-10z" />
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Find Your Perfect Hotel</span>
          </h2>
          <p class="mt-3 max-w-2xl text-lg text-blue-100">
            Compare prices across thousands of hotels to get the best deal
          </p>
        </div>

        <!-- Search Form with floating labels -->
        <div class="px-6 pb-8 sm:px-8 sm:pb-10">
          <form @submit.prevent="searchHotels" class="mt-8 space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Destination Input -->
              <div class="relative">
                <label for="hotelDestination"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Destination
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-map-marker-alt text-blue-300"></i>
                  </div>
                  <input v-model="hotelDestination" id="hotelDestination" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="City, hotel, or area" />
                </div>
              </div>

              <!-- Check-in Date -->
              <div class="relative">
                <label for="checkInDate"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Check-in
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="far fa-calendar-alt text-blue-300"></i>
                  </div>
                  <input v-model="checkInDate" id="checkInDate" type="date" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg appearance-none" />
                </div>
              </div>

              <!-- Check-out Date -->
              <div class="relative">
                <label for="checkOutDate"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Check-out
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="far fa-calendar-alt text-blue-300"></i>
                  </div>
                  <input v-model="checkOutDate" id="checkOutDate" type="date" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg appearance-none" />
                </div>
              </div>

              <!-- Guests and Rooms -->
              <div class="relative">
                <label class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Guests & Rooms
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-users text-blue-300"></i>
                  </div>
                  <select v-model="rooms"
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg appearance-none">
                    <option value="1">1 Room</option>
                    <option value="2">2 Rooms</option>
                    <option value="3">3 Rooms</option>
                    <option value="4">4 Rooms</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Guest Details (hidden by default) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div class="relative">
                <label class="block text-sm font-medium text-blue-200 mb-1">Adults</label>
                <select v-model="adults"
                  class="block w-full pl-3 pr-3 py-2 border border-blue-500 bg-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg">
                  <option v-for="n in 10" :key="'adult-' + n" :value="n">
                    {{ n }} {{ n === 1 ? 'Adult' : 'Adults' }}
                  </option>
                </select>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-blue-200 mb-1">Children</label>
                <select v-model="children"
                  class="block w-full pl-3 pr-3 py-2 border border-blue-500 bg-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg">
                  <option v-for="n in 10" :key="'child-' + n" :value="n">
                    {{ n }} {{ n === 1 ? 'Child' : 'Children' }}
                  </option>
                </select>
              </div>
              <div class="flex items-end">
                <button type="submit"
                  class="w-full h-full bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-700 flex items-center justify-center">
                  <i class="fas fa-search mr-2"></i>
                  Search Hotels
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Normal Services Search Section (shown for other categories) -->
  <div v-else class="services-search-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="px-6 py-8 sm:p-10">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Discover Amazing Experiences
            </h2>
            <p class="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              Find hotels, activities, and more for your perfect getaway
            </p>
          </div>

          <div class="mt-8">
            <div class="relative max-w-2xl mx-auto">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input v-model="searchQuery" type="text"
                class="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400"
                placeholder="Search for hotels, destinations, activities..." />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="button"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Search
                </button>
              </div>
            </div>

            <!-- Quick Filters -->
            <div class="mt-6 flex flex-wrap justify-center gap-3">
              <button v-for="category in ['Hotels', 'Tours', 'Restaurants', 'Car Rentals']" :key="category"
                @click="activeCategory = category"
                class="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                {{ category }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Featured Services Section -->
  <section class="py-16 relative bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 right-0 w-1/3 h-full">
        <div class="absolute inset-0 bg-gradient-to-l from-blue-100/20 to-transparent"></div>
        <div class="absolute inset-0 opacity-10"
          style="background-image: url(@/assets/images/pattern.svg); background-size: 30px 30px;"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
          {{ activeCategory || 'Premium Selection' }}
        </span>
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Curated Travel Experiences
        </h2>
        <p class="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Discover handpicked services that redefine luxury travel
        </p>
      </div>

      <!-- Services Grid -->
      <div v-if="paginatedServices.length > 0">
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <router-link v-for="service in paginatedServices" :key="service.id" :to="`/services/${service.id}`"
            class="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <!-- Image with overlay -->
            <div class="relative h-60 overflow-hidden">
              <img :src="service.image" :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <!-- Availability Badge -->
              <span :class="[
                'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold',
                service.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              ]">
                {{ service.available ? 'Available' : 'Sold Out' }}
              </span>

              <!-- Quick View Button -->
              <button
                class="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-blue-600 px-4 py-2 rounded-full shadow-md font-medium"
                @click.prevent="quickView(service)">
                Quick View
              </button>
            </div>

            <!-- Content -->
            <div class="p-5">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-gray-900 line-clamp-2">
                  {{ service.title }}
                </h3>
                <div class="flex items-center bg-blue-50 px-2 py-1 rounded">
                  <i class="fas fa-star text-yellow-400 mr-1 text-sm"></i>
                  <span class="text-sm font-bold text-gray-700">{{ service.rating }}</span>
                </div>
              </div>

              <p class="mt-1 text-sm text-gray-500 flex items-center">
                <i class="fas fa-building text-gray-400 mr-2 text-xs"></i>
                {{ service.provider }}
              </p>

              <div class="mt-4 flex justify-between items-center">
                <div>
                  <span class="text-lg font-bold text-blue-600">${{ service.price }}</span>
                  <span class="text-xs text-gray-500 ml-1">USD</span>
                </div>

                <div class="flex space-x-1">
                  <i v-for="n in 5" :key="n" class="fas text-sm" :class="{
                    'fa-star text-yellow-400': n <= service.rating,
                    'fa-star text-gray-300': n > service.rating
                  }"></i>
                </div>
              </div>

              <!-- Additional Info (hidden until hover) -->
              <div
                class="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="flex justify-between text-xs text-gray-500">
                  <span class="flex items-center">
                    <i class="fas fa-map-marker-alt mr-1"></i>
                    {{ service.location || 'Multiple locations' }}
                  </span>
                  <span class="flex items-center">
                    <i class="far fa-clock mr-1"></i>
                    {{ service.duration || 'Flexible' }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-400">
          <i class="fas fa-compass text-6xl"></i>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No services found</h3>
        <p class="mt-1 text-gray-500">
          We couldn't find any services matching your criteria.
        </p>
        <div class="mt-6">
          <button @click="resetFilters"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <i class="fas fa-redo mr-2"></i>
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex items-center justify-between">
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, categoryFilteredServices.length)
                }}</span> of
              <span class="font-medium">{{ categoryFilteredServices.length }}</span> results
            </p>
          </div>

          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button @click="changePage(1)" :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                :class="{ 'cursor-not-allowed': currentPage === 1 }">
                <span class="sr-only">First</span>
                <i class="fas fa-angle-double-left"></i>
              </button>
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                :class="{ 'cursor-not-allowed': currentPage === 1 }">
                <span class="sr-only">Previous</span>
                <i class="fas fa-angle-left"></i>
              </button>

              <template v-for="page in visiblePages" :key="page">
                <button @click="changePage(page)" :aria-current="page === currentPage ? 'page' : undefined"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium" :class="{
                    'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                  }">
                  {{ page }}
                </button>
              </template>

              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                :class="{ 'cursor-not-allowed': currentPage === totalPages }">
                <span class="sr-only">Next</span>
                <i class="fas fa-angle-right"></i>
              </button>
              <button @click="changePage(totalPages)" :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                :class="{ 'cursor-not-allowed': currentPage === totalPages }">
                <span class="sr-only">Last</span>
                <i class="fas fa-angle-double-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>

  <TheFooter />
</template>
<style>
.animate-zoom-in-out {
  animation: zoom-in-out 20s ease-in-out infinite alternate;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes zoom-in-out {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}
</style>
