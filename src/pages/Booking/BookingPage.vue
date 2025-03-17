<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

// Get query parameters from route
const route = useRoute();
const router = useRouter();

const bookingDetails = computed(() => ({
  id: route.query.id,
  title: route.query.title,
  price: route.query.price,
  provider: route.query.provider,
  location: route.query.location,
  description: route.query.description,
}));

const customerName = ref('');
const customerEmail = ref('');
const customerPhone = ref('');
const isSubmitting = ref(false);
const error = ref(null);
const successMessage = ref(null);

const submitBooking = async () => {
  if (!customerName.value || !customerEmail.value || !customerPhone.value) {
    error.value = 'Please fill in all required fields.';
    return;
  }

  isSubmitting.value = true;
  error.value = null;
  successMessage.value = null;

  try {
    const response = await axiosInstance.post('/api/bookings/', {
      service_id: bookingDetails.value.id,
      customer_name: customerName.value,
      customer_email: customerEmail.value,
      customer_phone: customerPhone.value,
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
  <div class="bg-gray-100 px-4 py-1">
    <!-- Booking Lifeline -->
    <div class="shadow-sm py-1 px-6 mb-2">
      <div class="flex items-center justify-between max-w-3xl mx-auto">
        <!-- Service Selection -->
        <div class="flex flex-col items-center">
          <i class="fas fa-list-alt text-blue-500 text-2xl"></i>
          <p class="text-sm text-gray-600 mt-1">Service Selection</p>
        </div>
        <div class="w-20 h-1 bg-gray-300"></div>

        <!-- Details (Highlighted) -->
        <div class="flex flex-col items-center">
          <i class="fas fa-user text-white text-2xl bg-blue-500 p-2 rounded-full"></i>
          <p class="text-sm font-semibold text-gray-600 mt-1">Details</p>
        </div>
        <div class="w-20 h-1 bg-green-500"></div>

        <!-- Payment -->
        <div class="flex flex-col items-center">
          <i class="fas fa-credit-card text-white text-2xl bg-green-500 p-2 rounded-full"></i>
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

    <h1 class="text-3xl font-bold text-center mb-6">Confirm Your Booking</h1>

    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>
    <div v-if="successMessage" class="text-green-500 text-center mb-4">{{ successMessage }}</div>

    <!-- Layout Container -->
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      <!-- Left Side: Service Image & Details -->
      <div>
        <!-- Service Image -->
        <img :src="bookingDetails.image || '/default-service.jpg'" alt="Service Image"
          class="w-full h-56 object-cover rounded-lg mb-4" />

        <!-- Service Details -->
        <h2 class="text-2xl font-semibold">{{ bookingDetails.title }}</h2>
        <p class="text-gray-600 mt-2">{{ bookingDetails.description }}</p>
        <p class="mt-2"><strong>Provider:</strong> {{ bookingDetails.provider }}</p>
        <p><strong>Location:</strong> {{ bookingDetails.location }}</p>
        <p class="text-green-600 text-lg font-bold mt-2">${{ bookingDetails.price }}</p>
      </div>

      <!-- Right Side: Booking Form -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Enter Your Details</h3>
        <form @submit.prevent="submitBooking" class="space-y-4">
          <div class="flex items-center border rounded-md p-2 bg-gray-50">
            <i class="fas fa-user text-gray-500 px-2"></i>
            <input v-model="customerName" type="text" class="w-full p-2 outline-none" placeholder="Full Name"
              required />
          </div>

          <div class="flex items-center border rounded-md p-2 bg-gray-50">
            <i class="fas fa-envelope text-gray-500 px-2"></i>
            <input v-model="customerEmail" type="email" class="w-full p-2 outline-none" placeholder="Email Address"
              required />
          </div>

          <div class="flex items-center border rounded-md p-2 bg-gray-50">
            <i class="fas fa-phone text-gray-500 px-2"></i>
            <input v-model="customerPhone" type="text" class="w-full p-2 outline-none" placeholder="Phone Number"
              required />
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
