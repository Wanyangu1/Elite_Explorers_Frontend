<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const activeTab = ref('visa');
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

// Enhanced services data structure
const services = {
  visa: [
    {
      title: "Global Visa Solutions",
      description: "Comprehensive visa services for all travel purposes with premium concierge support.",
      features: [
        "Personalized visa strategy session",
        "Document authentication & legalization",
        "Priority embassy appointments",
        "Interview preparation masterclass",
        "24/7 case tracking"
      ],
      price: "From $850",
      processingTime: "2-4 weeks",
      premium: true,
      countries: ["USA", "UK", "Schengen", "Canada", "Australia", "Japan", "UAE", "China"]
    },
    {
      title: "Business Visa Elite",
      description: "Tailored solutions for corporate travelers and entrepreneurs with fast-track options.",
      features: [
        "Company sponsorship coordination",
        "Multi-entry visa optimization",
        "Investor visa advisory",
        "Global mobility planning",
        "Dedicated account manager"
      ],
      price: "From $1,500",
      processingTime: "1-3 weeks",
      premium: true,
      countries: ["USA (B1/B2)", "UK (Business)", "Schengen (Business)", "China (M Visa)"]
    },
    {
      title: "Student Visa Success",
      description: "End-to-end support for academic applicants with university liaison services.",
      features: [
        "I-20/DS-2019 guidance",
        "Financial documentation review",
        "SEVIS fee payment assistance",
        "Pre-departure orientation",
        "Alumni network access"
      ],
      price: "From $950",
      processingTime: "3-5 weeks",
      countries: ["USA (F1)", "UK (Tier 4)", "Canada (Study Permit)", "Australia (Student)"]
    }
  ],
  greencard: [
    {
      title: "EB-1 Extraordinary Ability",
      description: "For individuals with extraordinary ability in sciences, arts, education, business, or athletics.",
      features: [
        "Petition strategy development",
        "Evidence portfolio curation",
        "Recommendation letter drafting",
        "Premium processing filing",
        "RFI response management"
      ],
      price: "From $8,500",
      processingTime: "6-12 months",
      premium: true,
      successRate: "92% approval rate"
    },
    {
      title: "EB-2 National Interest Waiver",
      description: "For professionals whose work benefits the U.S. national interest substantially.",
      features: [
        "NIW case development",
        "Expert opinion letters",
        "Citation analysis",
        "Petition narrative crafting",
        "Comprehensive documentation"
      ],
      price: "From $6,500",
      processingTime: "8-16 months",
      premium: true
    },
    {
      title: "Family-Based Green Card",
      description: "Comprehensive family sponsorship services for immediate relatives and preference categories.",
      features: [
        "Relationship evidence preparation",
        "Affidavit of support guidance",
        "Consular processing support",
        "Adjustment of status filing",
        "Waiver applications (if needed)"
      ],
      price: "From $3,500",
      processingTime: "12-24 months",
      categories: ["IR-1/CR-1", "F2A", "F2B", "F3", "F4"]
    },
    {
      title: "DV Lottery Success Program",
      description: "Maximize your chances with our comprehensive DV Lottery service package.",
      features: [
        "Eligibility verification",
        "Photo compliance review",
        "Entry submission service",
        "Selection notification monitoring",
        "Post-selection full support"
      ],
      price: "$495",
      processingTime: "Annual program",
      limitedTime: true
    }
  ],
  citizenship: [
    {
      title: "Naturalization Assistance",
      description: "Complete support for the U.S. citizenship application process.",
      features: [
        "Eligibility assessment",
        "N-400 application preparation",
        "Civics test preparation",
        "Interview coaching",
        "Oath ceremony guidance"
      ],
      price: "From $1,200",
      processingTime: "6-12 months"
    }
  ]
};

