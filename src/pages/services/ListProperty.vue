<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axiosconfig/axiosInstance'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

const businessName = ref('')
const serviceDescription = ref('')
const phone = ref('')
const email = ref('')
const address = ref('')
const website = ref('')
const userId = ref(null)
const errorMessages = ref({})

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

onMounted(() => {
  fetchUserProfile()
})

const submitServiceProvider = async () => {
  errorMessages.value = {}
  try {
    const response = await axiosInstance.post('/api/services/providers/create/', {
      user: userId.value,
      business_name: businessName.value,
      description: serviceDescription.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
      website: website.value
      // 'verified' is excluded as it's read-only
    })

    console.log('Service provider created:', response.data)
    alert('Service provider created successfully!')
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessages.value = error.response.data
    }
    console.error('Error creating service provider:', error)
  }
}
</script>

<template>
  <TheNavbar />
  <div class="service-provider-form">
    <h2 class="text-center text-2xl font-bold">Create Service Provider</h2>

    <!-- Business Name -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Business Name</label>
      <input v-model="businessName" type="text" class="input" placeholder="Enter business name" />
      <p v-if="errorMessages.business_name" class="text-red-500 text-sm">{{ errorMessages.business_name[0] }}</p>
    </div>

    <!-- Description -->
    <div class="mt-4">
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea v-model="serviceDescription" id="description" class="input" rows="4"
        placeholder="Enter description"></textarea>
      <p v-if="errorMessages.description" class="text-red-500 text-sm">{{ errorMessages.description[0] }}</p>
    </div>

    <!-- Phone -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Phone</label>
      <input v-model="phone" type="text" class="input" placeholder="Enter phone number" />
      <p v-if="errorMessages.phone" class="text-red-500 text-sm">{{ errorMessages.phone[0] }}</p>
    </div>

    <!-- Email -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="email" class="input" placeholder="Enter email address" />
      <p v-if="errorMessages.email" class="text-red-500 text-sm">{{ errorMessages.email[0] }}</p>
    </div>

    <!-- Address -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Address</label>
      <input v-model="address" type="text" class="input" placeholder="Enter address" />
      <p v-if="errorMessages.address" class="text-red-500 text-sm">{{ errorMessages.address[0] }}</p>
    </div>

    <!-- Website -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Website</label>
      <input v-model="website" type="url" class="input" placeholder="Enter website URL" />
      <p v-if="errorMessages.website" class="text-red-500 text-sm">{{ errorMessages.website[0] }}</p>
    </div>

    <!-- Submit -->
    <div class="mt-6">
      <button @click="submitServiceProvider"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Create Service Provider
      </button>
    </div>
  </div>
  <TheFooter />
</template>

<style scoped>
.service-provider-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
}

.input {
  margin-top: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
</style>
