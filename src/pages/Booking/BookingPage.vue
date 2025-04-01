<script setup>
import { useBooking } from "@/composables/useBooking";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import LifeLine from "@/components/LifeLine.vue";

const {
  bookingDetails,
  serviceImage,
  customerDetails,
  isSubmitting,
  error,
  successMessage,
  submitBooking,
} = useBooking();

const sendToWhatsApp = () => {
  const phoneNumber = "254731727411"; // Replace with recipient's WhatsApp number

  const message = `Inquiry for the availability of this service, attached are my details:
- Name: ${customerDetails.value.name}
- Email: ${customerDetails.value.email}
- Phone: ${customerDetails.value.phone}
- Persons: ${customerDetails.value.persons}
- Check-in: ${customerDetails.value.check_in_date}
- Check-out: ${customerDetails.value.check_out_date}
- Service: ${bookingDetails.value.title}
- Provider: ${bookingDetails.value.provider}
- Location: ${bookingDetails.value.location}
- Price: $${bookingDetails.value.price}
- Notes: ${customerDetails.value.notes}`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};
</script>

<template>
  <TheNavbar />
  <LifeLine />

  <div class="bg-gray-100 px-2 py-4">
    <h1 class="text-3xl font-bold text-center mb-4">Confirm Your Booking</h1>

    <div v-if="error" class="text-red-500 text-center mb-4">
      {{ error }}
    </div>

    <div v-if="successMessage" class="text-green-500 text-center mb-4">
      {{ successMessage }}
    </div>

    <div class="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      <!-- Service Details Section -->
      <div>
        <img :src="serviceImage" alt="Service Image" class="w-full h-56 object-cover rounded-lg mb-4" />
        <h2 class="text-2xl font-semibold">{{ bookingDetails.title }}</h2>
        <p class="text-gray-800 mt-1">{{ bookingDetails.category }}</p>
        <p class="text-gray-600 mt-2">{{ bookingDetails.description }}</p>
        <p class="mt-2">
          <strong>Provider:</strong> {{ bookingDetails.provider }}
        </p>
        <p>
          <strong>Location:</strong> {{ bookingDetails.location }}
        </p>
        <p class="text-green-600 text-lg font-bold mt-2">
          Amount: ${{ bookingDetails.price }}
        </p>
      </div>

      <!-- Booking Form Section -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Enter Your Details</h3>

        <form @submit.prevent="submitBooking" class="space-y-4">
          <input v-model="customerDetails.name" type="text" class="w-full p-2 border rounded-md" placeholder="Full Name"
            required />

          <input v-model="customerDetails.email" type="email" class="w-full p-2 border rounded-md"
            placeholder="Email Address" required />

          <input v-model="customerDetails.phone" type="text" class="w-full p-2 border rounded-md"
            placeholder="Phone Number" required />

          <input v-model="customerDetails.persons" type="number" class="w-full p-2 border rounded-md"
            placeholder="Number of Persons" required />

          <label for="check_in_date" class="block text-sm font-semibold">
            From When
          </label>
          <input v-model="customerDetails.check_in_date" id="check_in_date" type="date"
            class="w-full p-2 border rounded-md" required />

          <label for="check_out_date" class="block text-sm font-semibold">
            To When
          </label>
          <input v-model="customerDetails.check_out_date" id="check_out_date" type="date"
            class="w-full p-2 border rounded-md" required />

          <textarea v-model="customerDetails.notes" class="w-full p-2 border rounded-md"
            placeholder="Special Request"></textarea>

          <button type="submit"
            class="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Processing...' : 'Confirm Booking' }}
          </button>
        </form>

        <!-- Send to WhatsApp Button -->
        <button @click="sendToWhatsApp"
          class="mt-4 w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition">
          Send to WhatsApp
        </button>
      </div>
    </div>
  </div>

  <TheFooter />
</template>
