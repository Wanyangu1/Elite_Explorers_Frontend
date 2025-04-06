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
      <div>
        <img :src="serviceImage" alt="Service Image" class="w-full h-56 object-cover rounded-lg mb-4" />
        <h2 class="text-2xl font-semibold">{{ bookingDetails.title }}</h2>
        <p class="text-gray-800 mt-1">{{ bookingDetails.category }}</p>
        <p class="text-gray-600 mt-2">{{ bookingDetails.description }}</p>
        <p class="mt-2"><strong>Provider:</strong> {{ bookingDetails.provider }}</p>
        <p><strong>Location:</strong> {{ bookingDetails.location }}</p>
        <p class="text-green-600 text-lg font-bold mt-2">Amount: ${{ bookingDetails.price }}</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-4">Enter Your Details</h3>

        <!-- Stays / Car Rentals -->
        <form v-if="bookingDetails.category === 'Stays' || bookingDetails.category === 'Car Rentals'"
          @submit.prevent="handleBooking" class="space-y-4">
          <input v-model="customerDetails.name" type="text" placeholder="Full Name" class="w-full p-2 border rounded-md"
            required />
          <input v-model="customerDetails.email" type="email" placeholder="Email" class="w-full p-2 border rounded-md"
            required />
          <input v-model="customerDetails.phone" type="text" placeholder="Phone Number"
            class="w-full p-2 border rounded-md" required />
          <input v-model="customerDetails.persons" type="number" placeholder="Number of Persons"
            class="w-full p-2 border rounded-md" required />
          <input v-model="customerDetails.check_in_date" type="date" class="w-full p-2 border rounded-md" required />
          <input v-model="customerDetails.check_out_date" type="date" class="w-full p-2 border rounded-md" required />
          <textarea v-model="customerDetails.notes" placeholder="Special Request"
            class="w-full p-2 border rounded-md" />
          <button type="submit"
            class="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Processing...' : 'Confirm Booking & Send to WhatsApp' }}
          </button>
        </form>
        <!-- Flights -->
        <form v-if="bookingDetails.category === 'Flights'" @submit.prevent="handleBooking" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Full Name</label>
            <input v-model="customerDetails.name" type="text" class="w-full p-2 border rounded-md" required />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Email</label>
              <input v-model="customerDetails.email" type="email" class="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label class="block mb-1 font-medium">Phone</label>
              <input v-model="customerDetails.phone" type="text" class="w-full p-2 border rounded-md" required />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">From</label>
              <input v-model="customerDetails.from_location" type="text" class="w-full p-2 border rounded-md"
                required />
            </div>
            <div>
              <label class="block mb-1 font-medium">To</label>
              <input v-model="customerDetails.to_location" type="text" class="w-full p-2 border rounded-md" required />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Departure Date</label>
              <input v-model="customerDetails.departure_date" type="date" class="w-full p-2 border rounded-md"
                required />
            </div>
            <div>
              <label class="block mb-1 font-medium">Return Date</label>
              <input v-model="customerDetails.return_date" type="date" class="w-full p-2 border rounded-md" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Number of Passengers</label>
              <input v-model="customerDetails.passengers" type="number" min="1" class="w-full p-2 border rounded-md"
                required />
            </div>

            <div>
              <label class="block mb-1 font-medium">Travel Class</label>
              <select v-model="customerDetails.travel_class" class="w-full p-2 border rounded-md" required>
                <option disabled value="">Select Travel Class</option>
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block mb-1 font-medium">Preferred Airline (Optional)</label>
            <input v-model="customerDetails.airline" type="text" class="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label class="block mb-1 font-medium">Special Requests or Notes</label>
            <textarea v-model="customerDetails.notes" class="w-full p-2 border rounded-md" />
          </div>
          <button type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Processing...' : 'Confirm Flight Booking & Send to WhatsApp' }}
          </button>
        </form>

        <!-- Visa / Green Card / Travel Documents -->
        <form v-else-if="['Visa Application', 'Green Card', 'Travel Documents'].includes(bookingDetails.category)"
          @submit.prevent="handleBooking" class="space-y-4">
          <input v-model="customerDetails.name" type="text" placeholder="Full Name" class="w-full p-2 border rounded-md"
            required />
          <input v-model="customerDetails.passport_number" type="text" placeholder="Passport Number"
            class="w-full p-2 border rounded-md" required />
          <input v-model="customerDetails.nationality" type="text" placeholder="Nationality"
            class="w-full p-2 border rounded-md" required />
          <input v-model="customerDetails.email" type="email" placeholder="Email" class="w-full p-2 border rounded-md"
            required />
          <input v-model="customerDetails.phone" type="text" placeholder="Phone Number"
            class="w-full p-2 border rounded-md" required />
          <textarea v-model="customerDetails.notes" placeholder="Purpose of Travel / Notes"
            class="w-full p-2 border rounded-md" />
          <button type="submit"
            class="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit Application & Send to WhatsApp' }}
          </button>
        </form>

        <!-- Generic Form Fallback -->
        <form v-else @submit.prevent="handleBooking" class="space-y-4">
          <input v-model="customerDetails.name" type="text" placeholder="Full Name" class="w-full p-2 border rounded-md"
            required />
          <input v-model="customerDetails.email" type="email" placeholder="Email" class="w-full p-2 border rounded-md"
            required />
          <input v-model="customerDetails.phone" type="text" placeholder="Phone Number"
            class="w-full p-2 border rounded-md" required />
          <textarea v-model="customerDetails.notes" placeholder="Message or Notes"
            class="w-full p-2 border rounded-md" />
          <button type="submit"
            class="w-full bg-gray-600 text-white py-2 rounded-md font-semibold hover:bg-gray-700 transition"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Send Inquiry to WhatsApp' }}
          </button>
        </form>
      </div>
    </div>
  </div>

  <TheFooter />
</template>
