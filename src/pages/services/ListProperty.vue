<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axiosconfig/axiosInstance'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

// Form steps
const currentStep = ref(1)
const totalSteps = 3

// Service Provider Details
const businessName = ref('')
const providerDescription = ref('')
const phone = ref('')
const email = ref('')
const address = ref('')
const website = ref('')
const userId = ref(null)

// Service Details
const category = ref('')
const serviceTitle = ref('')
const serviceDescription = ref('')
const price = ref('')
const availability = ref(true)
const location = ref('')

// Images
const images = ref([])
const previewImages = ref([])
const errorMessages = ref({})
const showSuccess = ref(false)
const successMessage = ref('')

const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/profile/')
    userId.value = response.data.id
    email.value = response.data.email || ''
    businessName.value = response.data.business_name || ''
    phone.value = response.data.phone || ''
    address.value = response.data.address || ''
    website.value = response.data.website || ''
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
  }
}

const handleImageUpload = (event) => {
  const files = event.target.files
  if (files.length + images.value.length > 5) {
    errorMessages.value.images = ['Maximum 5 images allowed']
    return
  }

  errorMessages.value.images = null

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file.type.match('image.*')) continue

    images.value.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImages.value.push(e.target.result) // For preview purposes, base64 string
    }
    reader.readAsDataURL(file) // This will still provide base64 data for preview
  }
}

const removeImage = (index) => {
  images.value.splice(index, 1)
  previewImages.value.splice(index, 1)
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    currentStep.value++
  }
}

const prevStep = () => {
  currentStep.value--
}

