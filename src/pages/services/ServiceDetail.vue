<script setup>
import { ref, computed, onMounted } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useServiceDetail } from '@/composables/useServiceDetail';
import geometricImage from '@/assets/images/geometric3.png';

const geometricUrlImage = geometricImage;

const { service, isLoading, error, currentImage, relatedServices, changeImage } = useServiceDetail();

const sendWhatsAppMessage = () => {
  const phoneNumber = "+15207361677";
  const serviceLink = "https://afroartsafary.com/services/";
  const message = `📢 *Advertisement Inquiry*
(${serviceLink})

Hello, I'm inquiring about the procedure to advertise on your platform. How do I go about it?`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};

// --- Pagination for Related Services ---
const relatedItemsPerPage = 4;
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

// (Optional) Compute visible pages for navigation
const visibleRelatedPages = computed(() => {
  const range = 2;
  const start = Math.max(1, currentRelatedPage.value - range);
  const end = Math.min(totalRelatedPages.value, currentRelatedPage.value + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Change page function for related services (without scrolling)
const changeRelatedPage = (newPage) => {
  newPage = Math.max(1, Math.min(newPage, totalRelatedPages.value));
  if (newPage !== currentRelatedPage.value) {
    currentRelatedPage.value = newPage;
    paginationError.value = '';
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
    <div class="shadow-sm py-1 px-6 mb-2">
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
          <p class="text-sm text-gray-600 mt-1">Payment</p>
        </div>
        <div class="w-20 h-1 bg-gray-300"></div>
        <!-- Confirmation -->
        <div class="flex flex-col items-center">
          <i class="fas fa-check-circle text-blue-500 text-2xl"></i>
          <p class="text-sm text-gray-600 mt-1">Confirmation</p>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center text-lg">Loading service details...</div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

    <div v-else class="mx-auto p-8">
      <!-- Main Service Section -->
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <!-- Image Section -->
        <div class="flex-1 mb-4 sm:mb-0">
          <div v-if="currentImage" class="w-full h-80 mb-3">
            <img :src="`http://localhost:8000/media/${currentImage}`" alt="Service Image"
              class="w-full h-full object-contain rounded-md" />
          </div>
          <div class="flex gap-2 mt-4">
            <img v-for="image in service.images" :key="image" :src="`http://localhost:8000/media/${image}`"
              alt="Service Thumbnail"
              class="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-gray-500"
              @click="changeImage(image)" />
          </div>
        </div>
        <!-- Service Details -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold">{{ service.title }}</h1>
          <p class="text-gray-600 text-lg">{{ service.category }}</p>
          <p class="text-gray-800 mt-2"><strong>Provider:</strong> {{ service.provider }}</p>
          <p class="text-green-600 text-xl font-semibold mt-2">${{ service.price }}</p>
          <p class="text-sm text-gray-500">{{ service.location }}</p>
          <div v-if="service.description" class="mt-6 mb-2">
            <h3 class="text-xl font-semibold">Service Details:</h3>
            <p class="text-gray-700 mt-2">{{ service.description }}</p>
          </div>
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
            class="mt-4 px-6 py-2 border-2 border-green-500 text-green-500 rounded-md font-semibold hover:bg-green-500 hover:text-white transition">
            Book Now
          </router-link>
        </div>
      </div>

      <!-- Marketing Section (full-width, no side margins) -->
      <div class="relative p-8 rounded-lg shadow-md my-10 text-center text-white bg-contain bg-center"
        :style="{ backgroundImage: `url(${geometricUrlImage})`, marginLeft: '0', marginRight: '0' }">
        <div class="bg-overlay"></div>
        <div class="relative">
          <h2 class="text-3xl font-bold">Boost Your Brand with Us!</h2>
          <p class="mt-2 font-semibold">
            Expand your reach and connect with the right audience through strategic, high-impact advertising.
            Our platform ensures visibility, credibility, and engagement for your business.
          </p>
          <div class="flex justify-center mt-6">
            <button @click="sendWhatsAppMessage"
              class="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition flex items-center gap-2">
              <i class="fab fa-whatsapp text-lg"></i> WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      <!-- Related Services Section -->
      <div v-if="relatedServices.length > 0" class="mt-15">
        <h2 class="text-2xl font-semibold mb-4">Related Services</h2>
        <!-- Grid: 2 columns on phone screens, 3 on md, 4 on lg -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <router-link :to="`/services/${related.id}`" v-for="related in paginatedRelatedServices" :key="related.id"
            class="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 block">
            <img v-if="related.images.length > 0" :src="`http://localhost:8000/media/${related.images[0]}`"
              alt="Related Service" class="w-full h-40 object-cover rounded-md mb-3" />
            <h3 class="text-lg font-bold">{{ related.title }}</h3>
            <p class="text-gray-600 text-sm">{{ related.provider }}</p>
            <p class="text-green-600 font-semibold text-lg">${{ related.price }}</p>
            <div class="flex justify-between items-center mt-2">
              <p :class="['px-2 py-1 rounded-full text-white text-sm inline-flex items-center',
                related.available ? 'bg-green-500' : 'bg-red-500']">
                {{ related.available ? 'Available' : 'Not Available' }}
              </p>
              <div class="flex items-center space-x-1 text-yellow-400">
                <i v-for="n in 5" :key="n" class="fas"
                  :class="n <= related.rating ? 'fa-star' : 'fa-star-half-alt'"></i>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination Controls Below Related Services -->
        <div class="flex justify-center space-x-2 mt-4">
          <button @click="changeRelatedPage(1)" :disabled="currentRelatedPage === 1"
            class="bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
            title="First page">&laquo;</button>
          <button @click="changeRelatedPage(currentRelatedPage - 1)" :disabled="currentRelatedPage === 1"
            class="bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
            title="Previous page">&lsaquo;</button>
          <template v-for="page in visibleRelatedPages" :key="page">
            <button @click="changeRelatedPage(page)"
              :class="['py-2 px-3 rounded transition-colors cursor-pointer', page === currentRelatedPage ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white', 'hover:bg-green-600']">
              {{ page }}
            </button>
          </template>
          <button @click="changeRelatedPage(currentRelatedPage + 1)"
            :disabled="currentRelatedPage === totalRelatedPages"
            class="bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
            title="Next page">&rsaquo;</button>
          <button @click="changeRelatedPage(totalRelatedPages)" :disabled="currentRelatedPage === totalRelatedPages"
            class="bg-blue-500 text-white py-2 px-3 rounded disabled:opacity-50 transition-colors hover:bg-green-600 cursor-pointer"
            title="Last page">&raquo;</button>
        </div>
        <!-- Display pagination error if any -->
        <div v-if="paginationError" class="text-red-500 text-center mt-4">
          {{ paginationError }}
        </div>
      </div>
    </div>
  </div>

  <TheFooter />
</template>

<style scoped>
.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>
