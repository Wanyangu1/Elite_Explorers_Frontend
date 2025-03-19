<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import LifeLine from '@/components/LifeLine.vue';

const route = useRoute();
const router = useRouter();

// Extracting booking details from query parameters
const bookingDetails = computed(() => ({
  id: route.query.id,
  title: route.query.title,
  price: route.query.price,
  provider: route.query.provider,
  location: route.query.location,
  description: route.query.description,
  image: route.query.image, // Extracted image URL
}));

// Compute full image path (assuming images are stored in /media/ on the backend)
const serviceImage = computed(() => {
  return bookingDetails.value.image
    ? `http://localhost:8000/media/${bookingDetails.value.image}`
    : '/default-service.jpg'; // Fallback image
});

// Form state using a single ref object
const customerDetails = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'credit_card',
  notes: '',
});

// State management
const isSubmitting = ref(false);
const error = ref(null);
const successMessage = ref(null);

// Submit booking
const submitBooking = async () => {
  error.value = null;
  successMessage.value = null;

  // Basic validation
  if (!customerDetails.value.name || !customerDetails.value.email || !customerDetails.value.phone || !customerDetails.value.address) {
    error.value = 'Please fill in all required fields.';
    return;
  }

  isSubmitting.value = true;

  try {
    await axiosInstance.post('/api/bookings/', {
      service_id: bookingDetails.value.id,
      ...customerDetails.value,
    });

    successMessage.value = 'Booking confirmed successfully!';
    setTimeout(() => {
      router.push('/');
    }, 3000);
  } catch (err) {
    error.value = 'Error submitting booking. Please try again.';
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <TheNavbar />
  <LifeLine />
  <div class="bg-gray-100 px-2 py-4">
    <h1 class="text-3xl font-bold text-center mb-4">Confirm Your Booking</h1>

    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>
    <div v-if="successMessage" class="text-green-500 text-center mb-4">{{ successMessage }}</div>

    <!-- Booking Details Section -->
    <div class=" p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      <!-- Left: Service Image & Details -->
      <div>
        <img :src="serviceImage" alt="Service Image" class="w-full h-56 object-cover rounded-lg mb-4" />
        <h2 class="text-2xl font-semibold">{{ bookingDetails.title }}</h2>
        <p class="text-gray-600 mt-2">{{ bookingDetails.description }}</p>
        <p class="mt-2"><strong>Provider:</strong> {{ bookingDetails.provider }}</p>
        <p><strong>Location:</strong> {{ bookingDetails.location }}</p>
        <p class="text-green-600 text-lg font-bold mt-2">Amount: ${{ bookingDetails.price }}</p>
      </div>

      <!-- Right: Booking Form -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Enter Your Details</h3>
        <form @submit.prevent="submitBooking" class="space-y-4">
          <div class="flex items-center border rounded-md p-0 bg-gray-50">
            <i class="fas fa-user text-gray-500 px-2"></i>
            <input v-model="customerDetails.name" type="text" class="w-full p-2 outline-none" placeholder="Full Name"
              required />
          </div>

          <div class="flex items-center border rounded-md p-0 bg-gray-50">
            <i class="fas fa-envelope text-gray-500 px-2"></i>
            <input v-model="customerDetails.email" type="email" class="w-full p-2 outline-none"
              placeholder="Email Address" required />
          </div>

          <div class="flex items-center border rounded-md p-0 bg-gray-50">
            <i class="fas fa-phone text-gray-500 px-2"></i>
            <input v-model="customerDetails.phone" type="text" class="w-full p-2 outline-none"
              placeholder="Phone Number" required />
          </div>

          <div class="flex items-center border rounded-md p-0 bg-gray-50">
            <i class="fas fa-map-marker-alt text-gray-500 px-2"></i>
            <input v-model="customerDetails.address" type="text" class="w-full p-2 outline-none" placeholder="Location"
              required />
          </div>
          <!-- Check-in Date -->
          <div class="mb-4">
            <label for="check_in_date" class="block text-sm font-semibold">From When</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-calendar-alt p-2 text-gray-500"></i>
              <input id="check_in_date" type="date" class="w-full p-2 border-none focus:outline-none" required />
            </div>
          </div>

          <!-- Check-out Date -->
          <div class="mb-4">
            <label for="check_out_date" class="block text-sm font-semibold">To When</label>
            <div class="flex items-center border border-gray-300 rounded-md">
              <i class="fas fa-calendar-day p-2 text-gray-500"></i>
              <input id="check_out_date" type="date" class="w-full p-2 border-none focus:outline-none" required />
            </div>
          </div>

          <div class="flex items-center border rounded-md p-0 bg-gray-50">
            <i class="fas fa-sticky-note text-gray-500 px-2"></i>
            <textarea v-model="customerDetails.notes" class="w-full p-2 outline-none"
              placeholder="Destination (Where to?)"></textarea>
          </div>

          <button type="submit"
            class="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Processing...' : 'Confirm Booking' }}
          </button>
        </form>
      </div>
    </div>
  </div>

  <TheFooter />
</template>
