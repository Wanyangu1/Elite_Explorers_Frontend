<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import useServices from '@/composables/useServices';
import bgImage from '@/assets/images/staycation/bg.png';

const bgImageUrl = bgImage;

// Services data
const { searchQuery, filteredServices } = useServices();
const route = useRoute();

// Widget states
const isWidgetLoading = ref(false);
const widgetError = ref(false);
const isHotelWidgetLoading = ref(false);
const hotelWidgetError = ref(false);

// Active category from route
const activeCategory = computed(() => route.query.category || '');

// Filter services by category
const categoryFilteredServices = computed(() => {
  if (!activeCategory.value) return filteredServices.value;
  return filteredServices.value.filter(service =>
    service.category?.toLowerCase() === activeCategory.value.toLowerCase()
  );
});

// Quick view function
const quickView = (service) => {
  const serviceId = service.id;
  window.open(`/services/${serviceId}`, '_blank');
};

// Reset filters
const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = '';
  currentPage.value = 1;
};

// Pagination configuration
const itemsPerPage = 8;
const currentPage = ref(1);
const paginationError = ref('');

// Watch for search query changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Watch for route changes
watch(route, () => {
  currentPage.value = 1;
});

// Paginated services
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return categoryFilteredServices.value.slice(start, start + itemsPerPage);
});

// Total pages calculation
const totalPages = computed(() => {
  return Math.ceil(categoryFilteredServices.value.length / itemsPerPage);
});

