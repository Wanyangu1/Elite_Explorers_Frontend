<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-indigo-50/30">
    <TheNavbar />

    <!-- Hero Section -->
    <section class="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
          alt="Travel agent helping customer" class="w-full h-full object-cover object-center" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 text-center">
        <div class="inline-flex px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <span class="text-sm font-medium text-white">Premium Booking Service</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
            Personalized Travel Assistance
          </span>
        </h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Our concierge team crafts seamless travel experiences tailored to your unique preferences and requirements.
        </p>
      </div>

      <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="relative py-20 -mt-16 z-10">
      <div class="max-w-6xl mx-auto px-6">
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- Image Column -->
            <div class="relative min-h-[500px] hidden lg:block">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90"></div>
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Happy traveler with agent" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                loading="lazy" />

              <div class="relative h-full flex flex-col justify-between p-10 text-white">
                <div>
                  <h3 class="text-3xl font-bold mb-6">Let Us Handle the Details</h3>
                  <ul class="space-y-5">
                    <li class="flex items-start">
                      <div class="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                          </path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-lg">Best Price Guarantee</h4>
                        <p class="text-blue-100 mt-1">We'll match any lower price you find with our partners</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-lg">24/7 Support</h4>
                        <p class="text-blue-100 mt-1">Our travel experts are available anytime to assist you</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 bg-blue-500/20 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                          </path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold text-lg">Local Expertise</h4>
                        <p class="text-blue-100 mt-1">Access to exclusive experiences and hidden gems</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                        alt="Travel agent" class="h-12 w-12 rounded-full object-cover border-2 border-white">
                    </div>
                    <div class="ml-4">
                      <h4 class="font-bold text-white">Your Dedicated Agent</h4>
                      <p class="text-blue-100 text-sm">Available via WhatsApp for instant assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Column -->
            <div class="p-10">
              <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-3">Booking Assistance Request</h2>
                <p class="text-gray-600">Complete this form and our travel specialist will contact you within 15 minutes
                </p>
              </div>

              <form @submit.prevent="submitToWhatsApp" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <input v-model="form.name" type="text" id="name" required
                        class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                        placeholder="John Doe">
                    </div>
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                          </path>
                        </svg>
                      </div>
                      <input v-model="form.phone" type="tel" id="phone" required
                        class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                        placeholder="254 731 727 411">
                    </div>
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                      </svg>
                    </div>
                    <input v-model="form.email" type="email" id="email"
                      class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                      placeholder="your@email.com">
                  </div>
                </div>

                <div>
                  <label for="service" class="block text-sm font-medium text-gray-700 mb-2">Service Needed *</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                      </svg>
                    </div>
                    <select v-model="form.service" id="service" required class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white
         bg-[url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3e%3cpolyline points=%226 9 12 15 18 9%22/%3e%3c/svg%3e')]
         bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]">
                      <option value="" disabled>Select a service</option>
                      <option value="Flight Booking">Flight Booking</option>
                      <option value="Hotel Reservation">Hotel Reservation</option>
                      <option value="Vacation Package">Vacation Package</option>
                      <option value="Car Rental">Car Rental</option>
                      <option value="Cruise Booking">Cruise Booking</option>
                      <option value="Visa Assistance">Visa Assistance</option>
                      <option value="Other">Other</option>
                    </select>

                  </div>
                </div>

                <div>
                  <label for="details" class="block text-sm font-medium text-gray-700 mb-2">Trip Details *</label>
                  <div class="relative">
                    <div class="absolute top-3 left-3">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                        </path>
                      </svg>
                    </div>
                    <textarea v-model="form.details" id="details" rows="5" required
                      class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                      placeholder="Please include:\n- Travel dates\n- Destinations\n- Number of travelers\n- Budget range\n- Any special requirements"></textarea>
                  </div>
                </div>

                <div class="pt-4">
                  <button type="submit" :disabled="isSubmitting"
                    class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center shadow-lg hover:shadow-xl">
                    <span v-if="!isSubmitting" class="flex items-center">
                      <i class="fab fa-whatsapp mr-3 text-xl"></i>
                      Submit Request
                    </span>
                    <span v-else class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      Processing...
                    </span>
                  </button>
                  <p class="text-xs text-gray-500 mt-3 text-center">
                    By submitting this form, you agree to our <a href="#" class="text-blue-600 hover:underline">Terms of
                      Service</a> and <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300">
      <div
        class="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in shadow-2xl border border-white/20">
        <div
          class="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Request Received!</h3>
        <p class="text-gray-600 mb-6">
          Your booking assistant will contact you via WhatsApp within 15 minutes to discuss your travel plans.
        </p>
        <div class="bg-blue-50/50 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-700">
            <span class="font-medium">Next Step:</span> Keep your phone nearby for our agent's WhatsApp message
          </p>
        </div>
        <button @click="showSuccessModal = false"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
          Close Window
        </button>
      </div>
    </div>

    <!-- Testimonials Section -->
    <section class="relative py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 relative">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            Client Experiences
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Travelers Worldwide</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from travelers who've benefited from our personalized service
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name"
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div class="flex items-start mb-6">
              <img :src="testimonial.image" :alt="testimonial.name"
                class="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md">
              <div class="ml-4">
                <h4 class="font-bold text-gray-900">{{ testimonial.name }}</h4>
                <div class="flex mt-1">
                  <i class="fas fa-star text-yellow-400" v-for="n in testimonial.rating" :key="n"></i>
                  <i class="fas fa-star text-gray-300" v-for="n in (5 - testimonial.rating)" :key="'empty-' + n"></i>
                </div>
              </div>
            </div>
            <p
              class="text-gray-600 italic relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-blue-400 before:to-indigo-500">
              "{{ testimonial.quote }}"
            </p>

          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div class="p-10 flex flex-col lg:flex-row items-center">
            <div class="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <h3 class="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
              <p class="text-blue-100 mb-6">
                Our travel experts are standing by to create your perfect itinerary. Get personalized recommendations
                and exclusive deals when you book with us.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="/contact"
                  class="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-phone-alt"></i> Call Our Experts
                </a>
                <a href="/"
                  class="bg-transparent border border-white text-white font-medium py-3 px-6 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-search"></i> Browse Services
                </a>
              </div>
            </div>
            <div class="lg:w-1/2">
              <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h4 class="font-bold text-white mb-3">Quick Contact Options</h4>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <div class="bg-green-500 p-2 rounded-full mr-3">
                      <i class="fab fa-whatsapp text-white"></i>
                    </div>
                    <div>
                      <p class="text-white font-medium">WhatsApp</p>
                      <p class="text-blue-100 text-sm">+254 731 727 411</p>
                    </div>
                  </li>
                  <li class="flex items-center">
                    <div class="bg-blue-500 p-2 rounded-full mr-3">
                      <i class="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <p class="text-white font-medium">Email</p>
                      <p class="text-blue-100 text-sm">bookings@miteexplorers.com</p>
                    </div>
                  </li>
                  <li class="flex items-center">
                    <div class="bg-indigo-500 p-2 rounded-full mr-3">
                      <i class="fas fa-phone-alt text-white"></i>
                    </div>
                    <div>
                      <p class="text-white font-medium">Phone</p>
                      <p class="text-blue-100 text-sm">+254 700 000 000</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const form = ref({
  name: '',
  phone: '',
  email: '',
  service: '',
  details: ''
});

