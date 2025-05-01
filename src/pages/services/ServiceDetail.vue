<script setup>
import { ref, computed, onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useServiceDetail } from '@/composables/useServiceDetail';

const { service, isLoading, error, currentImage, relatedServices, changeImage } = useServiceDetail();

// --- Pagination for Related Services ---
const relatedItemsPerPage = 8; // Reduced for better mobile display
const currentRelatedPage = ref(1);
const paginationError = ref('');

// Computed property for paginated related services
const paginatedRelatedServices = computed(() => {
  const startIndex = (currentRelatedPage.value - 1) * relatedItemsPerPage;
  return relatedServices.value.slice(startIndex, startIndex + relatedItemsPerPage);
});

// Compute total pages for related services
const totalRelatedPages = computed(() => {
  return Math.ceil(relatedServices.value.length / relatedItemsPerPage) || 1;
});

// Compute visible pages for navigation (mobile-friendly)
const visibleRelatedPages = computed(() => {
  if (totalRelatedPages.value <= 5) {
    return Array.from({ length: totalRelatedPages.value }, (_, i) => i + 1);
  }
  const range = 1; // Smaller range for mobile
  let start = Math.max(1, currentRelatedPage.value - range);
  let end = Math.min(totalRelatedPages.value, currentRelatedPage.value + range);

  // Adjust if we're at the beginning or end
  if (currentRelatedPage.value <= range + 1) {
    end = Math.min(2 * range + 1, totalRelatedPages.value);
  } else if (currentRelatedPage.value >= totalRelatedPages.value - range) {
    start = Math.max(totalRelatedPages.value - 2 * range, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Change page function for related services
const changeRelatedPage = (newPage) => {
  newPage = Math.max(1, Math.min(newPage, totalRelatedPages.value));
  if (newPage !== currentRelatedPage.value) {
    currentRelatedPage.value = newPage;
    paginationError.value = '';
    window.scrollTo({ top: document.querySelector('.related-services').offsetTop - 100, behavior: 'smooth' });
  } else {
    paginationError.value = 'No more pages available.';
  }
};

onMounted(() => {
  console.log('ServiceDetail View mounted');
});
</script>

<template>
  <TheNavbar />

  <div class="bg-gray-100 py-2">
    <!-- Booking Lifeline -->
    <div class="shadow-sm py-1 px-6 mb-1 mt-2">
      <div class="flex items-center justify-between max-w-3xl mx-auto">
        <!-- Service Selection -->
        <div class="flex flex-col items-center">
          <i class="fas fa-list-alt text-blue-500 text-2xl"></i>
          <p class="text-sm text-gray-600 mt-1">Service Selection</p>
        </div>
        <div class="w-20 h-1 bg-green-500"></div>
        <!-- Details (Highlighted) -->
        <div class="flex flex-col items-center">
          <i class="fas fa-user text-white text-2xl bg-green-500 p-2 rounded-full"></i>
          <p class="text-sm font-semibold text-green-600 mt-1">Details</p>
        </div>
        <div class="w-20 h-1 bg-gray-300"></div>
        <!-- Payment -->
        <div class="flex flex-col items-center">
          <i class="fas fa-credit-card text-blue-500 text-2xl"></i>
          <p class="text-sm text-gray-600 mt-1">Review</p>
        </div>
        <div class="w-20 h-1 bg-gray-300"></div>
        <!-- Confirmation -->
        <div class="flex flex-col items-center">
          <i class="fas fa-check-circle text-blue-500 text-2xl"></i>
          <p class="text-sm text-gray-600 mt-1">Confirmation</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-6xl mx-auto py-20 px-4 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-lg text-gray-700">Loading service details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-6xl mx-auto py-20 px-4 text-center">
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- Service Content -->
    <div v-else class="max-w-6xl mx-auto py-8 px-4">
      <!-- Main Service Section -->
      <div class="flex flex-col lg:flex-row gap-8 xl:gap-12">
        <!-- Image Gallery -->
        <div class="lg:flex-1">
          <!-- Main Image -->
          <div class="relative overflow-hidden rounded-xl shadow-lg bg-white">
            <div v-if="currentImage" class="aspect-w-16 aspect-h-9">
              <img :src="`http://localhost:8000/media/${currentImage}`" alt="Service Image"
                class="w-full h-full object-cover transition-opacity duration-300"
                :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }" />
            </div>
            <div v-else class="w-full h-80 bg-gray-200 flex items-center justify-center">
              <i class="fas fa-image text-gray-400 text-5xl"></i>
            </div>

            <!-- Image Badges -->
            <div class="absolute top-4 right-4 flex space-x-2">
              <span
                class="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center">
                <i class="fas fa-camera text-blue-500 mr-1"></i>
                {{ service.images?.length || 0 }} photos
              </span>
            </div>
          </div>

          <!-- Thumbnail Gallery -->
          <div v-if="service.images?.length > 1" class="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            <button v-for="(image, index) in service.images" :key="index" @click="changeImage(image)" :class="[
              'relative overflow-hidden rounded-lg border-2 transition-all duration-200 h-20',
              currentImage === image ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'
            ]">
              <img :src="`http://localhost:8000/media/${image}`" alt="Thumbnail" class="w-full h-full object-cover" />
              <div v-if="currentImage === image" class="absolute inset-0 bg-blue-500/20"></div>
            </button>
          </div>
        </div>

        <!-- Service Details -->
        <div class="lg:flex-1">
          <div class="bg-white p-6 rounded-xl shadow-lg sticky top-4">
            <!-- Title and Category -->
            <div class="mb-4">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ service.title }}</h1>
              <div class="flex items-center mt-2">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
                  {{ service.category }}
                </span>
                <div class="flex items-center text-yellow-400">
                  <i v-for="n in 5" :key="n" class="fas text-sm"
                    :class="n <= service.rating ? 'fa-star' : 'fa-star-half-alt'"></i>
                  <span class="text-gray-500 text-sm ml-1">(24 reviews)</span>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-center text-gray-600 mb-4">
              <i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>
              <span>{{ service.location || 'Location not specified' }}</span>
            </div>

            <!-- Price -->
            <div class="mb-6">
              <p class="text-3xl font-bold text-blue-600">${{ service.price }}</p>
              <p class="text-sm text-gray-500">per service</p>
            </div>

            <!-- Availability -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-800">Availability</p>
                  <p :class="[
                    'text-sm',
                    service.available ? 'text-green-600' : 'text-red-600'
                  ]">
                    {{ service.available ? 'Available for booking' : 'Currently unavailable' }}
                  </p>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                  <span class="text-sm text-gray-600">Instant confirmation</span>
                </div>
              </div>
            </div>

            <!-- Provider Info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <p class="font-semibold text-gray-800 mb-2">Provider</p>
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <i class="fas fa-building text-blue-500"></i>
                </div>
                <div>
                  <p class="font-medium">{{ service.provider }}</p>
                  <p class="text-sm text-gray-600">Verified partner</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <router-link :to="{
                name: 'BookingPage',
                query: {
                  id: service.id,
                  title: service.title,
                  price: service.price,
                  provider: service.provider,
                  location: service.location,
                  description: service.description,
                  image: service.images && service.images.length > 0 ? service.images[0] : '',
                  category: service.category
                }
              }"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                <i class="fas fa-calendar-check"></i>
                Book Now
              </router-link>
              <button
                class="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2">
                <i class="far fa-heart"></i>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Description Section -->
      <div class="mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Description</h2>
        <div class="prose max-w-none text-gray-700">
          <p v-if="service.description">{{ service.description }}</p>
          <p v-else class="text-gray-500 italic">No description provided for this service.</p>
        </div>
      </div>
      <div class="eg-affiliate-banners" data-program="us-expedia" data-network="pz" data-layout="leaderboard"
        data-image="beach" data-message="search-hotels-flights-cars-activities-more" data-link="home"
        data-camref="1101l56HUy" data-pubref=""></div>

      <!-- Add this section before the related services or after the description -->
      <section class="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
              TRAVEL WITH CONFIDENCE
            </span>
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Book With Mite_Explorers?
            </h2>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              We go beyond bookings to deliver exceptional travel experiences
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Benefit 1 -->
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p class="text-gray-600">
                Found a better price elsewhere? We'll match it and give you an additional 10% off.
              </p>
            </div>

            <!-- Benefit 2 -->
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-headset text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600">
                Our travel experts are available round-the-clock to assist you, wherever you are.
              </p>
            </div>

            <!-- Benefit 3 -->
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-file-invoice-dollar text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Flexible Cancellation</h3>
              <p class="text-gray-600">
                Most bookings can be canceled or changed for free up to 24 hours before.
              </p>
            </div>

            <!-- Benefit 4 -->
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-medal text-yellow-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Verified Quality</h3>
              <p class="text-gray-600">
                Every service is personally vetted by our team to ensure exceptional standards.
              </p>
            </div>
          </div>

          <!-- Testimonial -->
          <div class="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div class="p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center">
              <div class="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
                <div class="relative h-64 w-full rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Happy customer" class="absolute inset-0 w-full h-full object-cover">
                  <div class="absolute inset-0 bg-gradient-to-t from-blue-800/70 via-transparent to-transparent"></div>
                  <div class="absolute bottom-4 left-4 text-white">
                    <p class="font-bold">Sarah Johnson</p>
                    <p class="text-sm opacity-90">New York, USA</p>
                  </div>
                </div>
              </div>
              <div class="lg:w-2/3">
                <div class="flex items-center text-yellow-400 mb-4">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <span class="ml-2 text-white text-sm">5.0 Rating</span>
                </div>
                <blockquote class="text-white text-lg sm:text-xl italic mb-6">
                  "Booking through Mite_Explorers was seamless from start to finish. When our flight was delayed, their
                  24/7 support team rearranged all our transfers and accommodations within an hour. This level of
                  service is why we'll never book anywhere else!"
                </blockquote>
                <div class="flex items-center">
                  <button
                    class="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors mr-4">
                    <i class="fas fa-play-circle mr-2"></i> Watch Video Testimonial
                  </button>
                  <button
                    class="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                    <i class="fas fa-book-open mr-2"></i> Read More Reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Services Section -->
      <div v-if="relatedServices.length > 0" class="related-services mt-16">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">You might also like</h2>
          <router-link to="/services" class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View all <i class="fas fa-chevron-right ml-1 text-sm"></i>
          </router-link>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link v-for="related in paginatedRelatedServices" :key="related.id" :to="`/services/${related.id}`"
            class="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div class="relative overflow-hidden h-48">
              <img v-if="related.images.length > 0" :src="`http://localhost:8000/media/${related.images[0]}`"
                alt="Related Service"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                <i class="fas fa-image text-gray-400 text-3xl"></i>
              </div>
              <div v-if="!related.available" class="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span class="bg-white text-red-600 font-bold px-3 py-1 rounded-md text-sm">SOLD OUT</span>
              </div>
              <div class="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm">
                <i class="far fa-heart text-gray-400 hover:text-red-500 transition-colors"></i>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {{ related.title }}
              </h3>
              <p class="text-gray-500 text-sm mt-1 flex items-center">
                <i class="fas fa-map-marker-alt text-blue-400 mr-1 text-xs"></i>
                {{ related.location || 'Various locations' }}
              </p>
              <div class="flex justify-between items-center mt-3">
                <p class="text-blue-600 font-bold">${{ related.price }}</p>
                <div class="flex items-center">
                  <i class="fas fa-star text-yellow-400 text-sm mr-1"></i>
                  <span class="text-gray-600 text-sm">4.8</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination -->
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-500">
            Showing <span class="font-semibold">{{ (currentRelatedPage - 1) * relatedItemsPerPage + 1 }}</span>
            to <span class="font-semibold">{{ Math.min(currentRelatedPage * relatedItemsPerPage,
              relatedServices.length)
            }}</span>
            of <span class="font-semibold">{{ relatedServices.length }}</span> results
          </div>

          <div class="flex items-center space-x-1">
            <button @click="changeRelatedPage(1)" :disabled="currentRelatedPage === 1"
              class="p-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              title="First page">
              <i class="fas fa-angle-double-left text-sm"></i>
            </button>
            <button @click="changeRelatedPage(currentRelatedPage - 1)" :disabled="currentRelatedPage === 1"
              class="p-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              title="Previous page">
              <i class="fas fa-angle-left text-sm"></i>
            </button>

            <template v-for="page in visibleRelatedPages" :key="page">
              <button @click="changeRelatedPage(page)" :class="[
                'w-10 h-10 rounded-lg border flex items-center justify-center',
                page === currentRelatedPage
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              ]">
                {{ page }}
              </button>
            </template>

            <button @click="changeRelatedPage(currentRelatedPage + 1)"
              :disabled="currentRelatedPage === totalRelatedPages"
              class="p-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              title="Next page">
              <i class="fas fa-angle-right text-sm"></i>
            </button>
            <button @click="changeRelatedPage(totalRelatedPages)" :disabled="currentRelatedPage === totalRelatedPages"
              class="p-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              title="Last page">
              <i class="fas fa-angle-double-right text-sm"></i>
            </button>
          </div>
        </div>

        <div v-if="paginationError" class="mt-4 text-center text-red-500 font-medium">
          {{ paginationError }}
        </div>
      </div>
    </div>
  </main>

  <TheFooter />
</template>

<style scoped>
/* Custom styles for better mobile experience */
@media (max-width: 640px) {
  .sticky {
    position: static;
  }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

/* Line clamping for text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Prose styling for descriptions */
.prose {
  line-height: 1.6;
}

.prose p {
  margin-bottom: 1em;
}

/* Aspect ratio for images */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 aspect ratio */
}

.aspect-w-16>* {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