// Visible pages for pagination
const visiblePages = computed(() => {
  const range = 2;
  const start = Math.max(1, currentPage.value - range);
  const end = Math.min(totalPages.value, currentPage.value + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Change page function
const changePage = (newPage) => {
  newPage = Math.max(1, Math.min(newPage, totalPages.value));
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
    paginationError.value = '';
  } else {
    paginationError.value = 'No more pages available.';
  }
};

// Widget loading function
const loadWidget = (type) => {
  // Set loading state
  if (type === 'flights') {
    isWidgetLoading.value = true;
    widgetError.value = false;
  } else {
    isHotelWidgetLoading.value = true;
    hotelWidgetError.value = false;
  }

  // Clear previous widget if it exists
  const containerId = type === 'flights' ? 'widget-container' : 'travelpayouts-widget';
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }

  const script = document.createElement('script');
  script.src = type === 'flights'
    ? "https://tp.media/content?trs=406741&shmarker=622454&locale=en&curr=USD&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121"
    : "https://c121.travelpayouts.com/content?trs=416883&shmarker=632067&lang=www&layout=S10391&powered_by=true&promo_id=4038";  // ✅ updated hotel script

  script.async = true;
  script.charset = "utf-8";

  script.onload = () => {
    if (type === 'flights') {
      isWidgetLoading.value = false;
    } else {
      isHotelWidgetLoading.value = false;
    }
  };

  document.body.appendChild(script);


  // Handle load error
  script.onerror = () => {
    if (type === 'flights') {
      isWidgetLoading.value = false;
      widgetError.value = true;
    } else {
      isHotelWidgetLoading.value = false;
      hotelWidgetError.value = true;
    }
  };

  // Append script to container
  document.getElementById(containerId).appendChild(script);
};

// Watch for category changes and load appropriate widget
watch(activeCategory, (newVal) => {
  nextTick(() => {
    if (newVal === 'Flights') {
      loadWidget('flights');
    } else if (newVal === 'Stays') {
      loadWidget('hotels');
    }
  });
}, { immediate: true });

// Car Rental Search Logic
const pickupLocation = ref('');
const dropoffLocation = ref('');
const pickupDate = ref('');
const dropoffDate = ref('');

const searchCarRentals = () => {
  if (!pickupLocation.value || !pickupDate.value || !dropoffDate.value) {
    alert('Please fill in all required fields');
    return;
  }

  const pickup = encodeURIComponent(pickupLocation.value);
  const dropoff = encodeURIComponent(dropoffLocation.value || pickupLocation.value);
  const pickupDateFormatted = encodeURIComponent(pickupDate.value);
  const dropoffDateFormatted = encodeURIComponent(dropoffDate.value);

  const baseUrl = `https://us.trip.com/carhire/online/list?pcity=825&pcityName=${pickup}&pcode=NBO&ptype=1&plat=-1.32271&plon=36.926069&paddress=${pickup}%20(NBO)&ptimezone=3&rcity=825&rcityName=${dropoff}&rcode=NBO&rtype=1&rlat=-1.32271&rlon=36.926069&raddress=${dropoff}%20(NBO)&rtimezone=3&ptime=${pickupDateFormatted}%2010:00&rtime=${dropoffDateFormatted}%2010:00&scountry=54&age=30-60&channelid=235728`;
  const affiliateUrl = `https://tp.media/r?marker=622454&trs=406741&p=8626&u=${encodeURIComponent(baseUrl)}&campaign_id=121`;

  window.open(affiliateUrl, '_blank');
};

// Attractions Search Logic
const attractionsLocation = ref('');
const attractionsSearchTerm = ref('');

const setPopularSearch = (location, term) => {
  attractionsLocation.value = location;
  attractionsSearchTerm.value = term;
};

const searchAttractions = () => {
  if (!attractionsLocation.value) {
    alert('Please specify a destination');
    return;
  }

  const location = encodeURIComponent(attractionsLocation.value);
  const searchTerm = encodeURIComponent(attractionsSearchTerm.value || attractionsLocation.value);

  const baseUrl = `https://us.trip.com/things-to-do/list?pagetype=city&keyword=${searchTerm}&id=100087&name=${location}&pshowcode=&kwdfrom=srch&citytype=dt&locale=en-US&curr=USD`;
  const affiliateUrl = `https://tp.media/r?marker=622454&trs=406741&p=8626&u=${encodeURIComponent(baseUrl)}&campaign_id=121`;

  window.open(affiliateUrl, '_blank');
};
onMounted(() => {
  const widgetLoading = document.getElementById('widget-loading');
  const widgetContent = document.getElementById('widget-content');

  if (widgetLoading && widgetContent) {
    setTimeout(() => {
      widgetLoading.style.display = 'none';
      widgetContent.style.display = 'block';
    }, 3000);
  }
});

// Initialize on mount
onMounted(() => {
  console.log('HomeView mounted');
});
</script>

<template>
  <TheNavbar />
  <!-- Hero Section -->
  <div class="relative h-[90vh] min-h-[710px] lg:h-[90vh] lg:min-h-[600px] flex overflow-hidden">
    <!-- Background with parallax effect -->
    <div class="absolute inset-0 overflow-hidden">
      <img :src="bgImageUrl" alt="Travel the world with Mite_Explorers"
        class="w-full h-full object-cover object-center scale-110 animate-zoom-in-out" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-blue-900/40"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.7))]"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-start sm:justify-center pt-8 sm:pt-0">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="max-w-2xl">
          <!-- Tagline -->
          <div class="flex items-center mt-8 lg:mt-0 mb-4">
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
            <router-link to="/documents"
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

  <div class="eg-affiliate-banners mt-4" data-program="us-expedia" data-network="pz" data-layout="leaderboard"
    data-image="sailing" data-message="find-perfect-getaway-package" data-link="home" data-camref="1011l57Rko"
    data-pubref=""></div>
  <div class="travel-container relative">
    <!-- Left Panel (Static Content) -->
    <div class="travel-info-panel">
      <h2>Plan Your Perfect Getaway</h2>
      <div class="info-feature">
        <svg class="info-icon" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2zm1.61-9.96c.83.71 1.39 1.6 1.39 2.96h-2c0-.93-.48-1.36-1.02-1.72-.14-.09-.26-.17-.38-.26-.1-.08-.15-.12-.15-.16 0-.05.04-.1.15-.15.2-.12.45-.31.69-.58.36-.4.62-.93.62-1.57 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.26-.56 2.13-1.39 2.96z" />
        </svg>
        <div>
          <h3>Best Price Guarantee</h3>
          <p>We'll match any lower price you find with our partners.</p>
        </div>
      </div>

      <div class="info-feature">
        <svg class="info-icon" viewBox="0 0 24 24">
          <path
            d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z" />
        </svg>
        <div>
          <h3>24/7 Support</h3>
          <p>Our travel experts are available anytime to assist you.</p>
        </div>
      </div>

      <div class="info-feature">
        <svg class="info-icon" viewBox="0 0 24 24">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <div>
          <h3>Local Experiences</h3>
          <p>Discover hidden gems and authentic activities worldwide.</p>
        </div>
      </div>

      <div class="trust-badge">
        <div class="rating">4.8/5</div>
        <div class="rating-text">Trusted by 5M+ travelers annually</div>
      </div>
    </div>

    <!-- Right Panel (Widget Area with Loading State) -->
    <div class="widget-area relative">
      <!-- Loading Overlay (shown by default, hidden when widget loads) -->
      <div id="widget-loading"
        class="widget-loading-overlay absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
        <div class="loader-animation mb-6">
          <div class="plane-wrapper">
            <svg class="plane-icon animate-bounce" width="48" height="48" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 16.21V12.05L18 14.28V10.11L14 12.31V8.05L10 10.22V5.96L3 9.2V14.8L10 18.03V13.77L14 15.94V11.68L18 13.88V9.71L22 11.94V7.79L12 3L2 7.79V11.94L6 9.71V13.88L10 11.68V15.94L14 13.77V18.03L21 14.8V9.2L14 5.96V10.22L10 8.05V12.31L6 10.11V14.28L2 12.05V16.21L12 21L22 16.21Z"
                fill="#2563EB" />
            </svg>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mb-2">Searching Travel Options</h3>
        <p class="text-gray-600 max-w-md text-center mb-6">
          We're scanning hundreds of providers to find the best deals...
        </p>

        <div class="w-full max-w-xs bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="progress-bar bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full animate-progress">
          </div>
        </div>
      </div>

      <!-- Widget Container (hidden by default, shown when loaded) -->
      <div class="eg-widget" data-widget="search" data-program="us-expedia" data-lobs="stays,flights" data-network="pz"
        data-camref="1011l57Rko"></div>
    </div>
  </div>

  <!-- Flight Search Section -->
  <div v-if="activeCategory === 'Flights'" class="flight-search-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
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

        <div class="px-6 pb-8 sm:px-8 sm:pb-10 relative min-h-[300px]">
          <!-- Loading State -->
          <div v-if="isWidgetLoading"
            class="absolute inset-0 flex flex-col items-center justify-center bg-blue-600/10 backdrop-blur-sm rounded-b-2xl z-10">
            <div class="w-16 h-16 border-4 border-blue-300 border-t-white rounded-full animate-spin mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-2">Loading Flight Options</h3>
            <p class="text-blue-100 max-w-md text-center">
              Searching thousands of flights to find the best deals for you...
            </p>
            <div class="w-full max-w-xs bg-blue-700/30 rounded-full h-2 mt-6 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-300 to-indigo-400 h-2 rounded-full animate-progress"></div>
            </div>
          </div>

          <!-- Error State -->
          <div v-if="widgetError"
            class="absolute inset-0 flex flex-col items-center justify-center bg-red-500/10 backdrop-blur-sm rounded-b-2xl z-10 p-6">
            <div class="bg-white/90 p-6 rounded-xl max-w-md text-center">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Unable to Load Flight Search</h3>
              <p class="text-gray-600 mb-4">We're having trouble loading the flight search widget.</p>
              <button @click="loadWidget('flights')"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Retry
              </button>
            </div>
          </div>

          <!-- Widget Container -->
          <div id="widget-container" class="relative z-0"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Hotel Search Section -->
  <div v-else-if="activeCategory === 'Stays'" class="hotel-search-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
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

        <div class="px-6 pb-8 sm:px-8 sm:pb-10 relative min-h-[300px]">
          <!-- Loading State -->
          <div v-if="isHotelWidgetLoading"
            class="absolute inset-0 flex flex-col items-center justify-center bg-blue-600/10 backdrop-blur-sm rounded-b-2xl z-10">
            <div class="w-16 h-16 border-4 border-blue-300 border-t-white rounded-full animate-spin mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-2">Loading Hotel Options</h3>
            <p class="text-blue-100 max-w-md text-center">
              Searching thousands of hotels to find the best deals for you...
            </p>
            <div class="w-full max-w-xs bg-blue-700/30 rounded-full h-2 mt-6 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-300 to-indigo-400 h-2 rounded-full animate-progress"></div>
            </div>
          </div>

          <!-- Error State -->
          <div v-if="hotelWidgetError"
            class="absolute inset-0 flex flex-col items-center justify-center bg-red-500/10 backdrop-blur-sm rounded-b-2xl z-10 p-6">
            <div class="bg-white/90 p-6 rounded-xl max-w-md text-center">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Unable to Load Hotel Search</h3>
              <p class="text-gray-600 mb-4">We're having trouble loading the hotel search widget.</p>
              <button @click="loadWidget('hotels')"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Retry
              </button>
            </div>
          </div>

          <!-- Widget Container -->
          <div id="travelpayouts-widget" class="relative z-0"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Car Rental Search Section -->
  <div v-else-if="activeCategory === 'Car Rentals'" class="car-rental-search-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        <div class="relative pt-8 px-6 sm:pt-12 sm:px-8">
          <div class="absolute top-0 right-0 opacity-20">
            <svg class="h-32 w-32 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 12l8 10 8-10-8-10z" />
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Find Your Perfect Rental Car</span>
          </h2>
          <p class="mt-3 max-w-2xl text-lg text-blue-100">
            Compare prices across hundreds of car rental companies
          </p>
        </div>

        <div class="px-6 pb-8 sm:px-8 sm:pb-10">
          <form @submit.prevent="searchCarRentals" class="mt-8 space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Pickup Location Input -->
              <div class="relative">
                <label for="pickupLocation"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Pickup Location
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-map-marker-alt text-blue-300"></i>
                  </div>
                  <input v-model="pickupLocation" id="pickupLocation" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="City or Airport" />
                </div>
              </div>

              <!-- Dropoff Location Input -->
              <div class="relative">
                <label for="dropoffLocation"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Dropoff Location
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-map-marker-alt text-blue-300"></i>
                  </div>
                  <input v-model="dropoffLocation" id="dropoffLocation" type="text"
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="Same as pickup (optional)" />
                </div>
              </div>

              <!-- Pickup Date -->
              <div class="relative">
                <label for="pickupDate"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Pickup Date
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="far fa-calendar-alt text-blue-300"></i>
                  </div>
                  <input v-model="pickupDate" id="pickupDate" type="date" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg appearance-none" />
                </div>
              </div>

              <!-- Dropoff Date -->
              <div class="relative">
                <label for="dropoffDate"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Dropoff Date
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="far fa-calendar-alt text-blue-300"></i>
                  </div>
                  <input v-model="dropoffDate" id="dropoffDate" type="date" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg appearance-none" />
                </div>
              </div>
            </div>

            <!-- Search Button -->
            <div class="pt-2 flex justify-center">
              <button type="submit"
                class="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-700 flex items-center justify-center">
                <i class="fas fa-car mr-2"></i>
                Search Rental Cars
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Attractions Search Section -->
  <div v-else-if="activeCategory === 'Attractions'" class="attractions-search-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        <div class="relative pt-8 px-6 sm:pt-12 sm:px-8">
          <div class="absolute top-0 right-0 opacity-20">
            <svg class="h-32 w-32 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 12l8 10 8-10-8-10z" />
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Discover Amazing Attractions</span>
          </h2>
          <p class="mt-3 max-w-2xl text-lg text-blue-100">
            Find the best tours, activities and experiences for your trip
          </p>
        </div>

        <div class="px-6 pb-8 sm:px-8 sm:pb-10">
          <form @submit.prevent="searchAttractions" class="mt-8 space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Location Input -->
              <div class="relative col-span-2">
                <label for="attractionsLocation"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Destination (Country/City)
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-map-marker-alt text-blue-300"></i>
                  </div>
                  <input v-model="attractionsLocation" id="attractionsLocation" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="Enter country or city (e.g., Kenya)" />
                </div>
              </div>

              <!-- Activity Search Input -->
              <div class="relative col-span-2">
                <label for="attractionsSearchTerm"
                  class="absolute -top-2 left-4 bg-blue-600 px-2 text-xs font-medium text-blue-100 rounded-full">
                  Activity or Attraction
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-search text-blue-300"></i>
                  </div>
                  <input v-model="attractionsSearchTerm" id="attractionsSearchTerm" type="text"
                    class="block w-full pl-10 pr-3 py-3 border border-blue-500 bg-blue-500/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg"
                    placeholder="Search for specific activities (e.g., Maasai Mara)" />
                </div>
              </div>
            </div>

            <!-- Search Button -->
            <div class="pt-2 flex justify-center">
              <button type="submit"
                class="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-700 flex items-center justify-center">
                <i class="fas fa-binoculars mr-2"></i>
                Find Attractions
              </button>
            </div>

            <!-- Popular Searches -->
            <div class="pt-4">
              <p class="text-sm text-blue-200 text-center mb-2">Popular searches:</p>
              <div class="flex flex-wrap justify-center gap-2">
                <button type="button" @click="setPopularSearch('Kenya', 'Maasai Mara')"
                  class="px-3 py-1 text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white rounded-full border border-blue-400 transition-colors">
                  Maasai Mara, Kenya
                </button>
                <button type="button" @click="setPopularSearch('France', 'Eiffel Tower')"
                  class="px-3 py-1 text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white rounded-full border border-blue-400 transition-colors">
                  Eiffel Tower, France
                </button>
                <button type="button" @click="setPopularSearch('USA', 'Grand Canyon')"
                  class="px-3 py-1 text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white rounded-full border border-blue-400 transition-colors">
                  Grand Canyon, USA
                </button>
                <button type="button" @click="setPopularSearch('Egypt', 'Pyramids')"
                  class="px-3 py-1 text-xs bg-blue-500/30 hover:bg-blue-500/50 text-white rounded-full border border-blue-400 transition-colors">
                  Pyramids, Egypt
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Normal Services Search Section -->
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
              <button v-for="category in ['Flights', 'Stays', 'Car Rentals', 'Attractions']" :key="category"
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
  <div class="eg-affiliate-banners" data-program="us-expedia" data-network="pz" data-layout="leaderboard"
    data-image="surfing" data-message="search-hotels-flights-cars-activities-more" data-link="home"
    data-camref="1011l57Rko" data-pubref=""></div>

  <!-- Add this section where appropriate in your template -->
  <section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Image Grid -->
          <div class="relative min-h-64 lg:min-h-96">
            <div class="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <div class="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Happy traveler"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105">
              </div>
              <div class="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Travel agent helping customer"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105">
              </div>
              <div class="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Family traveling"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105">
              </div>
              <div class="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Couple on vacation"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105">
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <div class="flex items-center mb-4">
              <span class="inline-block w-8 h-1 bg-blue-500 mr-2"></span>
              <span class="text-blue-600 font-medium tracking-wider">PERSONALIZED ASSISTANCE</span>
            </div>

            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Need Help With Your Booking?
            </h2>

            <p class="text-lg text-gray-600 mb-6">
              Our travel experts are here to make your trip planning effortless. Whether you need special arrangements,
              have questions, or want personalized recommendations, we're ready to help.
            </p>

            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">Personalized itinerary planning</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">Special requests and accommodations</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">24/7 customer support</span>
              </li>
            </ul>

            <div class="flex flex-col sm:flex-row gap-4">
              <a href="/contact"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                <i class="fas fa-headset mr-2"></i> Contact Our Agent
              </a>
              <a href="/help"
                class="px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-300 text-center">
                <i class="fas fa-question-circle mr-2"></i> Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Featured Services Section -->
  <section class="py-16 relative bg-gradient-to-b from-gray-50 to-gray-100">
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
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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

              <!-- Additional Info -->
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

.travel-container {
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.travel-info-panel {
  flex: 1;
  padding: 2.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
}

.travel-search-panel {
  flex: 1;
  padding: 2rem;
  background: white;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.info-feature {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.8rem;
  align-items: flex-start;
}

.info-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  flex-shrink: 0;
  margin-top: 2px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

p {
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.9;
}

.trust-badge {
  margin-top: 3rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  text-align: center;
}

.rating {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.rating-text {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.elegant-search-widget {
  min-height: 400px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .travel-container {
    flex-direction: column;
  }

  .travel-info-panel {
    padding: 1.5rem;
  }

  .travel-search-panel {
    padding: 1.5rem;
  }
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

/* Animation styles */
@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes progress {
  0% {
    width: 0%;
    transform: translateX(-100%);
  }

  50% {
    width: 100%;
    transform: translateX(0%);
  }

  100% {
    width: 0%;
    transform: translateX(100%);
  }
}

.animate-bounce {
  animation: bounce 1.5s infinite;
}

.animate-progress {
  animation: progress 2.5s linear infinite;
}

/* Layout styles */
.travel-container {
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.travel-info-panel {
  flex: 1;
  padding: 2.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
}

.widget-area {
  flex: 1;
  min-height: 400px;
  /* Ensure consistent height */
  position: relative;
}

.widget-content {
  height: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .travel-container {
    flex-direction: column;
  }

  .widget-area {
    min-height: 300px;
  }
}
</style>