const showSuccessModal = ref(false);
const isSubmitting = ref(false);

const testimonials = [
  {
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'The booking agent saved me hours of research and got me a better deal than I could find online!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'I had complex multi-city flights and hotels to book. Their agent made it all seamless.',
    rating: 5
  },
  {
    name: 'Amina Diallo',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'The personalized attention was amazing. They remembered all my preferences from previous trips.',
    rating: 4
  }
];

const submitToWhatsApp = () => {
  isSubmitting.value = true;

  // Simulate processing delay
  setTimeout(() => {
    const phoneNumber = '15207361677';
    const message = `*New Booking Assistance Request*\n\n` +
      `*Name:* ${form.value.name}\n` +
      `*Phone:* ${form.value.phone}\n` +
      `*Email:* ${form.value.email || 'Not provided'}\n` +
      `*Service Needed:* ${form.value.service}\n\n` +
      `*Booking Details:*\n${form.value.details}\n\n` +
      `Please contact this client to assist with their booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    showSuccessModal.value = true;
    isSubmitting.value = false;

    form.value = {
      name: '',
      phone: '',
      email: '',
      service: '',
      details: ''
    };
  }, 1500);
};
</script>

<style>
.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
  }

  to {
    transform: scale(1) translateY(0);
    opacity: 1;
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
    transform: translateY(0) translateX(-50%);
  }

  40% {
    transform: translateY(-20px) translateX(-50%);
  }

  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
input,
select,
textarea,
button {
  transition: all 0.25s ease;
}

/* Custom focus styles */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}

/* Custom select arrow */
select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
}

/* Gradient border effect */
.border-gradient {
  position: relative;
  border: 1px solid transparent;
  background-clip: padding-box;
}

.border-gradient::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #3B82F6, #8B5CF6);
  z-index: -1;
  border-radius: inherit;
}
</style>
