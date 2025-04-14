<script setup>
import { ref, computed, onMounted } from 'vue'
import axiosInstance from '@/axiosconfig/axiosInstance'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { CameraIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const profile = ref({
  id: null,
  name: '',
  email: '',
  phone: null,
  avatar: null
})

const editableProfile = ref({ ...profile.value })
const loading = ref(true)
const updating = ref(false)
const error = ref(null)
const success = ref(false)
const errors = ref({})
const showAvatarUpload = ref(false)

// Compute initials for avatar placeholder
const initials = computed(() => {
  if (!profile.value.name) return '?'
  const names = profile.value.name.trim().split(/\s+/)
  // Get first letter of first and last name (if available)
  return names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    : names[0][0].toUpperCase()
})

// Compute background color based on initials for consistent appearance
const avatarBgColor = computed(() => {
  if (!profile.value.name) return 'bg-gray-400'
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-red-500', 'bg-yellow-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-teal-500'
  ]
  const charCode = profile.value.name.charCodeAt(0)
  return colors[charCode % colors.length]
})

// Fetch profile data
const fetchProfile = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axiosInstance.get('http://localhost:8000/api/profile/')
    profile.value = response.data
    editableProfile.value = { ...profile.value }
  } catch (err) {
    error.value = 'Failed to load profile data. Please try again later.'
    console.error('Error fetching profile:', err)
  } finally {
    loading.value = false
  }
}

// Update profile
const updateProfile = async () => {
  try {
    updating.value = true
    error.value = null
    success.value = false
    errors.value = {}

    // Basic validation
    if (!editableProfile.value.name) {
      errors.value.name = 'Name is required'
      return
    }

    if (editableProfile.value.phone && !/^[\d\s+-]*$/.test(editableProfile.value.phone)) {
      errors.value.phone = 'Please enter a valid phone number'
      return
    }

    const response = await axiosInstance.patch('http://localhost:8000/api/profile/', editableProfile.value)
    profile.value = response.data
    editableProfile.value = { ...profile.value }
    success.value = true
    setTimeout(() => success.value = false, 3000)
  } catch (err) {
    if (err.response?.data) {
      // Handle server validation errors
      errors.value = err.response.data
    } else {
      error.value = 'Failed to update profile. Please try again later.'
    }
    console.error('Error updating profile:', err)
  } finally {
    updating.value = false
  }
}

// Handle avatar upload
const handleAvatarUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type and size
  if (!file.type.match('image.*')) {
    error.value = 'Please select an image file'
    return
  }

  if (file.size > 2 * 1024 * 1024) { // 2MB limit
    error.value = 'Image size should be less than 2MB'
    return
  }

  try {
    updating.value = true
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await axiosInstance.patch('http://localhost:8000/api/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    profile.value.avatar = response.data.avatar
    showAvatarUpload.value = false
    success.value = true
    setTimeout(() => success.value = false, 3000)
  } catch (err) {
    error.value = 'Failed to upload avatar. Please try again.'
    console.error('Error uploading avatar:', err)
  } finally {
    updating.value = false
  }
}

// Reset form to original values
const resetForm = () => {
  editableProfile.value = { ...profile.value }
  errors.value = {}
}

// Fetch profile on component mount
onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <TheNavbar />
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Information Card -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <!-- Profile Header with Gradient Background -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center">
          <div class="relative mx-auto h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <!-- Avatar Image or Initials Placeholder -->
            <img v-if="profile.avatar" :src="profile.avatar" alt="Profile" class="h-full w-full object-cover">
            <div v-else class="h-full w-full flex items-center justify-center" :class="avatarBgColor">
              <span class="text-4xl font-bold text-white">{{ initials }}</span>
            </div>
            <!-- Avatar Upload Button -->
            <button @click="showAvatarUpload = true"
              class="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
              aria-label="Change profile picture">
              <CameraIcon class="h-5 w-5 text-indigo-600" />
            </button>
          </div>
          <h1 class="mt-4 text-2xl font-bold text-white">{{ profile.name }}</h1>
          <p class="text-blue-100">{{ profile.email }}</p>
          <p v-if="profile.phone" class="text-blue-100 mt-1">{{ profile.phone }}</p>
        </div>

        <!-- Main Content Area -->
        <div class="px-6 py-6 divide-y divide-gray-200">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 rounded-lg">
            <div class="flex items-center">
              <ExclamationCircleIcon class="h-5 w-5 text-red-500 mr-2" />
              <p class="text-red-700">{{ error }}</p>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="mb-6 p-4 bg-green-50 rounded-lg">
            <div class="flex items-center">
              <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
              <p class="text-green-700">Profile updated successfully!</p>
            </div>
          </div>

          <!-- Profile Edit Form -->
          <form v-if="!loading" @submit.prevent="updateProfile" class="space-y-8">
            <!-- Personal Information Section -->
            <div>
              <div class="mb-6">
                <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
                <p class="mt-1 text-sm text-gray-500">
                  Update your personal details. This information will be visible to other users where applicable.
                </p>
              </div>

              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <!-- Name Field -->
                <div class="sm:col-span-6">
                  <label for="name" class="block text-sm font-medium text-gray-700">
                    Full name <span class="text-red-500">*</span>
                  </label>
                  <input v-model="editableProfile.name" type="text" id="name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    :class="{ 'border-red-300': errors.name }" placeholder="Enter your full name">
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>

                <!-- Email Field (readonly) -->
                <div class="sm:col-span-6">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <input v-model="editableProfile.email" type="email" id="email"
                    class="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    :class="{ 'border-red-300': errors.email }" disabled readonly>
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  <p class="mt-1 text-xs text-gray-500">
                    Contact support if you need to change your email address.
                  </p>
                </div>

                <!-- Phone Field -->
                <div class="sm:col-span-6">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
                  <input v-model="editableProfile.phone" type="tel" id="phone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    :class="{ 'border-red-300': errors.phone }" placeholder="+1 (555) 123-4567">
                  <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                  <p class="mt-1 text-xs text-gray-500">
                    Provide a phone number where we can reach you in case of urgent matters.
                  </p>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button type="button" @click="resetForm"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                Cancel
              </button>
              <button type="submit" :disabled="updating"
                class="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                <span v-if="updating" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Saving...
                </span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Avatar Upload Modal -->
    <TransitionRoot as="template" :show="showAvatarUpload">
      <Dialog as="div" class="relative z-10" @close="showAvatarUpload = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <CameraIcon class="h-6 w-6 text-blue-600" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Update Profile Picture
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Upload a clear photo of your face. JPG or PNG, max 2MB.</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 space-y-3">
                  <input type="file" ref="avatarInput" accept="image/jpeg,image/png" class="hidden"
                    @change="handleAvatarUpload">
                  <button type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm transition-colors duration-200"
                    @click="$refs.avatarInput.click()">
                    Select Photo
                  </button>
                  <button type="button"
                    class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm transition-colors duration-200"
                    @click="showAvatarUpload = false">
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
  <TheFooter />
</template>

<style scoped>
/* Smooth transitions for interactive elements */
button,
input,
select,
textarea {
  transition: all 0.2s ease;
}

/* Custom focus styles */
.focus-visible:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Avatar placeholder animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.avatar-placeholder {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
