<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import useServices from '@/composables/useServices';
import bgImage from '@/assets/images/staycation/bg.png';
import geometricImage from '@/assets/images/geometric2.png';

const bgImageUrl = bgImage;
const geometricUrlImage = geometricImage;

const { searchQuery, filteredServices } = useServices();
const route = useRoute();

// Pagination configuration
const itemsPerPage = 8;
const currentPage = ref(1);
const paginationError = ref('');

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Computed property for paginated services
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredServices.value.slice(start, start + itemsPerPage);
});

// Compute total pages
const totalPages = computed(() => {
  return Math.ceil(filteredServices.value.length / itemsPerPage);
});

// Calculate visible page numbers for navigation
const visiblePages = computed(() => {
  const range = 2; // Number of pages to show around current page
  const start = Math.max(1, currentPage.value - range);
  const end = Math.min(totalPages.value, currentPage.value + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Page change handler with boundary checks (without scrolling to top)
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
      <p class="text-2xl md:text-xl font-bold max-w-xl text-blue-200">
        Move · Inspire · Travel · Explore
      </p>
      <p class="text-xl md:text-xl font-semi max-w-xl">
        Explore breathtaking destinations, indulge in luxurious stays, and enjoy effortless travel experiences—
        crafted to make every journey extraordinary.
      </p>
      <div class="space-y-4">
        <div class="flex space-x-4">
          <router-link to="/documents"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-blue-800 hover:text-white">
            Greencard
          </router-link>
          <router-link to="/documents"
            class="border border-gray-100 text-white font-normal py-3 px-6 rounded-lg transition hover:bg-blue-800 hover:text-white">
            Visa Application
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Bar Section -->
  <div class="relative py-8 bg-gray-50 px-4 md:px-16">
    <div class="absolute top-0 right-0 w-1/2 h-full hidden md:block">
      <img :src="geometricUrlImage" alt="Elite Explorers" class="w-full h-full object-cover opacity-50" />
    </div>
    <div class="relative z-10 text-center mb-6 text-black">
      <h1 class="text-2xl md:text-4xl mb-2 font-bold">
        Explore Destinations, Activities and Experiences
      </h1>
      <p>Your travel agency of choice</p>
    </div>
    <div class="relative z-10 max-w-3xl mx-auto flex items-center space-x-4">
      <input v-model="searchQuery" type="text" placeholder="Search for hotels, destinations..."
        class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
      <button
        class="bg-transparent border-2 border-black text-indigo-600 py-2 px-6 rounded-lg flex items-center space-x-2 transition-colors hover:bg-indigo-600 hover:text-white">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </button>
    </div>
    <div v-if="filteredServices.length === 0" class="text-center text-lg font-semibold text-red-600 mt-4">
      No results found for "{{ searchQuery }}".
    </div>
  </div>

  <!-- Featured Services Section -->
  <section class="py-16 relative bg-gray-200">
    <!-- Background Geometric Image -->
    <div class="absolute top-0 right-0 w-full h-full hidden md:block">
      <img :src="geometricUrlImage" alt="Elite Explorers" class="w-full h-full object-cover opacity-50" />
    </div>
    <div class="max-w-6xl mx-auto px-2 relative z-10">
      <h2 class="text-2xl font-bold mb-4">
        {{ route.query.category ? route.query.category : 'All Services' }}
      </h2>
      <p class="text-md mb-6">Explore the most luxurious services and destinations we offer.</p>

      <div v-if="paginatedServices.length > 0">
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <router-link v-for="service in paginatedServices" :key="service.id" :to="`/services/${service.id}`"
            class="block bg-white shadow-md rounded-lg p-4 hover:shadow-md transition duration-300">
            <div v-if="service.image" class="mb-4">
              <img :src="service.image" alt="Service Image" class="w-full h-56 object-contain rounded-md" />
            </div>
            <h2 class="text-xl font-semibold">{{ service.title }}</h2>
            <p class="text-green-600 font-semibold">Provider: {{ service.provider }}</p>
            <p class="text-black">Price: USD {{ service.price }}</p>
            <div class="flex justify-between items-center">
              <p :class="[
                'px-2 py-1 rounded-full text-white text-sm inline-flex items-center',
                service.available ? 'bg-green-500' : 'bg-red-500'
              ]">
                {{ service.available ? 'Available' : 'Not Available' }}
              </p>
              <div class="flex items-center space-x-1 text-yellow-400">
                <i v-for="n in 5" :key="n" class="fas"
                  :class="n <= service.rating ? 'fa-star' : 'fa-star-half-alt'"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        No featured services available.
      </div>

      <!-- Pagination Controls Positioned on Top of Background -->
      <div class="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center space-x-2 pointer-events-auto">
        <button @click="changePage(1)" :disabled="currentPage === 1"
          class="pagination-button bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
          title="First page">&laquo;</button>
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          class="pagination-button bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
          title="Previous page">&lsaquo;</button>
        <template v-for="page in visiblePages" :key="page">
          <button @click="changePage(page)"
            :class="['pagination-button', page === currentPage ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white', 'py-2 px-3 rounded', 'transition-colors', 'hover:bg-green-600', 'cursor-pointer']">
            {{ page }}
          </button>
        </template>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="pagination-button bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
          title="Next page">&rsaquo;</button>
        <button @click="changePage(totalPages)" :disabled="currentPage === totalPages"
          class="pagination-button bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
          title="Last page">&raquo;</button>
      </div>
      <!-- Pagination Info -->
      <div class="relative z-10 mt-20 text-center">
        <span class="text-sm text-gray-600 block">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{
            Math.min(currentPage * itemsPerPage, filteredServices.length)
          }} of {{ filteredServices.length }} items
        </span>
      </div>
      <!-- Display pagination error if any -->
      <div v-if="paginationError" class="relative z-10 text-red-500 text-center mt-4">
        {{ paginationError }}
      </div>
    </div>
  </section>

  <TheFooter />
</template>
