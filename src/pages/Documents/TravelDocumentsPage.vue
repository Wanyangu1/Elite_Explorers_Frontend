<script setup>
import { ref } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

const currentStep = ref(1)
const steps = [
  { title: 'Personal Info', icon: '👤' },
  { title: 'Case Info', icon: '📋' },
  { title: 'Travel Info', icon: '✈️' },
  { title: 'Contact Info', icon: '📞' },
  { title: 'Review', icon: '✅' }
]

const formData = ref({
  fullName: '',
  dob: '',
  countryOfOrigin: '',
  aNumber: '',
  uscisAccountNumber: '',
  statusGrantDate: '',
  countriesToVisit: '',
  travelStartDate: '',
  travelEndDate: '',
  travelPurpose: '',
  phoneNumber: '',
  email: '',
  usAddress: '',
  consent: false
})

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const generateWhatsAppMessage = () => {
  return `🔹 *Refugee Travel Document Application* 🔹

*Personal Information:*
📌 Full Name: ${formData.value.fullName}
📌 Date of Birth: ${formatDate(formData.value.dob)}
📌 Country of Origin: ${formData.value.countryOfOrigin}

*Case Information:*
📌 A-Number: ${formData.value.aNumber}
📌 USCIS Account #: ${formData.value.uscisAccountNumber || 'N/A'}
📌 Status Grant Date: ${formatDate(formData.value.statusGrantDate)}

*Travel Information:*
🌍 Countries to Visit: ${formData.value.countriesToVisit}
📅 Travel Dates: ${formatDate(formData.value.travelStartDate)} to ${formatDate(formData.value.travelEndDate)}
📝 Purpose: ${formData.value.travelPurpose}

*Contact Information:*
📞 Phone: ${formData.value.phoneNumber}
📧 Email: ${formData.value.email}
🏠 US Address: ${formData.value.usAddress}

*Note:* ${formData.value.consent ? '✅ User certified information is correct' : '❌ Consent not given'}

Please process this Refugee Travel Document application. Thank you!`
}

const submitForm = () => {
  try {
    const whatsappMessage = generateWhatsAppMessage()
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappNumber = '254731727411'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    // Optional: Add backend submission here
    resetForm()
  } catch (error) {
    console.error('Error submitting form:', error)
    // Show error notification
  }
}