const validateStep = (step) => {
  errorMessages.value = {}
  let isValid = true

  if (step === 1) {
    if (!businessName.value.trim()) {
      errorMessages.value.business_name = ['Business name is required']
      isValid = false
    }
    if (!providerDescription.value.trim()) {
      errorMessages.value.description = ['Description is required']
      isValid = false
    }
    if (!phone.value.trim()) {
      errorMessages.value.phone = ['Phone number is required']
      isValid = false
    }
    if (!email.value.trim()) {
      errorMessages.value.email = ['Email is required']
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      errorMessages.value.email = ['Please enter a valid email address']
      isValid = false
    }
  } else if (step === 2) {
    if (!category.value) {
      errorMessages.value.category = ['Category is required']
      isValid = false
    }
    if (!serviceTitle.value.trim()) {
      errorMessages.value.serviceTitle = ['Service title is required']
      isValid = false
    }
    if (!serviceDescription.value.trim()) {
      errorMessages.value.serviceDescription = ['Service description is required']
      isValid = false
    }
    if (!price.value) {
      errorMessages.value.price = ['Price is required']
      isValid = false
    }
    if (!location.value.trim()) {
      errorMessages.value.location = ['Location is required']
      isValid = false
    }
  } else if (step === 3) {
    if (images.value.length < 2) {
      errorMessages.value.images = ['At least 2 images are required']
      isValid = false
    }
  }

  return isValid
}
const submitToBackend = async () => {
  try {
    const formData = new FormData()

    // Append other form data
    formData.append('user', userId.value)
    formData.append('business_name', businessName.value)
    formData.append('provider_description', providerDescription.value)
    formData.append('phone', phone.value)
    formData.append('email', email.value)
    formData.append('address', address.value)
    formData.append('website', website.value)
    formData.append('category', category.value)
    formData.append('service_title', serviceTitle.value)
    formData.append('service_description', serviceDescription.value)
    formData.append('price', price.value)
    formData.append('availability', availability.value)
    formData.append('location', location.value)


    formData.append('service_images', images.value.map((image) => ({
      image
    })))

    // formData.append('service_images', images.value) // Append the first image file directly



    const response = await axiosInstance.post(
      'http://localhost:8000/api/PropertyList/submit/PropertyToList/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'  // Correct content type for form data
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error submitting to backend:', error)
    if (error.response?.data) {
      // Handle specific image upload errors if any
      if (error.response.data.service_images) {
        errorMessages.value.images = error.response.data.service_images
      }
      errorMessages.value = {
        ...errorMessages.value,
        ...error.response.data
      }
    }
    throw error
  }
}

const submitToWhatsApp = async () => {
  if (!validateStep(3)) return

  try {
    // First submit to backend
    const response = await submitToBackend()

    // Check if response.data exists and has the expected structure
    const submittedData = response.data || response

    // Fallback to form values if backend doesn't return all data
    const businessNameValue = submittedData.business_name || businessName.value
    const providerDescValue = submittedData.provider_description || providerDescription.value
    const phoneValue = submittedData.phone || phone.value
    const emailValue = submittedData.email || email.value
    const addressValue = submittedData.address || address.value
    const websiteValue = submittedData.website || website.value
    const categoryValue = submittedData.category || category.value
    const serviceTitleValue = submittedData.service_title || serviceTitle.value
    const serviceDescValue = submittedData.service_description || serviceDescription.value
    const priceValue = submittedData.price || price.value
    const availabilityValue = submittedData.availability ?? availability.value
    const locationValue = submittedData.location || location.value

    // Format the WhatsApp message
    let message = `*New Service Submission for Verification*\n\n`
    message += `*Business Name:* ${businessNameValue}\n`
    message += `*Description:* ${providerDescValue}\n`
    message += `*Phone:* ${phoneValue}\n`
    message += `*Email:* ${emailValue}\n`
    message += `*Address:* ${addressValue}\n`
    message += `*Website:* ${websiteValue}\n\n`
    message += `*Service Details*\n`
    message += `- Category: ${categoryValue}\n`
    message += `- Title: ${serviceTitleValue}\n`
    message += `- Description: ${serviceDescValue}\n`
    message += `- Price: ${priceValue}\n`
    message += `- Availability: ${availabilityValue ? 'Available' : 'Not Available'}\n`
    message += `- Location: ${locationValue}\n\n`
    message += `Please verify this submission.`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/15207361677?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')

    // Show success message
    showSuccess.value = true
    successMessage.value = 'Your service has been submitted successfully! We will contact you once approved.'

  } catch (error) {
    console.error('Submission failed:', error)
    // More detailed error message
    const errorMsg = error.response?.data?.message ||
      error.message ||
      'There was an error submitting your service. Please try again.'
    alert(errorMsg)
  }
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<template>
  <TheNavbar />
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
    <!-- Sidebar - Visible on medium+ screens -->
    <div class="hidden md:block w-72 pr-8 flex-shrink-0">
      <div class="sticky top-24">
        <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 shadow-sm">
          <div class="flex items-start space-x-3 mb-4">
            <svg class="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h2 class="text-xl font-bold text-gray-800">List Your Service</h2>
              <p class="text-sm text-gray-600 mt-1">Complete this form to showcase your business</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="p-3 bg-white rounded-md border border-blue-100">
              <h3 class="font-medium text-blue-700 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Quick Tips
              </h3>
              <ul class="mt-2 text-sm text-gray-600 space-y-2 pl-6 list-disc">
                <li>Use high-quality images of your work</li>
                <li>Be detailed in your service description</li>
                <li>Double-check contact information</li>
                <li>Set competitive pricing</li>
              </ul>
            </div>

            <div class="p-3 bg-blue-50 rounded-md">
              <h3 class="font-medium text-blue-700 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Approval Process
              </h3>
              <p class="mt-2 text-sm text-gray-600">Submissions are typically reviewed within 24-48 hours. We'll notify
                you via email once approved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1">
      <!-- Mobile Welcome Banner - Hidden on medium+ screens -->
      <div class="md:hidden mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
        <div class="flex items-start">
          <svg class="h-5 w-5 text-blue-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 class="font-medium text-gray-800">Ready to list your service?</h3>
            <p class="text-sm text-gray-600 mt-1">Complete this form to reach more customers. Our team will review your
              submission before publishing.</p>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
        <div class="flex">
          <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="font-medium text-green-800">Submission Successful!</h3>
            <p class="text-sm text-green-600">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-2xl font-bold text-gray-900">Service Listing Form</h2>
          <span class="text-sm font-medium text-gray-500">Step {{ currentStep }} of {{ totalSteps }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            :style="`width: ${(currentStep / totalSteps) * 100}%`"></div>
        </div>
      </div>

      <!-- Form Container -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <!-- Step 1: Business Information -->
        <div v-show="currentStep === 1" class="p-6 sm:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-6 border-b pb-2">Business Information</h3>

          <div class="space-y-6">
            <!-- Business Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
              <input v-model="businessName" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your business name">
              <p v-if="errorMessages.business_name" class="mt-1 text-sm text-red-600">{{ errorMessages.business_name[0]
              }}</p>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea v-model="providerDescription" rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your business"></textarea>
              <p v-if="errorMessages.description" class="mt-1 text-sm text-red-600">{{ errorMessages.description[0] }}
              </p>
            </div>

            <!-- Contact Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500">+</span>
                  </div>
                  <input v-model="phone" type="tel"
                    class="pl-8 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="254...">
                </div>
                <p v-if="errorMessages.phone" class="mt-1 text-sm text-red-600">{{ errorMessages.phone[0] }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input v-model="email" type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com">
                <p v-if="errorMessages.email" class="mt-1 text-sm text-red-600">{{ errorMessages.email[0] }}</p>
              </div>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input v-model="address" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Business physical address">
              <p v-if="errorMessages.address" class="mt-1 text-sm text-red-600">{{ errorMessages.address[0] }}</p>
            </div>

            <!-- Website -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500">https://</span>
                </div>
                <input v-model="website" type="url"
                  class="pl-12 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="yourwebsite.com">
              </div>
              <p v-if="errorMessages.website" class="mt-1 text-sm text-red-600">{{ errorMessages.website[0] }}</p>
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <button @click="nextStep"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Next: Service Details
            </button>
          </div>
        </div>

        <!-- Step 2: Service Details -->
        <div v-show="currentStep === 2" class="p-6 sm:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-6 border-b pb-2">Service Details</h3>

          <div class="space-y-6">
            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select v-model="category"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled selected>Select a category</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Repair">Repair</option>
                <option value="Beauty">Beauty</option>
                <option value="Delivery">Delivery</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errorMessages.category" class="mt-1 text-sm text-red-600">{{ errorMessages.category[0] }}</p>
            </div>

            <!-- Service Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
              <input v-model="serviceTitle" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name of your service">
              <p v-if="errorMessages.serviceTitle" class="mt-1 text-sm text-red-600">{{ errorMessages.serviceTitle[0] }}
              </p>
            </div>

            <!-- Service Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Service Description *</label>
              <textarea v-model="serviceDescription" rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your service in detail"></textarea>
              <p v-if="errorMessages.serviceDescription" class="mt-1 text-sm text-red-600">{{
                errorMessages.serviceDescription[0] }}</p>
            </div>

            <!-- Price & Availability -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Price -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500">KSh</span>
                  </div>
                  <input v-model="price" type="number"
                    class="pl-12 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00">
                </div>
                <p v-if="errorMessages.price" class="mt-1 text-sm text-red-600">{{ errorMessages.price[0] }}</p>
              </div>

              <!-- Availability -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <div class="flex items-center">
                  <input v-model="availability" type="checkbox" id="availability"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="availability" class="ml-2 block text-sm text-gray-700">Currently Available</label>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input v-model="location" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Where is this service available?">
              <p v-if="errorMessages.location" class="mt-1 text-sm text-red-600">{{ errorMessages.location[0] }}</p>
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Back
            </button>
            <button @click="nextStep"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Next: Upload Images
            </button>
          </div>
        </div>

        <!-- Step 3: Image Upload -->
        <div v-show="currentStep === 3" class="p-6 sm:p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-6 border-b pb-2">Upload Service Images</h3>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload at least 2 images of your service
                *</label>

              <!-- Image Upload Area -->
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                @dragover.prevent @drop.prevent="handleImageUpload($event)">
                <div class="space-y-1 text-center">
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple accept="image/*"
                        @change="handleImageUpload($event)">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              <p v-if="errorMessages.images" class="mt-1 text-sm text-red-600">{{ errorMessages.images[0] }}</p>
            </div>

            <!-- Image Previews -->
            <div v-if="previewImages.length" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div v-for="(image, index) in previewImages" :key="index" class="relative group">
                <img :src="image" class="w-full h-32 object-cover rounded-md">
                <button @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Back
            </button>
            <button @click="submitToWhatsApp"
              class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Submit via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TheFooter />
</template>
