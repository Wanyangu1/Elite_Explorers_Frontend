// src/composables/useBooking.js
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/axiosconfig/axiosInstance'

export function useBooking() {
  const route = useRoute()
  const router = useRouter()

  // Extract booking details from query parameters
  const bookingDetails = computed(() => ({
    id: route.query.id,
    title: route.query.title,
    price: route.query.price,
    provider: route.query.provider,
    location: route.query.location,
    description: route.query.description,
    image: route.query.image,
    category: route.query.category,
  }))

  // Compute full image path
  const serviceImage = computed(() => {
    return bookingDetails.value.image
      ? `http://localhost:8000/media/${bookingDetails.value.image}`
      : '/default-service.jpg'
  })

  // Form state
  const customerDetails = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'credit_card',
    notes: '',
  })

  // State management
  const isSubmitting = ref(false)
  const error = ref(null)
  const successMessage = ref(null)

  // Submit booking
  const submitBooking = async () => {
    error.value = null
    successMessage.value = null

    if (
      !customerDetails.value.name ||
      !customerDetails.value.email ||
      !customerDetails.value.phone ||
      !customerDetails.value.address
    ) {
      error.value = 'Please fill in all required fields.'
      return
    }

    isSubmitting.value = true

    try {
      await axiosInstance.post('/api/bookings/', {
        service_id: bookingDetails.value.id,
        category: bookingDetails.value.category,
        ...customerDetails.value,
      })

      successMessage.value = 'Booking confirmed successfully!'
      setTimeout(() => router.push('/'), 3000)
    } catch (err) {
      error.value = 'Error submitting booking. Please try again.'
      console.error(err)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    bookingDetails,
    serviceImage,
    customerDetails,
    isSubmitting,
    error,
    successMessage,
    submitBooking,
  }
}
