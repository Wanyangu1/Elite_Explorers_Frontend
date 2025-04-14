<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const currentStep = ref(1);
const totalSteps = 5; // Increased to 5 steps for Green Card specifics

const form = ref({
  // Personal Information
  name: '',
  gender: '',
  dob: '',
  placeOfBirth: '',
  maritalStatus: '',
  passportNumber: '',
  passportIssueDate: '',
  passportExpiryDate: '',
  nationality: '',
  otherNationalities: '',
  ssn: '',

  // Family Information
  spouseName: '',
  spouseDob: '',
  spouseNationality: '',
  children: [],
  parentsInUS: false,
  siblingsInUS: false,

  // Immigration History
  currentVisaType: '',
  currentVisaExpiry: '',
  previousUSVisas: [],
  usEntryDates: [],
  usExitDates: [],
  everOverstayed: false,
  everDeniedVisa: false,
  everDeported: false,

  // Eligibility Basis
  eligibilityCategory: '',
  familyPetitionerName: '',
  familyPetitionerRelationship: '',
  familyPetitionerStatus: '',
  employerName: '',
  jobTitle: '',
  priorityDate: '',
  receiptNumber: '',
  laborCertification: false,
  approvedI140: false,

  // Contact Information
  phone: '',
  email: '',
  usAddress: '',
  usCity: '',
  usState: '',
  usZipCode: '',
  foreignAddress: '',
  foreignCity: '',
  foreignCountry: '',
  foreignZipCode: '',

  // Education & Employment
  highestEducation: '',
  university: '',
  yearGraduated: '',
  currentOccupation: '',
  yearsExperience: '',
  specialSkills: '',

  // Documents
  passportCopy: null,
  birthCertificate: null,
  marriageCertificate: null,
  divorceDecrees: null,
  policeCertificates: [],
  medicalExam: null,
  taxReturns: [],
  affidavitOfSupport: null,
  i864Documents: [],
  employmentLetter: null,
  educationDiplomas: null,
  additionalDocuments: [],

  // Additional Information
  criminalHistory: '',
  membershipAffiliations: '',
  militaryService: '',
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
  if (event.target.files.length > 1) {
    form.value[field] = Array.from(event.target.files);
  } else {
    form.value[field] = event.target.files[0];
  }
};

const addChild = () => {
  form.value.children.push({
    name: '',
    dob: '',
    birthplace: '',
    maritalStatus: ''
  });
};

const removeChild = (index) => {
  form.value.children.splice(index, 1);
};

const addPreviousVisa = () => {
  form.value.previousUSVisas.push({
    type: '',
    issueDate: '',
    expiryDate: ''
  });
};

const removePreviousVisa = (index) => {
  form.value.previousUSVisas.splice(index, 1);
};

const submitApplication = () => {
  if (!validateForm()) return;

  const message =
    `🟢 *Green Card Application Assistance*\n\n` +

    `👤 *Personal Information*\n` +
    `• Full Name: ${form.value.name}\n` +
    `• Date of Birth: ${form.value.dob}\n` +
    `• Place of Birth: ${form.value.placeOfBirth}\n` +
    `• Nationality: ${form.value.nationality}\n` +
    `• Passport No: ${form.value.passportNumber}\n` +
    `• SSN: ${form.value.ssn || 'N/A'}\n\n` +

    `👨‍👩‍👧‍👦 *Family Information*\n` +
    `• Marital Status: ${form.value.maritalStatus}\n` +
    `• Spouse Name: ${form.value.spouseName || 'N/A'}\n` +
    `• Children: ${form.value.children.length || 'None'}\n\n` +

    `🛂 *Immigration History*\n` +
    `• Current Visa: ${form.value.currentVisaType || 'N/A'}\n` +
    `• Previous US Visas: ${form.value.previousUSVisas.length || 'None'}\n` +
    `• Ever Overstayed: ${form.value.everOverstayed ? 'Yes' : 'No'}\n\n` +

    `📋 *Eligibility Basis*\n` +
    `• Category: ${form.value.eligibilityCategory}\n` +
    `• Priority Date: ${form.value.priorityDate || 'N/A'}\n` +
    `• Receipt Number: ${form.value.receiptNumber || 'N/A'}\n\n` +

    `📞 *Contact Information*\n` +
    `• Phone: ${form.value.phone}\n` +
    `• Email: ${form.value.email}\n` +
    `• US Address: ${form.value.usAddress || 'N/A'}\n\n` +

    `💼 *Employment/Education*\n` +
    `• Occupation: ${form.value.currentOccupation || 'N/A'}\n` +
    `• Education: ${form.value.highestEducation || 'N/A'}\n\n` +

    `📝 *Additional Notes*\n${form.value.notes || 'None'}\n\n` +

    `🔗 *View Full Form*: https://yourwebsite.com/greencard`;

  const whatsappURL = `https://wa.me/15207361677?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
};

const validateForm = () => {
  // Add validation logic for each step
  if (currentStep.value === 1 && !form.value.name) {
    alert('Please enter your full name');
    return false;
  }
  // Add more validations as needed
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
          <h2 class="text-2xl font-bold text-gray-800">Green Card Application Assistance</h2>
          <span class="text-sm font-medium text-gray-600">Step {{ currentStep }} of {{ totalSteps }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-green-600 h-2.5 rounded-full" :style="`width: ${(currentStep / totalSteps) * 100}%`"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Step 1: Personal & Family Information -->
        <div v-if="currentStep === 1" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Personal & Family Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name (as in passport)</label>
              <input v-model="form.name" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select v-model="form.gender" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input v-model="form.dob" type="date" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Place of Birth (City, Country)</label>
              <input v-model="form.placeOfBirth" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select v-model="form.maritalStatus" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
                <option>Separated</option>
              </select>
            </div>

            <div v-if="form.maritalStatus === 'Married'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Spouse's Full Name</label>
              <input v-model="form.spouseName" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div v-if="form.maritalStatus === 'Married'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Spouse's Date of Birth</label>
              <input v-model="form.spouseDob" type="date"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
              <input v-model="form.passportNumber" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input v-model="form.nationality" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Other Nationalities (if any)</label>
              <input v-model="form.otherNationalities" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">U.S. Social Security Number (if any)</label>
              <input v-model="form.ssn" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
          </div>

          <!-- Children Information -->
          <div class="mt-6 border-t pt-6">
            <h4 class="text-lg font-medium text-gray-800 mb-4">Children Information</h4>
            <div v-for="(child, index) in form.children" :key="index" class="mb-4 p-4 border rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Child's Full Name</label>
                  <input v-model="child.name" type="text"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input v-model="child.dob" type="date"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                  <input v-model="child.birthplace" type="text"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  <select v-model="child.maritalStatus"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Status</option>
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
              </div>
              <button @click="removeChild(index)" type="button" class="mt-2 text-sm text-red-600 hover:text-red-800">
                Remove Child
              </button>
            </div>
            <button @click="addChild" type="button"
              class="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              + Add Child
            </button>
          </div>

          <div class="mt-8 flex justify-end">
            <button @click="nextStep" type="button"
              class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 shadow-sm">
              Next: Immigration History
            </button>
          </div>
        </div>

        <!-- Step 2: Immigration History -->
        <div v-if="currentStep === 2" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Immigration History</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Current U.S. Visa Type (if applicable)</label>
              <select v-model="form.currentVisaType"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select Visa Type</option>
                <option>B1/B2 (Visitor)</option>
                <option>F1 (Student)</option>
                <option>H1B (Work)</option>
                <option>J1 (Exchange)</option>
                <option>L1 (Intracompany Transfer)</option>
                <option>Other</option>
                <option>None</option>
              </select>
            </div>

            <div v-if="form.currentVisaType && form.currentVisaType !== 'None'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Visa Expiry Date</label>
              <input v-model="form.currentVisaExpiry" type="date"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.everOverstayed" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Have you ever overstayed a U.S. visa?</span>
              </label>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.everDeniedVisa" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Have you ever been denied a U.S. visa?</span>
              </label>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.everDeported" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Have you ever been deported from the U.S.?</span>
              </label>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.parentsInUS" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Do you have parents who are U.S. citizens or permanent
                  residents?</span>
              </label>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.siblingsInUS" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Do you have siblings who are U.S. citizens or permanent
                  residents?</span>
              </label>
            </div>
          </div>

          <!-- Previous U.S. Visas -->
          <div class="mt-6 border-t pt-6">
            <h4 class="text-lg font-medium text-gray-800 mb-4">Previous U.S. Visas</h4>
            <div v-for="(visa, index) in form.previousUSVisas" :key="index" class="mb-4 p-4 border rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                  <select v-model="visa.type"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Visa Type</option>
                    <option>B1/B2 (Visitor)</option>
                    <option>F1 (Student)</option>
                    <option>H1B (Work)</option>
                    <option>J1 (Exchange)</option>
                    <option>L1 (Intracompany Transfer)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input v-model="visa.issueDate" type="date"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input v-model="visa.expiryDate" type="date"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
              </div>
              <button @click="removePreviousVisa(index)" type="button"
                class="mt-2 text-sm text-red-600 hover:text-red-800">
                Remove Visa
              </button>
            </div>
            <button @click="addPreviousVisa" type="button"
              class="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              + Add Previous Visa
            </button>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep" type="button"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              Back
            </button>
            <button @click="nextStep" type="button"
              class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 shadow-sm">
              Next: Eligibility Basis
            </button>
          </div>
        </div>

        <!-- Step 3: Eligibility Basis -->
        <div v-if="currentStep === 3" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Eligibility Basis</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Green Card Eligibility Category</label>
              <select v-model="form.eligibilityCategory" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select Category</option>
                <option>Family Sponsorship (Immediate Relative)</option>
                <option>Family Sponsorship (Preference Category)</option>
                <option>Employment-Based (EB-1)</option>
                <option>Employment-Based (EB-2)</option>
                <option>Employment-Based (EB-3)</option>
                <option>Employment-Based (EB-4)</option>
                <option>Employment-Based (EB-5 Investor)</option>
                <option>Diversity Visa Lottery Winner</option>
                <option>Refugee/Asylee</option>
                <option>Other</option>
              </select>
            </div>

            <div v-if="form.eligibilityCategory.includes('Family Sponsorship')">
              <label class="block text-sm font-medium text-gray-700 mb-1">Petitioner's Name</label>
              <input v-model="form.familyPetitionerName" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div v-if="form.eligibilityCategory.includes('Family Sponsorship')">
              <label class="block text-sm font-medium text-gray-700 mb-1">Relationship to Petitioner</label>
              <input v-model="form.familyPetitionerRelationship" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div v-if="form.eligibilityCategory.includes('Family Sponsorship')">
              <label class="block text-sm font-medium text-gray-700 mb-1">Petitioner's Immigration Status</label>
              <select v-model="form.familyPetitionerStatus"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Select Status</option>
                <option>U.S. Citizen</option>
                <option>Permanent Resident</option>
              </select>
            </div>

            <div v-if="form.eligibilityCategory.includes('Employment-Based')">
              <label class="block text-sm font-medium text-gray-700 mb-1">Employer Name</label>
              <input v-model="form.employerName" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div v-if="form.eligibilityCategory.includes('Employment-Based')">
              <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input v-model="form.jobTitle" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority Date (if known)</label>
              <input v-model="form.priorityDate" type="date"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Receipt Number (if any)</label>
              <input v-model="form.receiptNumber" type="text" placeholder="e.g., WAC-XX-XXX-XXXXX"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div v-if="form.eligibilityCategory.includes('Employment-Based')" class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.laborCertification" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Do you have an approved Labor Certification (PERM)?</span>
              </label>
            </div>

            <div v-if="form.eligibilityCategory.includes('Employment-Based')" class="md:col-span-2">
              <label class="flex items-center">
                <input v-model="form.approvedI140" type="checkbox" class="rounded text-green-600">
                <span class="ml-2 text-sm text-gray-700">Do you have an approved I-140 petition?</span>
              </label>
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep" type="button"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              Back
            </button>
            <button @click="nextStep" type="button"
              class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 shadow-sm">
              Next: Contact & Employment
            </button>
          </div>
        </div>

        <!-- Step 4: Contact & Employment Information -->
        <div v-if="currentStep === 4" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Contact & Employment Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input v-model="form.phone" type="tel" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input v-model="form.email" type="email" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div class="md:col-span-2">
              <h4 class="text-lg font-medium text-gray-800 mb-2">U.S. Address (if applicable)</h4>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input v-model="form.usAddress" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input v-model="form.usCity" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input v-model="form.usState" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input v-model="form.usZipCode" type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div class="md:col-span-2">
              <h4 class="text-lg font-medium text-gray-800 mb-2 mt-4">Foreign Address</h4>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input v-model="form.foreignAddress" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input v-model="form.foreignCity" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input v-model="form.foreignCountry" type="text" required
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input v-model="form.foreignZipCode" type="text" class="w-full border border-gray-300 rounded-lg
                px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div class="mt-8 flex justify-between">
              <button @click="prevStep" type="button"
                class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
                Back
              </button>
              <button @click="nextStep" type="button"
                class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 shadow-sm">
                Next: Documents Upload
              </button>
            </div>
          </div>
        </div>

        <!-- Step 5: Documents Upload -->
        <div v-if="currentStep === 5" class="p-6 md:p-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Required Documents</h3>
          <p class="text-sm text-gray-600 mb-6">Please upload clear, legible copies of all required documents. Files
            should be in PDF, JPG, or PNG format.</p>

          <div class="space-y-6">
            <!-- Personal Documents -->
            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Passport Copy (All Pages)</label>
              <input type="file" @change="handleFileUpload($event, 'passportCopy')" accept=".pdf,.jpg,.jpeg,.png"
                required
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Must include bio page and all pages with stamps/visas</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Birth Certificate</label>
              <input type="file" @change="handleFileUpload($event, 'birthCertificate')" accept=".pdf,.jpg,.jpeg,.png"
                required
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Certified copy with English translation if not in English</p>
            </div>

            <div v-if="form.maritalStatus === 'Married'" class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Marriage Certificate</label>
              <input type="file" @change="handleFileUpload($event, 'marriageCertificate')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Certified copy with English translation if not in English</p>
            </div>

            <div v-if="form.maritalStatus === 'Divorced' || form.maritalStatus === 'Widowed'"
              class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Divorce Decree/Death Certificate</label>
              <input type="file" @change="handleFileUpload($event, 'divorceDecrees')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            </div>

            <!-- Immigration Documents -->
            <div v-if="form.currentVisaType && form.currentVisaType !== 'None'"
              class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Current U.S. Visa</label>
              <input type="file" @change="handleFileUpload($event, 'currentVisa')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            </div>

            <div v-if="form.previousUSVisas.length > 0" class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Previous U.S. Visas</label>
              <input type="file" @change="handleFileUpload($event, 'previousVisas')" accept=".pdf,.jpg,.jpeg,.png"
                multiple
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            </div>

            <!-- Eligibility Documents -->
            <div v-if="form.eligibilityCategory.includes('Family Sponsorship')"
              class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Affidavit of Support (I-864)</label>
              <input type="file" @change="handleFileUpload($event, 'affidavitOfSupport')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Completed and signed by petitioner</p>
            </div>

            <div v-if="form.eligibilityCategory.includes('Family Sponsorship')"
              class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">I-864 Supporting Documents</label>
              <input type="file" @change="handleFileUpload($event, 'i864Documents')" accept=".pdf,.jpg,.jpeg,.png"
                multiple
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Tax returns, W-2s, proof of income, etc.</p>
            </div>

            <div v-if="form.eligibilityCategory.includes('Employment-Based')"
              class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Employment Letter</label>
              <input type="file" @change="handleFileUpload($event, 'employmentLetter')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Current job offer or employment verification</p>
            </div>

            <div v-if="form.approvedI140" class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Approved I-140</label>
              <input type="file" @change="handleFileUpload($event, 'approvedI140Doc')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            </div>

            <!-- Additional Required Documents -->
            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Police Certificates</label>
              <input type="file" @change="handleFileUpload($event, 'policeCertificates')" accept=".pdf,.jpg,.jpeg,.png"
                multiple
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">From all countries where you lived for 6+ months since age 16
              </p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Medical Examination (Form I-693)</label>
              <input type="file" @change="handleFileUpload($event, 'medicalExam')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Must be completed by USCIS-approved physician</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Passport-Style Photos (2)</label>
              <input type="file" @change="handleFileUpload($event, 'passportPhotos')" accept=".jpg,.jpeg,.png" required
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">2x2 inches, white background, taken within last 6 months</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Education Diplomas/Certificates</label>
              <input type="file" @change="handleFileUpload($event, 'educationDiplomas')" accept=".pdf,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tax Returns (Last 3 Years)</label>
              <input type="file" @change="handleFileUpload($event, 'taxReturns')" accept=".pdf,.jpg,.jpeg,.png" multiple
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            </div>

            <!-- Additional Information -->
            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Criminal History (if applicable)</label>
              <textarea v-model="form.criminalHistory" rows="3"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Provide details of any arrests, charges, or convictions"></textarea>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Memberships/Affiliations</label>
              <textarea v-model="form.membershipAffiliations" rows="2"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="List any professional, social, or political organizations you belong to"></textarea>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Military Service (if applicable)</label>
              <textarea v-model="form.militaryService" rows="2"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Provide details of any military service in any country"></textarea>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Documents</label>
              <input type="file" @change="handleFileUpload($event, 'additionalDocuments')" accept=".pdf,.jpg,.jpeg,.png"
                multiple
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
              <p class="mt-1 text-xs text-gray-500">Any other supporting documents not listed above</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea v-model="form.notes" rows="3"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Any additional information you'd like to provide about your application"></textarea>
            </div>
          </div>

          <div class="mt-8 flex justify-between">
            <button @click="prevStep" type="button"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              Back
            </button>
            <button @click="submitApplication" type="button"
              class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 shadow-sm flex items-center">
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
  background-color: #f0fdf4;
  color: #16a34a;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

input[type="file"]::file-selector-button:hover {
  background-color: #dcfce7;
}

/* Custom styling for green theme */
.bg-green-50 {
  background-color: #f0fdf4;
}

.text-green-700 {
  color: #15803d;
}

.hover\:bg-green-100:hover {
  background-color: #dcfce7;
}

.focus\:ring-green-500:focus {
  --tw-ring-color: #22c55e;
}

.bg-green-600 {
  background-color: #16a34a;
}

.hover\:bg-green-700:hover {
  background-color: #15803d;
}

.border-green-500 {
  border-color: #22c55e;
}
</style>
