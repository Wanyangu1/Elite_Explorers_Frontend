<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const form = ref({ fullName: '', email: '', issueType: '', message: '' });
const errors = ref({});
const attachment = ref(null);
const whatsappNumber = '15207361677'; // Change to desired number

function handleFileUpload(event) {
  attachment.value = event.target.files[0];
}

function submitForm() {
  errors.value = {};

  // Validation
  if (!form.value.fullName) errors.value.fullName = 'Full name is required.';
  if (!form.value.email) errors.value.email = 'Email is required.';
  if (!form.value.issueType) errors.value.issueType = 'Please select an issue type.';
  if (!form.value.message) errors.value.message = 'Please describe your issue.';

  if (Object.keys(errors.value).length === 0) {
    // Static + Dynamic message
    const message = `*--Contact for support--*\n\n` +
      `Hello, my name is ${form.value.fullName}.\n` +
      `Email: ${form.value.email}\n` +
      `Issue Type: ${form.value.issueType}\n\n` +
      `Message:\n${form.value.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Clear form
    form.value = { fullName: '', email: '', issueType: '', message: '' };
    attachment.value = null;
  }
}
</script>

<template>
  <TheNavbar />
  <div class="bg-gray-50 min-h-screen">
    <!-- Header Bar -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <i class="fas fa-hands-helping text-blue-600 text-xl mr-2"></i>
            <span class="text-xl font-semibold text-gray-900">ServiceHub Help</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Content Section -->
    <div class="py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="hidden md:block w-72 pr-8">
        <div class="sticky top-24">
          <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 shadow-sm">
            <div class="flex items-start space-x-3 mb-4">
              <i class="fas fa-info-circle text-blue-600 mt-1 text-xl"></i>
              <div>
                <h2 class="text-xl font-bold text-gray-800">Need Help?</h2>
                <p class="text-sm text-gray-600 mt-1">We're here to assist you with any issues</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="p-3 bg-white rounded-md border border-blue-100">
                <h3 class="font-medium text-blue-700 flex items-center">
                  <i class="fas fa-lightbulb mr-2"></i> Quick Tips
                </h3>
                <ul class="mt-2 text-sm text-gray-600 space-y-2 pl-6 list-disc">
                  <li>Provide detailed information</li>
                  <li>Check our FAQ section</li>
                  <li>Include screenshots</li>
                  <li>Response within 24 hours</li>
                </ul>
              </div>
              <div class="p-3 bg-blue-50 rounded-md">
                <h3 class="font-medium text-blue-700 flex items-center">
                  <i class="fas fa-clock mr-2"></i> Support Hours
                </h3>
                <p class="mt-2 text-sm text-gray-600">
                  Mon–Fri: 8AM–6PM<br />Sat: 9AM–2PM<br />Closed Sundays
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Form Section -->
      <section class="flex-1">
        <!-- Mobile-only header -->
        <div class="md:hidden mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
          <div class="flex items-start">
            <i class="fas fa-info-circle text-blue-600 mt-1 mr-3 text-xl"></i>
            <div>
              <h3 class="font-medium text-gray-800">Contact Our Support Team</h3>
              <p class="text-sm text-gray-600 mt-1">Fill out this form and we'll get back to you ASAP.</p>
            </div>
          </div>
        </div>

        <!-- Form Card -->
        <div class="bg-white shadow rounded-lg p-6 sm:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-6 border-b pb-2 flex items-center">
            <i class="fas fa-envelope-open-text mr-2 text-blue-600"></i>
            Send us a message
          </h3>

          <!-- Input Fields -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <i class="fas fa-user mr-2 text-blue-500"></i> Full Name *
              </label>
              <input v-model="form.fullName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Your full name" />
              <p v-if="errors.fullName" class="text-red-600 text-sm mt-1">{{ errors.fullName }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <i class="fas fa-envelope mr-2 text-blue-500"></i> Email Address *
              </label>
              <input v-model="form.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="you@example.com" />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <i class="fas fa-question-circle mr-2 text-blue-500"></i> Issue Type *
              </label>
              <select v-model="form.issueType" class="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option disabled value="">Select an issue type</option>
                <option value="Account">Account Issues</option>
                <option value="Service">Service Problems</option>
                <option value="Payment">Payment Questions</option>
                <option value="Technical">Technical Support</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.issueType" class="text-red-600 text-sm mt-1">{{ errors.issueType }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <i class="fas fa-comment-dots mr-2 text-blue-500"></i> Describe your issue *
              </label>
              <textarea v-model="form.message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Please describe your issue in detail..."></textarea>
              <p v-if="errors.message" class="text-red-600 text-sm mt-1">{{ errors.message }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <i class="fas fa-paperclip mr-2 text-blue-500"></i> Attachments (optional)
              </label>
              <input type="file" @change="handleFileUpload" />
              <p v-if="attachment" class="text-sm text-green-600 mt-2">
                <i class="fas fa-check-circle mr-1"></i> {{ attachment.name }}
              </p>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 flex justify-end">
            <button @click="submitForm" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <i class="fab fa-whatsapp mr-2"></i> Send via WhatsApp
            </button>
          </div>
        </div>

        <!-- Contact Info Cards -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex items-center mb-3">
              <div class="bg-blue-100 p-3 rounded-full mr-4">
                <i class="fas fa-phone-alt text-blue-600"></i>
              </div>
              <h3 class="font-medium text-gray-800">Call Us</h3>
            </div>
            <p class="text-sm text-gray-600 mb-2">Prefer to talk to someone directly?</p>
            <a href="tel:+254731727411" class="text-blue-600 font-medium">+152 073 616 77</a>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex items-center mb-3">
              <div class="bg-green-100 p-3 rounded-full mr-4">
                <i class="fab fa-whatsapp text-green-600"></i>
              </div>
              <h3 class="font-medium text-gray-800">WhatsApp</h3>
            </div>
            <p class="text-sm text-gray-600 mb-2">Chat with us on WhatsApp</p>
            <a :href="`https://wa.me/${whatsappNumber}`" target="_blank" class="text-green-600 font-medium">Message
              Now</a>
          </div>
        </div>
      </section>
    </div>
  </div>
  <TheFooter />
</template>

<style scoped>
input[type="file"] {
  margin-top: 0.5rem;
}
</style>
