<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const currentStep = ref(1);
const totalSteps = 4;

const form = ref({
  // Personal Information
  name: '',
  gender: '',
  dob: '',
  maritalStatus: '',
  passportNumber: '',
  passportIssueDate: '',
  passportExpiryDate: '',
  nationality: '',

  // Contact Information
  phone: '',
  email: '',
  address: '',
  city: '',
  country: '',
  zipCode: '',

  // Travel Information
  visaType: '',
  visitPurpose: '',
  intendedArrivalDate: '',
  intendedDepartureDate: '',
  destinationAddress: '',
  previousVisits: false,
  previousVisitDetails: '',

  // Employment/Education
  occupation: '',
  employer: '',
  monthlyIncome: '',
  educationLevel: '',

  // Documents
  passportCopy: null,
  photo: null,
  financialProof: null,
  travelItinerary: null,
  accommodationProof: null,
  invitationLetter: null,
  additionalDocuments: [],

  // Additional Information
  healthConditions: '',
  criminalRecord: false,
  notes: ''
});

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleFileUpload = (event, field) => {
  form.value[field] = event.target.files[0];
};

const submitApplication = () => {
  if (!validateForm()) return;

  const message =
    `🛂 *Visa Application Assistance*\n\n` +

    `👤 *Personal Information*\n` +
    `• Name: ${form.value.name}\n` +
    `• Gender: ${form.value.gender}\n` +
    `• Date of Birth: ${form.value.dob}\n` +
    `• Passport No: ${form.value.passportNumber}\n` +
    `• Nationality: ${form.value.nationality}\n\n` +

    `📞 *Contact Information*\n` +
    `• Phone: ${form.value.phone}\n` +
    `• Email: ${form.value.email}\n` +
    `• Address: ${form.value.address}, ${form.value.city}, ${form.value.country}\n\n` +

    `✈️ *Travel Information*\n` +
    `• Visa Type: ${form.value.visaType}\n` +
    `• Purpose: ${form.value.visitPurpose}\n` +
    `• Arrival: ${form.value.intendedArrivalDate}\n` +
    `• Departure: ${form.value.intendedDepartureDate}\n\n` +

    `📝 *Additional Notes*\n${form.value.notes}\n\n` +

    `🔗 *View Full Form*: https://afroartsafary.com/visa`;

  const whatsappURL = `https://wa.me/15207361677?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
};

const validateForm = () => {
  // Add validation logic for each step
  return true;
};
</script>

<template>
  <TheNavbar />
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between mb-2">
          <h2 class="text-2xl font-bold text-gray-800">Visa Application Assistance</h2>
          <span class="text-sm font-medium text-gray-600">Step {{ currentStep }} of {{ totalSteps }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-600 h-2.5 rounded-full" :style="`width: ${(currentStep / totalSteps) * 100}%`"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Step 1: Personal Information -->
        <div v-if="currentStep === 1" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Personal Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name (as in passport)</label>
              <input v-model="form.name" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select v-model="form.gender" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input v-model="form.dob" type="date" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select v-model="form.maritalStatus"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
              <input v-model="form.passportNumber" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input v-model="form.nationality" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Passport Issue Date</label>
              <input v-model="form.passportIssueDate" type="date" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Passport Expiry Date</label>
              <input v-model="form.passportExpiryDate" type="date" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <button @click="nextStep" type="button"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
              Next: Contact Information
            </button>
          </div>
        </div>

        <!-- Step 2: Contact Information -->
        <div v-if="currentStep === 2" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Contact Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input v-model="form.phone" type="tel" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input v-model="form.email" type="email" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input v-model="form.address" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input v-model="form.city" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input v-model="form.country" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
              <input v-model="form.zipCode" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep" type="button"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              Back
            </button>
            <button @click="nextStep" type="button"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
              Next: Travel Information
            </button>
          </div>
        </div>

        <!-- Step 3: Travel Information -->
        <div v-if="currentStep === 3" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Travel Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type of Visa</label>
              <select v-model="form.visaType" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Visa Type</option>
                <option>Tourist Visa</option>
                <option>Business Visa</option>
                <option>Student Visa</option>
                <option>Work Visa</option>
                <option>Transit Visa</option>
                <option>Diplomatic Visa</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Purpose of Visit</label>
              <select v-model="form.visitPurpose" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Purpose</option>
                <option>Tourism</option>
                <option>Business Meeting</option>
                <option>Conference</option>
                <option>Education</option>
                <option>Employment</option>
                <option>Medical Treatment</option>
                <option>Family Visit</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Intended Arrival Date</label>
              <input v-model="form.intendedArrivalDate" type="date" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Intended Departure Date</label>
              <input v-model="form.intendedDepartureDate" type="date" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Destination Address</label>
              <input v-model="form.destinationAddress" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.previousVisits" type="checkbox" class="rounded text-blue-600">
                <span class="ml-2 text-sm text-gray-700">Have you visited this country before?</span>
              </label>
              <textarea v-if="form.previousVisits" v-model="form.previousVisitDetails" rows="2"
                class="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide details of previous visits (dates, purpose, etc.)"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input v-model="form.occupation" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Employer/Organization</label>
              <input v-model="form.employer" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
              <input v-model="form.monthlyIncome" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
              <select v-model="form.educationLevel"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Education Level</option>
                <option>High School</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>PhD</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep" type="button"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              Back
            </button>
            <button @click="nextStep" type="button"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
              Next: Documents Upload
            </button>
          </div>
        </div>

        <!-- Step 4: Documents Upload -->
        <div v-if="currentStep === 4" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Required Documents</h3>

          <div class="space-y-6">
            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Passport Copy (PDF/JPEG/PNG)</label>
              <input type="file" @change="handleFileUpload($event, 'passportCopy')" accept=".pdf,.jpg,.jpeg,.png"
                required
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Clear copy of passport bio page (must be valid for at least 6
                months)</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Passport Photo (JPEG/PNG)</label>
              <input type="file" @change="handleFileUpload($event, 'photo')" accept=".jpg,.jpeg,.png" required
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Recent color photo (35x45mm, white background)</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Proof of Financial Means (PDF/JPEG)</label>
              <input type="file" @change="handleFileUpload($event, 'financialProof')" accept=".pdf,.jpg,.jpeg" required
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Bank statements, sponsorship letter, or other financial documents
              </p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Travel Itinerary (PDF)</label>
              <input type="file" @change="handleFileUpload($event, 'travelItinerary')" accept=".pdf"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Flight reservations or travel plans (if available)</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Proof of Accommodation (PDF/JPEG)</label>
              <input type="file" @change="handleFileUpload($event, 'accommodationProof')" accept=".pdf,.jpg,.jpeg"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Hotel bookings or invitation letter with address</p>
            </div>

            <div v-if="form.visaType === 'Business Visa' || form.visaType === 'Work Visa'"
              class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Invitation Letter (PDF)</label>
              <input type="file" @change="handleFileUpload($event, 'invitationLetter')" accept=".pdf"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Required for business/work visas</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Documents (PDF/JPEG/PNG)</label>
              <input type="file" @change="handleFileUpload($event, 'additionalDocuments')" multiple
                accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="mt-1 text-xs text-gray-500">Any other supporting documents (insurance, employment letter, etc.)
              </p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Health Conditions</label>
              <textarea v-model="form.healthConditions" rows="2"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Declare any health conditions or special requirements"></textarea>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="flex items-center">
                <input v-model="form.criminalRecord" type="checkbox" class="rounded text-blue-600">
                <span class="ml-2 text-sm text-gray-700">Do you have any criminal record?</span>
              </label>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea v-model="form.notes" rows="3"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional information you'd like to provide"></textarea>
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep" type="button"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              Back
            </button>
            <button @click="submitApplication" type="button"
              class="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition duration-300 shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.435c-.545 0-1.279-.272-1.279-1.136 0-.297.104-.463.272-.608.185-.16.512-.235.912-.235.415 0 .839.089 1.146.271.255.16.383.36.383.608 0 .832-.938 1.1-1.442 1.1m4.542 0c-.545 0-1.28-.272-1.28-1.136 0-.297.104-.463.272-.608.185-.16.512-.235.912-.235.415 0 .84.089 1.146.271.255.16.384.36.384.608 0 .832-.938 1.1-1.434 1.1M20.994 4.006c-2.336 0-4.67.86-6.444 2.58-3.515 3.522-3.515 9.253 0 12.775a9.08 9.08 0 0 0 6.444 2.58c2.336 0 4.67-.86 6.444-2.58 3.515-3.522 3.515-9.253 0-12.775a9.08 9.08 0 0 0-6.444-2.58m.193 14.73a6.623 6.623 0 0 1-4.71 1.95 6.623 6.623 0 0 1-4.71-1.95c-2.6-2.605-2.6-6.845 0-9.45a6.623 6.623 0 0 1 4.71-1.95 6.623 6.623 0 0 1 4.71 1.95c2.6 2.605 2.6 6.845 0 9.45" />
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

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}

/* Smooth transitions between steps */
[class*="step-"] {
  transition: all 0.3s ease;
}

/* Custom file upload button styling */
input[type="file"]::file-selector-button {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

input[type="file"]::file-selector-button:hover {
  background-color: #dbeafe;
}
</style>