// Premium testimonials
const testimonials = [
  {
    quote: "The EB-1 guidance was exceptional. My green card was approved in just 4 months with premium processing. Worth every penny!",
    author: "Dr. Elena K.",
    position: "Research Scientist",
    rating: 5,
    service: "EB-1 Green Card",
    avatar: "avatar-scientist.jpg"
  },
  {
    quote: "Our entire family's visas were handled seamlessly. The concierge service made the complex process feel effortless.",
    author: "The Rodriguez Family",
    position: "Business Investors",
    rating: 5,
    service: "Family Visa Package",
    avatar: "avatar-family.jpg"
  },
  {
    quote: "From student visa to green card - MiteExplorers guided me through every step of my American journey.",
    author: "James L.",
    position: "Tech Entrepreneur",
    rating: 5,
    service: "F1 to EB-2 NIW",
    avatar: "avatar-entrepreneur.jpg"
  }
];

// Trust indicators
const stats = [
  { value: "98.7%", label: "Approval Rate", icon: "fa-certificate" },
  { value: "24/7", label: "Concierge Support", icon: "fa-headset" },
  { value: "60+", label: "Countries Covered", icon: "fa-globe" },
  { value: "12k+", label: "Successful Cases", icon: "fa-users" }
];

const submitForm = () => {
  const { name, email, phone, service, message, country, urgency } = formData.value;

  const formattedMessage =
    `*${service} Service Inquiry*\n\n` +
    `*Client Information:*\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `✉️ Email: ${email}\n` +
    `🌍 Country: ${country || 'Not specified'}\n` +
    `⏱️ Urgency: ${urgency}\n\n` +
    `*Additional Details:*\n${message || 'No additional message provided'}\n\n` +
    `🔗 Submitted via MiteExplorers Premium Portal`;

  const whatsappURL = `https://wa.me/+16234992271?text=${encodeURIComponent(formattedMessage)}`;
  window.open(whatsappURL, '_blank');

  submitted.value = true;
  setTimeout(() => {
    showModal.value = false;
    submitted.value = false;
    formData.value = {
      name: '',
      email: '',
      phone: '',
      service: formData.value.service,
      message: '',
      country: '',
      urgency: 'standard'
    };
  }, 3000);
};

