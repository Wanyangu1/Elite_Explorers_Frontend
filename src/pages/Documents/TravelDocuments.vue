<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const activeTab = ref('visa');
const activeAccordion = ref(null);
const showModal = ref(false);
const formData = ref({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  country: '',
  urgency: 'standard'
});
const submitted = ref(false);
const currentTestimonial = ref(0);

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

const services = {
  visa: [
    {
      title: "Priority Visa Assistance",
      description: "Seamless support from start to finish for tourist, student, and work visas.",
      features: [
        "Expert-led eligibility assessment",
        "Document preparation and review",
        "Consulate appointment scheduling",
        "One-on-one visa interview coaching"
      ],
      price: "From $650",
      processingTime: "2-6 weeks",
      image: "visa-support.jpg",
      countries: ["USA", "UK", "Schengen", "Canada", "Australia", "Japan"]
    },
    {
      title: "Business & Work Visa Solutions",
      description: "Tailored services for professionals, entrepreneurs, and skilled workers.",
      features: [
        "Global mobility planning",
        "Document verification and submission",
        "Company compliance and sponsorship support",
        "Priority processing options"
      ],
      price: "From $1,200",
      processingTime: "1-4 weeks",
      image: "work-visa.jpg",
      countries: ["USA (L1/H1B)", "UK (Skilled Worker)", "Germany (Blue Card)", "UAE (Golden Visa)"]
    }
  ],
  greencard: [
    {
      title: "Green Card Pathway Program",
      description: "Full-service support for family-based and employment-based green card applications.",
      features: [
        "Eligibility evaluation and pathway selection",
        "Petition preparation and USCIS filing",
        "Status adjustment guidance",
        "Ongoing legal consultation"
      ],
      price: "From $2,500",
      processingTime: "6-14 months",
      image: "green-card.jpg",
      categories: ["EB-1", "EB-2 NIW", "EB-3", "Family Sponsorship"]
    },
    {
      title: "Diversity Visa (Lottery) Assistance",
      description: "Expert navigation of the DV Lottery process and post-selection support.",
      features: [
        "Application entry and tracking",
        "Guidance through selection results",
        "Document readiness and submission",
        "Interview preparation and embassy support"
      ],
      price: "From $900",
      processingTime: "Varies by region",
      image: "dv-lottery.jpg",
      successRate: "87% higher than DIY applications"
    }
  ],
  traveldocs: [
    {
      title: "Passport & Travel Document Aid",
      description: "Fast-tracked support for lost, expired, or first-time travel documents.",
      features: [
        "Passport renewal and replacement",
        "Travel permit and re-entry support",
        "Emergency documentation service",
        "Courier delivery and tracking"
      ],
      price: "From $300",
      processingTime: "48 hours - 3 weeks",
      image: "passport-help.jpg",
      emergency: true
    },
    {
      title: "International Travel Compliance",
      description: "Ensure you're prepared for global entry with expert-guided documentation.",
      features: [
        "Vaccination and health doc advisory",
        "Custom travel document planning",
        "Transit visa assistance",
        "Departure and re-entry coordination"
      ],
      price: "From $550",
      processingTime: "1-2 weeks",
      image: "travel-ready.jpg",
      includes: ["Visa checklist", "Country-specific advisories"]
    }
  ]
};

const testimonials = [
  {
    quote: "MiteExplorers made my green card process effortless. Their team was proactive, kind, and truly world-class.",
    author: "Angela M.",
    position: "Healthcare Professional",
    rating: 5,
    avatar: "avatar1.jpg"
  },
  {
    quote: "Their attention to detail during my business visa application was unmatched. I recommend them to all my peers.",
    author: "David N.",
    position: "Startup Founder",
    rating: 5,
    avatar: "avatar2.jpg"
  },
  {
    quote: "I was panicked about my travel permit, but MiteExplorers handled everything within 48 hours. Absolute lifesavers!",
    author: "Samiya K.",
    position: "Graduate Student",
    rating: 5,
    avatar: "avatar3.jpg"
  }
];

