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

const airlines = [
  'Qatar Airways', 'Emirates', 'Turkish Airlines', 'Kenya Airways',
  'British Airways', 'Ethiopian Airlines', 'Lufthansa', 'Air France',
  'United Airlines', 'Delta Air Lines', 'American Airlines',
  'Singapore Airlines', 'Etihad Airways', 'South African Airways'
];


const sendToWhatsApp = () => {
  const phoneNumber = "+15207361677";
  const serviceLink = `https://afroartsafary.com/services/${bookingDetails.value.id}`;

  let message = `Hello, I am inquiring about the following service:

🔹 *Service Name:* ${bookingDetails.value.title}
🔹 *Provider:* ${bookingDetails.value.provider}
🔹 *Location:* ${bookingDetails.value.location}
🔹 *Category:* ${bookingDetails.value.category}
🔹 *Price:* $${bookingDetails.value.price}
📌 *Service Link:* ${serviceLink}

👤 *My Details:*
- *Name:* ${customerDetails.value.name}
- *Email:* ${customerDetails.value.email}
- *Phone:* ${customerDetails.value.phone}`;

  if (bookingDetails.value.category === "Stays" || bookingDetails.value.category === "Car Rentals") {
    message += `
- *Persons:* ${customerDetails.value.persons}
- *Check-in:* ${customerDetails.value.check_in_date}
- *Check-out:* ${customerDetails.value.check_out_date}`;
  } else if (bookingDetails.value.category === "Flights") {
    message += `
- *From:* ${customerDetails.value.from_location}
- *To:* ${customerDetails.value.to_location}
- *Departure:* ${customerDetails.value.departure_date}
- *Return:* ${customerDetails.value.return_date || "One-way flight"}`;
  } else if (
    ["Visa Application", "Green Card", "Travel Documents"].includes(bookingDetails.value.category)
  ) {
    message += `
- *Passport Number:* ${customerDetails.value.passport_number}
- *Nationality:* ${customerDetails.value.nationality}`;
  }

  message += `

📝 *Special Notes:* ${customerDetails.value.notes || "None"}
`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
};

const handleBooking = async () => {
  await submitBooking();
  if (!error.value) {
    sendToWhatsApp();
  }
};
</script>

<template>
  <TheNavbar />

  <div class="min-h-screen bg-gray-50">
    <div class="mt-4">
      <LifeLine />
    </div>
    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
      <div class="max-w-6xl mx-auto flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-green-700">
            {{ successMessage }}
          </p>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="max-w-6xl mx-auto flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            {{ error }}
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2">
      <div class="bg-green-100 border border-green-300 text-green-800 px-6 py-2 rounded-xl mb-6 text-center">
        <p class="mt-1 text-md max-w-2xl mx-auto">
          Please review your service details and provide the required information
        </p>
      </div>


      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Service Details Section -->
          <div class="p-8 lg:p-10 bg-gray-50 border-r border-gray-200">
            <div class="flex flex-col h-full">
              <div class="mb-6">
                <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {{ bookingDetails.category }}
                </span>
              </div>

              <div class="flex-1">
                <div class="relative rounded-xl overflow-hidden mb-6">
                  <img :src="serviceImage" alt="Service Image" class="w-full h-64 object-cover">
                  <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                    <i class="far fa-heart text-gray-400 hover:text-red-500 transition-colors cursor-pointer"></i>
                  </div>
                </div>

                <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ bookingDetails.title }}</h2>
                <div class="flex items-center text-gray-600 mb-4">
                  <i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                  <span>{{ bookingDetails.location }}</span>
                </div>

                <p class="text-gray-700 mb-6">{{ bookingDetails.description }}</p>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-500">Provider</p>
                    <p class="font-medium">{{ bookingDetails.provider }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Total Price</p>
                    <p class="text-2xl font-bold text-blue-600">${{ bookingDetails.price }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">What's included</h3>
                <ul class="space-y-2">
                  <li v-for="(item, index) in [
                    'Instant confirmation',
                    'Free cancellation',
                    '24/7 customer support',
                    'Secure payment'
                  ]" :key="index" class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Booking Form Section -->
          <div class="p-8 lg:p-10">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 p-2 rounded-lg mr-4">
                <i class="fas fa-user-edit text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Your Information</h3>
            </div>

            <!-- Stays / Car Rentals Form -->
            <form v-if="bookingDetails.category === 'Stays' || bookingDetails.category === 'Car Rentals'"
              @submit.prevent="handleBooking" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input v-model="customerDetails.name" type="text" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input v-model="customerDetails.email" type="email" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input v-model="customerDetails.phone" type="tel" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Number of Persons *</label>
                  <input v-model="customerDetails.persons" type="number" min="1" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
                  <input v-model="customerDetails.check_in_date" type="date" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
                  <input v-model="customerDetails.check_out_date" type="date" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea v-model="customerDetails.notes" rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>

              <div class="pt-4">
                <button type="submit" :disabled="isSubmitting"
                  class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
                  <span v-if="!isSubmitting">
                    <i class="fab fa-whatsapp mr-2"></i> Confirm Booking & Send via WhatsApp
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Processing...
                  </span>
                </button>
                <p class="mt-3 text-xs text-gray-500 text-center">
                  By completing this booking, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>

            <!-- Flights Form -->
            <form v-else-if="bookingDetails.category === 'Flights'" @submit.prevent="handleBooking" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input v-model="customerDetails.name" type="text" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input v-model="customerDetails.email" type="email" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input v-model="customerDetails.phone" type="tel" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Passengers *</label>
                  <input v-model="customerDetails.passengers" type="number" min="1" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Departure City *</label>
                  <input v-model="customerDetails.from_location" type="text" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Destination City *</label>
                  <input v-model="customerDetails.to_location" type="text" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Departure Date *</label>
                  <input v-model="customerDetails.departure_date" type="date" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <input v-model="customerDetails.return_date" type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Travel Class -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Travel Class *</label>
                  <select v-model="customerDetails.travel_class" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Class</option>
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>

                <!-- Preferred Airline -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Airline</label>
                  <select v-model="customerDetails.airline"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Airline</option>
                    <option v-for="airline in airlines" :key="airline" :value="airline">
                      {{ airline }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea v-model="customerDetails.notes" rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>

              <div class="pt-4">
                <button type="submit" :disabled="isSubmitting"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
                  <span v-if="!isSubmitting">
                    <i class="fas fa-paper-plane mr-2"></i> Confirm Flight Booking
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Processing...
                  </span>
                </button>
              </div>
            </form>

            <!-- Generic Form -->
            <form v-else @submit.prevent="handleBooking" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input v-model="customerDetails.name" type="text" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input v-model="customerDetails.email" type="email" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input v-model="customerDetails.phone" type="tel" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Date & Time</label>
                <input v-model="customerDetails.preferredDate" type="datetime-local"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>

              <!-- Location (if applicable) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location (if applicable)</label>
                <input v-model="customerDetails.location" type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message or Notes</label>
                <textarea v-model="customerDetails.notes" rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>

              <div class="pt-4">
                <button type="submit" :disabled="isSubmitting"
                  class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
                  <span v-if="!isSubmitting">
                    <i class="fab fa-whatsapp mr-2"></i> Confirm Booking & Send via WhatsApp
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Processing...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TheFooter />
</template>

<style scoped>
input,
select,
textarea {
  transition: all 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Loading spinner animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .border-r {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
}

.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 200ms;
}
</style>