const openModal = (service) => {
  formData.value.service = service;
  showModal.value = true;
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

  <!-- Luxury Hero Section -->
  <div class="relative h-screen overflow-hidden bg-black">
    <!-- 4K Video Background -->
    <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover opacity-70">
      <source src="https://assets.mixkit.co/videos/preview/mixkit-airplane-flying-in-a-blue-sky-1568-large.mp4"
        type="video/mp4">
    </video>

    <!-- Animated Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-emerald-900/70 to-blue-900/90"></div>

    <!-- Floating Globe Animation -->
    <div
      class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 bg-gradient-to-r from-blue-500 to-emerald-400 filter blur-3xl animate-float">
    </div>
    <div
      class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 bg-gradient-to-r from-amber-400 to-blue-500 filter blur-3xl animate-float-delay">
    </div>

    <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
      <div class="max-w-5xl">
        <!-- Animated Badge -->
        <div
          class="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-pulse">
          <span class="h-2 w-2 mr-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="text-sm font-medium text-white">WORLD-CLASS IMMIGRATION SERVICES</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 font-serif leading-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-emerald-300">Global
            Mobility</span><br>
          Redefined
        </h1>

        <p class="text-xl md:text-2xl font-light text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Premium visa and green card solutions for discerning clients. Our white-glove service ensures your
          international journey is seamless from start to finish.
        </p>

        <div class="flex flex-wrap justify-center gap-4 mt-12">
          <router-link to="/greencard"
            class="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-blue-900 font-bold rounded-lg hover:shadow-xl transition-all duration-300 group inline-block">
            <span class="group-hover:translate-x-1 transition-transform duration-300">
              Green Card Programs →
            </span>
          </router-link>

          <router-link to="/visa"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 group inline-block">
            <span class="group-hover:translate-x-1 transition-transform duration-300">
              Visa Services →
            </span>
          </router-link>
          <router-link to="/travel-documents"
            class="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-blue-900 font-bold rounded-lg hover:shadow-xl transition-all duration-300 group inline-block">
            <span class="group-hover:translate-x-1 transition-transform duration-300">
              Travel Documents →
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Scrolling Indicator -->
    <div class="absolute bottom-2 left-0 right-0 flex justify-center z-10">
      <a href="#services" class="animate-bounce">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </div>
  </div>

  <!-- Trust Indicators -->
  <div class="bg-gradient-to-r from-blue-900 to-emerald-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, index) in stats" :key="index"
          class="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <div class="text-4xl font-bold text-white mb-3">
            <i class="fas" :class="stat.icon"></i>
          </div>
          <div class="text-3xl font-bold text-white mb-2">{{ stat.value }}</div>
          <div class="text-blue-200 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Services Showcase -->
  <section id="services" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          <span class="relative inline-block">
            <span class="absolute inset-0 bg-amber-100 transform -skew-y-3 -rotate-2"></span>
            <span class="relative z-10 px-4">Premium Immigration Solutions</span>
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
          Tailored services designed for high-net-worth individuals, executives, and professionals seeking premium
          immigration experiences
        </p>
      </div>

      <!-- Service Tabs Navigation -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex rounded-lg bg-gray-100 p-1 border border-gray-200 shadow-inner">
          <button @click="activeTab = 'visa'" :class="[
            'px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center',
            activeTab === 'visa' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
          ]">
            <i class="fas fa-passport mr-2"></i> Visa Services
          </button>
          <button @click="activeTab = 'greencard'" :class="[
            'px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center',
            activeTab === 'greencard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
          ]">
            <i class="fas fa-id-card-alt mr-2"></i> Green Cards
          </button>
          <button @click="activeTab = 'citizenship'" :class="[
            'px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center',
            activeTab === 'citizenship' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
          ]">
            <i class="fas fa-flag-usa mr-2"></i> Citizenship
          </button>
        </div>
      </div>

      <!-- Service Tabs Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in services[activeTab]" :key="index"
          class="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl border border-gray-100 group relative"
          :class="{ 'border-2 border-amber-400': service.premium }">

          <!-- Premium Badge -->
          <div v-if="service.premium" class="absolute top-4 right-4 z-10">
            <div
              class="bg-gradient-to-r from-amber-400 to-amber-500 text-blue-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
              <i class="fas fa-crown mr-1"></i> PREMIUM
            </div>
          </div>

          <!-- Limited Time Badge -->
          <div v-if="service.limitedTime" class="absolute top-4 right-4 z-10">
            <div
              class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
              <i class="fas fa-clock mr-1"></i> LIMITED TIME
            </div>
          </div>

          <div class="h-64 bg-gradient-to-br from-blue-500 to-emerald-600 overflow-hidden relative">
            <div class="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-20">
              <i v-if="activeTab === 'visa'" class="fas fa-passport"></i>
              <i v-if="activeTab === 'greencard'" class="fas fa-id-card"></i>
              <i v-if="activeTab === 'citizenship'" class="fas fa-flag"></i>
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
              <h4 class="text-sm font-semibold text-gray-500 mb-2">COVERAGE:</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="(country, i) in service.countries" :key="i"
                  class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {{ country }}
                </span>
              </div>
            </div>

            <div v-if="service.categories" class="mb-6">
              <h4 class="text-sm font-semibold text-gray-500 mb-2">CATEGORIES:</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="(category, i) in service.categories" :key="i"
                  class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {{ category }}
                </span>
              </div>
            </div>

            <div v-if="service.successRate" class="mb-6 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <div class="flex items-center text-emerald-800">
                <i class="fas fa-chart-line mr-2"></i>
                <span class="text-sm font-medium">{{ service.successRate }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">{{ service.price }}</span>
              <button @click="openModal(service.title)"
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all duration-300 group">
                <span class="group-hover:translate-x-1 transition-transform duration-300">Consult Now →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Timeline -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          Our <span class="text-blue-600">White-Glove</span> Process
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience immigration services redefined through our meticulous 5-step approach
        </p>
      </div>

      <div class="relative">
        <!-- Timeline line -->
        <div
          class="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500 transform -translate-x-1/2">
        </div>

        <!-- Timeline items -->
        <div class="space-y-16">
          <div v-for="(step, index) in [
            { title: 'Discovery Consultation', description: '90-minute deep dive into your background and immigration goals with our lead consultant', icon: 'fa-search' },
            { title: 'Custom Roadmap', description: 'Personalized strategy document outlining all pathways and recommended approach', icon: 'fa-map-marked-alt' },
            { title: 'Document Excellence', description: 'Dedicated specialist curates and perfects every piece of supporting evidence', icon: 'fa-file-certificate' },
            { title: 'Application Perfection', description: 'Meticulous preparation and review of all forms and supporting materials', icon: 'fa-check-double' },
            { title: 'Ongoing Advocacy', description: 'Continuous communication with authorities until final approval is secured', icon: 'fa-user-tie' }
          ]" :key="index" class="relative">
            <!-- Circle connector -->
            <div
              class="absolute left-1/2 top-8 w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full transform -translate-x-1/2 flex items-center justify-center text-white shadow-lg border-2 border-white">
              <i class="fas" :class="step.icon"></i>
            </div>

            <!-- Content -->
            <div :class="[
              'relative w-full md:w-5/12 p-8 rounded-xl shadow-md bg-white',
              index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
            ]">
              <div class="flex items-center mb-4">
                <span class="text-blue-600 font-bold mr-2">Step {{ index + 1 }}</span>
                <div class="w-8 h-px bg-blue-200"></div>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
              <p class="text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section class="py-20 bg-gradient-to-br from-blue-900 to-emerald-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Client <span class="text-amber-300">Success Stories</span>
        </h2>
        <p class="text-xl text-blue-200 max-w-3xl mx-auto">
          Hear from those who've experienced our premium immigration services
        </p>
      </div>

      <div class="relative max-w-5xl mx-auto">
        <!-- Testimonial Cards -->
        <div class="relative h-80 overflow-hidden">
          <div v-for="(testimonial, index) in testimonials" :key="index"
            class="absolute inset-0 transition-opacity duration-500 flex items-center"
            :class="{ 'opacity-100': currentTestimonial === index, 'opacity-0': currentTestimonial !== index }">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 w-full">
              <div class="flex flex-col md:flex-row items-start">
                <div class="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div
                    class="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {{ testimonial.author.charAt(0) }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex mb-4">
                    <svg v-for="i in 5" :key="i" class="w-6 h-6"
                      :class="i <= testimonial.rating ? 'text-amber-400' : 'text-gray-500'" fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                      </path>
                    </svg>
                  </div>
                  <p class="text-xl italic mb-6">"{{ testimonial.quote }}"</p>
                  <div class="border-t border-white/20 pt-4">
                    <p class="font-bold text-lg">{{ testimonial.author }}</p>
                    <p class="text-blue-200">{{ testimonial.position }}</p>
                    <p class="text-sm text-white/70 mt-2">Service: {{ testimonial.service }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button @click="prevTestimonial"
          class="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button @click="nextTestimonial"
          class="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  <!-- Comparison Table -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          <span class="relative inline-block">
            <span class="absolute inset-0 bg-blue-100 transform -skew-y-3 -rotate-2"></span>
            <span class="relative z-10 px-4">Why Choose Our Premium Service</span>
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
          The difference between standard immigration services and our white-glove approach
        </p>
      </div>

      <div class="overflow-hidden shadow-xl rounded-xl border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              </th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Standard Services</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                MiteExplorers Premium</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(row, index) in [
              { feature: 'Case Strategy', standard: 'Generic approach', premium: 'Tailored roadmap based on your unique profile' },
              { feature: 'Document Preparation', standard: 'Basic checklist', premium: 'Full document optimization with evidence enhancement' },
              { feature: 'Processing Time', standard: 'Standard timelines', premium: 'Priority processing with expedited options' },
              { feature: 'Support', standard: 'Email responses within 48hrs', premium: 'Dedicated concierge available 24/7' },
              { feature: 'Success Rate', standard: 'Industry average', premium: '98.7% approval rate' },
              { feature: 'Interview Preparation', standard: 'Basic Q&A list', premium: 'Full mock interview with video analysis' }
            ]" :key="index" :class="{ 'bg-gray-50': index % 2 === 0 }">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ row.feature }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ row.standard }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                <div class="flex items-center">
                  <i class="fas fa-check-circle text-emerald-500 mr-2"></i>
                  {{ row.premium }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section
    class="relative py-32 overflow-hidden bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/90"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 font-serif tracking-tight">
          Begin Your <span class="text-amber-300">Premium Immigration Journey</span>
        </h2>
        <p class="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
          Schedule your confidential consultation with our lead immigration strategist
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button @click="openModal('Premium Consultation')"
            class="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-blue-900 font-bold rounded-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            Schedule Consultation
          </button>
          <button
            class="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition-all duration-300 group">
            <span class="group-hover:translate-x-1 transition-transform duration-300">+1 (520) 736-1677 →</span>
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
        <div class="absolute inset-0 bg-gray-900 opacity-90" @click="showModal = false"></div>
      </div>

      <!-- Modal content -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-8 pt-8 pb-6 sm:p-8">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div class="flex justify-between items-start mb-6">
                <h3 class="text-2xl leading-6 font-bold text-gray-900">
                  {{ submitted ? 'Thank You!' : 'Premium Consultation Request' }}
                </h3>
                <button @click="showModal = false" class="text-gray-400 hover:text-gray-500">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
              </div>

              <div v-if="!submitted" class="mt-2">
                <p class="text-sm text-gray-500 mb-8">
                  Complete this form to schedule your confidential consultation with our lead immigration strategist.
                  We'll contact you within 2 business hours to confirm your appointment.
                </p>

                <form @submit.prevent="submitForm" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input v-model="formData.name" type="text" required
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input v-model="formData.email" type="email" required
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input v-model="formData.phone" type="tel" required
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <div>
                      <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Current Country</label>
                      <input v-model="formData.country" type="text"
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                  </div>

                  <div>
                    <label for="service" class="block text-sm font-medium text-gray-700 mb-1">Service Interest *</label>
                    <input v-model="formData.service" type="text" required readonly
                      class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label for="urgency" class="block text-sm font-medium text-gray-700 mb-1">Processing
                      Timeline</label>
                    <select v-model="formData.urgency"
                      class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="standard">Standard (4-8 weeks)</option>
                      <option value="expedited">Expedited (2-4 weeks)</option>
                      <option value="emergency">Emergency (1-2 weeks)</option>
                      <option value="unsure">Not sure - need advice</option>
                    </select>
                  </div>

                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Additional
                      Information</label>
                    <textarea v-model="formData.message" rows="4"
                      class="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please share any details about your situation that would help us prepare for your consultation"></textarea>
                  </div>

                  <div class="pt-2">
                    <button type="submit"
                      class="w-full flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                      Request Consultation
                    </button>
                  </div>
                </form>
              </div>

              <div v-else class="text-center py-8">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                  <svg class="h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-medium text-gray-900 mt-6">Request Received!</h3>
                <p class="text-lg text-gray-500 mt-4">
                  Your consultation request has been submitted. Our team will contact you within 2 business hours to
                  schedule your session.
                </p>
                <div class="mt-8">
                  <button @click="showModal = false"
                    class="px-6 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors duration-300">
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
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

.animate-float-delay {
  animation: float 6s ease-in-out infinite 1.5s;
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

/* Gradient text animation */
.animate-gradient-text {
  background-size: 200% auto;
  animation: gradientText 3s ease infinite;
}

@keyframes gradientText {
  0% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }

  100% {
    background-position: 0% center;
  }
}
</style>