const partners = [
  { name: "USCIS", logo: "uscis-logo.png" },
  { name: "UK Visas", logo: "ukvi-logo.png" },
  { name: "Schengen", logo: "schengen-logo.png" },
  { name: "Global Entry", logo: "global-entry-logo.png" }
];

const stats = [
  { value: "98%", label: "Approval Rate" },
  { value: "24/7", label: "Client Support" },
  { value: "50+", label: "Countries Covered" },
  { value: "10k+", label: "Successful Cases" }
];

const openModal = (service) => {
  formData.value.service = service;
  showModal.value = true;
};

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', formData.value);
  submitted.value = true;
  setTimeout(() => {
    showModal.value = false;
    submitted.value = false;
    formData.value = {
      name: '',
      email: '',
      phone: '',
      service: formData.value.service, // Keep the service preselected
      message: '',
      country: '',
      urgency: 'standard'
    };
  }, 3000);
};

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length;
};

const prevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.length) % testimonials.length;
};

// Auto-rotate testimonials
setInterval(() => {
  nextTestimonial();
}, 8000);
</script>

<template>
  <TheNavbar />

  <!-- Hero Section with Video Background -->
  <div class="relative h-screen overflow-hidden">
    <div class="absolute inset-0 z-0">
      <!-- Video background -->
      <video autoplay muted loop class="w-full h-full object-cover">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-world-travel-animation-2296-large.mp4"
          type="video/mp4">
      </video>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/90"></div>
    </div>

    <div class="relative z-10 h-full flex flex-col justify-center items-center text-white px-8 space-y-8">
      <div class="text-center max-w-4xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-emerald-300">Visa Success</span>
          Starts Here
        </h1>
        <p class="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
          Our network of immigration experts ensures your application is handled with precision and care.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <button @click="openModal('Visa Consultation')"
          class="px-8 py-3 rounded-full bg-white text-blue-900 font-medium border-2 border-white hover:bg-blue-900 hover:text-white transition-all duration-300">
          Free Eligibility Check
        </button>
        <router-link to="/visa">
          <button
            class="px-8 py-3 rounded-full bg-transparent text-white font-medium border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300">
            Begin Applications
          </button>
        </router-link>

      </div>
    </div>

    <div class="absolute bottom-10 left-0 right-0 flex justify-center z-10">
      <a href="#services" class="animate-bounce">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </div>
  </div>

  <!-- Trust Indicators -->
  <div class="bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, index) in stats" :key="index" class="p-4">
          <div class="text-3xl font-bold text-blue-900">{{ stat.value }}</div>
          <div class="text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Services Showcase -->
  <section id="services" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span class="relative inline-block">
            <span class="absolute inset-0 bg-amber-100 transform -skew-y-3 -rotate-2"></span>
            <span class="relative z-10 font-serif">Our Visa Facilitation Services</span>
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          We connect you with the right experts for your immigration needs
        </p>
      </div>

      <!-- Service Tabs Navigation -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex rounded-lg bg-gray-100 p-1">
          <button @click="activeTab = 'visa'" :class="[
            'px-6 py-2 rounded-md font-medium transition-all duration-300',
            activeTab === 'visa' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
          ]">
            Visa Services
          </button>
          <button @click="activeTab = 'greencard'" :class="[
            'px-6 py-2 rounded-md font-medium transition-all duration-300',
            activeTab === 'greencard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
          ]">
            Green Cards
          </button>
          <button @click="activeTab = 'traveldocs'" :class="[
            'px-6 py-2 rounded-md font-medium transition-all duration-300',
            activeTab === 'traveldocs' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
          ]">
            Travel Documents
          </button>
        </div>
      </div>

      <!-- Service Tabs Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(service, index) in services[activeTab]" :key="index"
          class="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl border border-gray-100">
          <div class="h-64 bg-gray-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-600 opacity-90"></div>
            <div class="absolute inset-0 flex items-center justify-center text-white text-6xl">
              <i v-if="activeTab === 'visa'" class="fas fa-passport"></i>
              <i v-if="activeTab === 'greencard'" class="fas fa-id-card"></i>
              <i v-if="activeTab === 'traveldocs'" class="fas fa-globe-americas"></i>
            </div>
            <div v-if="service.emergency"
              class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              EMERGENCY SERVICE
            </div>
          </div>
          <div class="p-8">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ service.title }}</h3>
              <span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {{ service.processingTime }}
              </span>
            </div>
            <p class="text-gray-600 mb-6">{{ service.description }}</p>

            <ul class="space-y-3 mb-8">
              <li v-for="(feature, i) in service.features" :key="i" class="flex items-start">
                <svg class="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>

            <div v-if="service.countries" class="mb-6">
              <h4 class="text-sm font-semibold text-gray-500 mb-2">POPULAR COUNTRIES:</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="(country, i) in service.countries" :key="i"
                  class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {{ country }}
                </span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">{{ service.price }}</span>
              <button @click="openModal(service.title)"
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
                Connect with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          Our <span class="text-blue-600">3-Step</span> Process
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Simple, transparent, and designed for your success
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-blue-600 text-2xl font-bold">1</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Tell Us Your Needs</h3>
          <p class="text-gray-600">Complete our quick assessment and we'll match you with the perfect visa specialist.
          </p>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-emerald-600 text-2xl font-bold">2</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Get Matched with an Expert</h3>
          <p class="text-gray-600">We'll connect you with a vetted professional who specializes in your specific visa
            needs.</p>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-amber-600 text-2xl font-bold">3</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Begin Your Application</h3>
          <p class="text-gray-600">Your dedicated expert will guide you through every step of the process.</p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button @click="openModal('Process Inquiry')"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
          Start Your Free Assessment
        </button>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section class="py-20 bg-blue-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Success <span class="text-amber-300">Stories</span>
        </h2>
        <p class="text-xl text-blue-200 max-w-2xl mx-auto">
          What our clients say about their visa journey
        </p>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <!-- Testimonial Cards -->
        <div class="relative h-64 overflow-hidden">
          <div v-for="(testimonial, index) in testimonials" :key="index"
            class="absolute inset-0 transition-opacity duration-500 flex items-center"
            :class="{ 'opacity-100': currentTestimonial === index, 'opacity-0': currentTestimonial !== index }">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div class="flex items-start">
                <div class="flex-shrink-0 mr-6">
                  <div class="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-2xl font-bold">
                    {{ testimonial.author.charAt(0) }}
                  </div>
                </div>
                <div>
                  <div class="flex mb-2">
                    <svg v-for="i in 5" :key="i" class="w-5 h-5"
                      :class="i <= testimonial.rating ? 'text-amber-400' : 'text-gray-500'" fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                      </path>
                    </svg>
                  </div>
                  <p class="text-lg italic mb-4">"{{ testimonial.quote }}"</p>
                  <div>
                    <p class="font-bold">{{ testimonial.author }}</p>
                    <p class="text-blue-200">{{ testimonial.position }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button @click="prevTestimonial"
          class="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button @click="nextTestimonial"
          class="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Indicators -->
        <div class="flex justify-center mt-8 space-x-2">
          <button v-for="(testimonial, index) in testimonials" :key="index" @click="currentTestimonial = index"
            class="w-3 h-3 rounded-full transition-colors duration-300"
            :class="currentTestimonial === index ? 'bg-amber-400' : 'bg-white/30'">
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Partner Logos -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase">TRUSTED BY IMMIGRATION PROFESSIONALS
          WORLDWIDE</h3>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
        <div v-for="(partner, index) in partners" :key="index" class="flex justify-center">
          <div class="h-16 flex items-center">
            <img :src="`/images/logos/${partner.logo}`" :alt="partner.name" class="max-h-12 max-w-full">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          Frequently Asked <span class="text-blue-600">Questions</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about our visa facilitation service
        </p>
      </div>

      <div class="space-y-4">
        <div v-for="(item, index) in [
          { question: 'How does your matching process work?', answer: 'After assessing your needs through our detailed questionnaire, we match you with 1-3 vetted visa specialists who have proven expertise in your specific visa type and destination country. You can review their profiles and choose who to work with.' },
          { question: 'What makes your network of experts different?', answer: 'All professionals in our network undergo rigorous vetting, including verification of credentials, success rates, and client reviews. We only work with top-tier immigration consultants, lawyers, and visa specialists.' },
          { question: 'Is there a fee for the matching service?', answer: 'Our matching service is completely free. You only pay the specialist you choose to work with, and we ensure all pricing is transparent and competitive.' },
          { question: 'What if I need to change specialists?', answer: 'If for any reason you\'re not satisfied with your matched specialist, we\'ll immediately connect you with alternative options at no additional cost.' },
          { question: 'How long does the visa process typically take?', answer: 'Processing times vary significantly based on visa type, destination country, and individual circumstances. After matching, your specialist will provide a personalized timeline based on your specific case.' }
        ]" :key="index" class="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button @click="toggleAccordion(index)"
            class="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-300">
            <h3 class="text-lg font-medium text-gray-900">{{ item.question }}</h3>
            <svg class="h-6 w-6 text-blue-600 transform transition-transform duration-300"
              :class="{ 'rotate-180': activeAccordion === index }" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-show="activeAccordion === index" class="px-6 pb-6 pt-0 text-gray-600 transition-all duration-300">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="relative py-32 overflow-hidden bg-gradient-to-r from-blue-900 to-emerald-900">
    <div class="absolute top-0 left-0 w-full h-full opacity-10">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 font-serif tracking-tight">
          Ready to Begin Your <span class="text-amber-300">Visa Journey</span>?
        </h2>
        <p class="text-xl text-blue-200 max-w-2xl mx-auto mb-10">
          Connect with the right expert today and take the first step toward your international goals
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button @click="openModal('General Inquiry')"
            class="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-blue-900 font-bold rounded-lg transition-all duration-300 hover:shadow-xl">
            Get Matched Now
          </button>
          <button
            class="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition-all duration-300">
            +1 (888) 888-8888
          </button>
        </div>
      </div>
    </div>
  </section>

  <TheFooter />

  <!-- Consultation Modal -->
  <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-75" @click="showModal = false"></div>
      </div>

      <!-- Modal content -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-2xl leading-6 font-bold text-gray-900 mb-6">
                {{ submitted ? 'Thank You!' : 'Connect with a Visa Expert' }}
              </h3>

              <div v-if="!submitted" class="mt-2">
                <p class="text-sm text-gray-500 mb-6">
                  Complete this form and we'll match you with the perfect visa specialist for your needs.
                </p>

                <form @submit.prevent="submitForm" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input v-model="formData.name" type="text" required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                    <input v-model="formData.email" type="email" required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input v-model="formData.phone" type="tel"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label for="service" class="block text-sm font-medium text-gray-700">Service Needed</label>
                    <input v-model="formData.service" type="text" readonly
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                  </div>

                  <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">Destination Country</label>
                    <input v-model="formData.country" type="text"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label for="urgency" class="block text-sm font-medium text-gray-700">Processing Urgency</label>
                    <select v-model="formData.urgency"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="standard">Standard (4-8 weeks)</option>
                      <option value="expedited">Expedited (2-4 weeks)</option>
                      <option value="emergency">Emergency (1-2 weeks)</option>
                    </select>
                  </div>

                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Additional Information</label>
                    <textarea v-model="formData.message" rows="3"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                  </div>

                  <div class="pt-4">
                    <button type="submit"
                      class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>

              <div v-else class="text-center py-8">
                <svg class="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mt-4">Request Submitted!</h3>
                <p class="text-sm text-gray-500 mt-2">
                  One of our visa specialists will contact you within 24 hours to discuss your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!submitted" class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="showModal = false">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

/* Smooth transitions for modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>