const resetForm = () => {
  currentStep.value = 1
  formData.value = {
    fullName: '',
    dob: '',
    countryOfOrigin: '',
    aNumber: '',
    uscisAccountNumber: '',
    statusGrantDate: '',
    countriesToVisit: '',
    travelStartDate: '',
    travelEndDate: '',
    travelPurpose: '',
    phoneNumber: '',
    email: '',
    usAddress: '',
    consent: false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-50">
    <TheNavbar />

    <main class="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Progress bar -->
        <div class="relative mb-12">
          <div class="absolute top-1/2 h-1 w-full bg-gray-200 -translate-y-1/2"></div>
          <div class="absolute top-1/2 h-1 bg-blue-500 transition-all duration-300 ease-in-out -translate-y-1/2"
            :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"></div>
          <div class="flex justify-between relative z-10">
            <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center cursor-pointer"
              @click="currentStep = index + 1">
              <div :class="[
                'w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium border-4 transition-all duration-300',
                currentStep > index + 1 ? 'bg-green-100 border-green-500 text-green-700' :
                  currentStep === index + 1 ? 'bg-white border-blue-500 text-blue-700 shadow-lg' :
                    'bg-gray-100 border-gray-300 text-gray-500'
              ]">
                {{ step.icon }}
              </div>
              <span :class="[
                'mt-2 text-sm font-medium',
                currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-500'
              ]">
                {{ step.title }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form container -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300">
          <form @submit.prevent="submitForm" class="p-6 sm:p-8">
            <!-- Step 1: Personal Information -->
            <div v-if="currentStep === 1" class="space-y-6 animate-fade-in">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-2xl font-bold text-gray-800">Personal Information</h2>
                <p class="text-gray-600 mt-1">Please provide your basic personal details</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Legal Name</label>
                  <input v-model="formData.fullName" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="As it appears on official documents">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input v-model="formData.dob" type="date" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
                  <input v-model="formData.countryOfOrigin" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your home country">
                </div>
              </div>
            </div>

            <!-- Step 2: Case Information -->
            <div v-if="currentStep === 2" class="space-y-6 animate-fade-in">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-2xl font-bold text-gray-800">Case Information</h2>
                <p class="text-gray-600 mt-1">Details about your asylum/refugee status</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">A-Number</label>
                  <input v-model="formData.aNumber" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="A-123456789">
                  <p class="mt-1 text-xs text-gray-500">Your Alien Registration Number</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">USCIS Online Account Number</label>
                  <input v-model="formData.uscisAccountNumber" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Optional">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date Granted Asylum/Refugee Status</label>
                  <input v-model="formData.statusGrantDate" type="date" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>
              </div>
            </div>

            <!-- Step 3: Travel Information -->
            <div v-if="currentStep === 3" class="space-y-6 animate-fade-in">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-2xl font-bold text-gray-800">Travel Information</h2>
                <p class="text-gray-600 mt-1">Details about your planned travel</p>
              </div>

              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Countries to Visit</label>
                  <input v-model="formData.countriesToVisit" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="List all countries you plan to visit">
                  <p class="mt-1 text-xs text-gray-500">Separate multiple countries with commas</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                    <input v-model="formData.travelStartDate" type="date" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                    <input v-model="formData.travelEndDate" type="date" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Purpose of Travel</label>
                  <textarea v-model="formData.travelPurpose" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px]"
                    placeholder="Explain why you need to travel"></textarea>
                </div>
              </div>
            </div>

            <!-- Step 4: Contact Information -->
            <div v-if="currentStep === 4" class="space-y-6 animate-fade-in">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-2xl font-bold text-gray-800">Contact Information</h2>
                <p class="text-gray-600 mt-1">How we can reach you</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input v-model="formData.phoneNumber" type="tel" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="+1 (___) ___-____">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input v-model="formData.email" type="email" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="your@email.com">
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Current US Address</label>
                  <textarea v-model="formData.usAddress" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
                    placeholder="Street, City, State, ZIP Code"></textarea>
                </div>
              </div>
            </div>

            <!-- Step 5: Review and Submit -->
            <div v-if="currentStep === 5" class="space-y-6 animate-fade-in">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-2xl font-bold text-gray-800">Review Your Information</h2>
                <p class="text-gray-600 mt-1">Please verify all details before submission</p>
              </div>

              <div class="space-y-4">
                <div class="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h3 class="font-bold text-lg text-blue-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Personal Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">Full Name</p>
                      <p class="font-medium">{{ formData.fullName }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Date of Birth</p>
                      <p class="font-medium">{{ formatDate(formData.dob) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Country of Origin</p>
                      <p class="font-medium">{{ formData.countryOfOrigin }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-purple-50 p-5 rounded-lg border border-purple-100">
                  <h3 class="font-bold text-lg text-purple-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    Case Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">A-Number</p>
                      <p class="font-medium">{{ formData.aNumber }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">USCIS Account Number</p>
                      <p class="font-medium">{{ formData.uscisAccountNumber || 'Not provided' }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Status Grant Date</p>
                      <p class="font-medium">{{ formatDate(formData.statusGrantDate) }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 p-5 rounded-lg border border-green-100">
                  <h3 class="font-bold text-lg text-green-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                    Travel Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">Countries to Visit</p>
                      <p class="font-medium">{{ formData.countriesToVisit }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Travel Dates</p>
                      <p class="font-medium">{{ formatDate(formData.travelStartDate) }} to {{
                        formatDate(formData.travelEndDate) }}</p>
                    </div>
                    <div class="md:col-span-2">
                      <p class="text-sm text-gray-600">Purpose of Travel</p>
                      <p class="font-medium">{{ formData.travelPurpose }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
                  <h3 class="font-bold text-lg text-amber-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                    Contact Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">Phone Number</p>
                      <p class="font-medium">{{ formData.phoneNumber }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Email Address</p>
                      <p class="font-medium">{{ formData.email }}</p>
                    </div>
                    <div class="md:col-span-2">
                      <p class="text-sm text-gray-600">US Address</p>
                      <p class="font-medium">{{ formData.usAddress }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div class="flex items-start">
                  <input id="consent-checkbox" v-model="formData.consent" type="checkbox" required
                    class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1">
                  <label for="consent-checkbox" class="ml-3 block text-sm text-gray-700">
                    <span class="font-medium">Certification</span>
                    <p class="mt-1">I certify, under penalty of perjury, that all information provided in this
                      application is true and correct to the best of my knowledge.</p>
                  </label>
                </div>
              </div>
            </div>

            <!-- Navigation buttons -->
            <div class="mt-8 flex justify-between border-t border-gray-200 pt-6">
              <button v-if="currentStep > 1" @click.prevent="prevStep" type="button"
                class="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
              </button>
              <div v-else></div>

              <button v-if="currentStep < steps.length" @click.prevent="nextStep" type="button"
                class="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition flex items-center ml-auto">
                Next
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              <button v-else type="submit"
                class="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition flex items-center ml-auto">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
