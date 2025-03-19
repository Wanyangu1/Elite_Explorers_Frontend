<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const route = useRoute();
const serviceId = ref(route.params.id);
const service = ref(null);
const isLoading = ref(true);
const error = ref(null);
const currentImage = ref(null);
const relatedServices = ref([]);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const fetchServiceDetails = async () => {
  try {
    const response = await axiosInstance.get(`/api/services/services/${serviceId.value}`);
    service.value = response.data;

    // Set the first image as default if available
    if (service.value.images && service.value.images.length > 0) {
      currentImage.value = service.value.images[0];
    }

    fetchRelatedServices(service.value.category);
  } catch (err) {
    error.value = 'Error fetching service details';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const fetchRelatedServices = async (category) => {
  try {
    const response = await axiosInstance.get(`/api/services/services?category=${category}`);
    relatedServices.value = response.data.filter(s => s.id !== serviceId.value);
  } catch (err) {
    console.error('Error fetching related services', err);
  }
};

// Function to change main image when clicking on smaller images
const changeImage = (image) => {
  currentImage.value = image;
};

// Watch for route changes to refetch data
watch(() => route.params.id, (newId) => {
  serviceId.value = newId;
  fetchServiceDetails();
});

onMounted(fetchServiceDetails);
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
              image: service.images && service.images.length > 0 ? service.images[0] : '' // First Image
            }
          }"
            class="mt-4 px-6 py-2 border-2 border-green-500 text-green-500 rounded-md font-semibold hover:bg-green-500 hover:text-white transition">
            Book Now
          </router-link>

        </div>
      </div>

      <!-- Related Services Section -->
      <div v-if="relatedServices.length > 0" class="mt-15">
        <h2 class="text-2xl font-semibold mb-4">Related Services</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <router-link :to="`/services/${related.id}`" v-for="related in relatedServices" :key="related.id"
            class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 block"
            @click="scrollToTop">
            <img v-if="related.images.length > 0" :src="`http://localhost:8000/media/${related.images[0]}`"
              alt="Related Service" class="w-full h-40 object-cover rounded-md mb-3" />
            <h3 class="text-lg font-bold">{{ related.title }}</h3>
            <p class="text-gray-600 text-sm">{{ related.provider }}</p>
            <p class="text-green-600 font-semibold text-lg">${{ related.price }}</p>
            <!-- Availability Tag with Rating -->
            <div class="flex justify-between items-center mt-2">
              <p :class="[
                'px-2 py-1 rounded-full text-white text-sm inline-flex items-center',
                related.available ? 'bg-green-500' : 'bg-red-500'
              ]">
                {{ related.available ? 'Available' : 'Not Available' }}
              </p>
              <!-- Star Rating -->
              <div class="flex items-center space-x-1 text-yellow-400">
                <i v-for="n in 5" :key="n" class="fas"
                  :class="n <= related.rating ? 'fa-star' : 'fa-star-half-alt'"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <TheFooter />
</template>
