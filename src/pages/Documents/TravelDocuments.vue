<script setup>
import { ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

const activeTab = ref('visa');
const activeAccordion = ref(null);

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
      image: "visa-support.jpg"
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
      image: "work-visa.jpg"
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
      image: "green-card.jpg"
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
      image: "dv-lottery.jpg"
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
      image: "passport-help.jpg"
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
      image: "travel-ready.jpg"
    }
  ]
};

const testimonials = [
  {
    quote: "MiteExplorers made my green card process effortless. Their team was proactive, kind, and truly world-class.",
    author: "Angela M.",
    position: "Healthcare Professional"
  },
  {
    quote: "Their attention to detail during my business visa application was unmatched. I recommend them to all my peers.",
    author: "David N.",
    position: "Startup Founder"
  },
  {
    quote: "I was panicked about my travel permit, but MiteExplorers handled everything within 48 hours. Absolute lifesavers!",
    author: "Samiya K.",
    position: "Graduate Student"
  }
];
</script>


<template>
  <TheNavbar />

  <!-- Hero Section with Parallax -->
  <div class="relative h-screen overflow-hidden">
    <div class="absolute inset-0 z-0">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/90"></div>

      <!-- Image with opacity layer -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute inset-0 bg-black/50"></div> <!-- Opacity overlay -->
        <div
          class="w-full h-full bg-[url('https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center animate-parallax">
        </div>
      </div>
    </div>


    <div class="relative z-10 h-full flex flex-col justify-center items-center text-white px-8 space-y-8">
      <div class="text-center max-w-4xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 font-serif tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-emerald-300">Global
            Mobility</span> Reimagined
        </h1>
        <p class="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
          Discreet, expedited immigration solutions for discerning clients. Where borders become opportunities.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <button @click="activeTab = 'visa'"
          :class="['px-8 py-3 rounded-full font-medium transition-all duration-300 border-2',
            activeTab === 'visa' ? 'bg-white text-blue-900 border-white' : 'text-white border-white/50 hover:border-white']">
          Visa Services
        </button>
        <button @click="activeTab = 'greencard'"
          :class="['px-8 py-3 rounded-full font-medium transition-all duration-300 border-2',
            activeTab === 'greencard' ? 'bg-white text-blue-900 border-white' : 'text-white border-white/50 hover:border-white']">
          Green Card
        </button>
        <button @click="activeTab = 'traveldocs'"
          :class="['px-8 py-3 rounded-full font-medium transition-all duration-300 border-2',
            activeTab === 'traveldocs' ? 'bg-white text-blue-900 border-white' : 'text-white border-white/50 hover:border-white']">
          Travel Documents
        </button>
      </div>
    </div>

    <div class="absolute bottom-10 left-0 right-0 flex justify-center z-10">
      <div class="animate-bounce">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </div>

  <!-- Services Showcase -->
  <section class="py-20 bg-gradient-to-b from-blue-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span class="relative inline-block">
            <span class="absolute inset-0 bg-amber-100 transform -skew-y-3 -rotate-2"></span>
            <span class="relative z-10 font-serif">Tailored Immigration Solutions</span>
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Our concierge-level services remove the complexity from global mobility
        </p>
      </div>

      <!-- Service Tabs Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(service, index) in services[activeTab]" :key="index"
          class="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl">
          <div class="h-64 bg-gray-100 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-r from-blue-500 to-emerald-600 flex items-center justify-center">
              <div class="text-white text-6xl">
                <i v-if="activeTab === 'visa'" class="fas fa-passport"></i>
                <i v-if="activeTab === 'greencard'" class="fas fa-id-card"></i>
                <i v-if="activeTab === 'traveldocs'" class="fas fa-globe-americas"></i>
              </div>
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

            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">{{ service.price }}</span>
              <button
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
                Begin Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Timeline -->
  <section class="py-20 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Our <span class="text-amber-300">Signature</span> Process
        </h2>
        <p class="text-lg text-blue-200 max-w-2xl mx-auto">
          A meticulously crafted journey from consultation to approval
        </p>
      </div>

      <div class="relative">
        <!-- Timeline line -->
        <div
          class="hidden md:block absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-emerald-400 transform -translate-x-1/2">
        </div>

        <!-- Timeline items -->
        <div class="space-y-12 md:space-y-0">
          <div v-for="(step, index) in [
            { title: 'Discovery Call', desc: '1-hour strategy session with our lead attorney', icon: 'phone-alt' },
            { title: 'Document Collection', desc: 'Dedicated concierge manages all paperwork', icon: 'folder-open' },
            { title: 'Premium Processing', desc: 'Expedited filing with government agencies', icon: 'bolt' },
            { title: 'Interview Prep', desc: '3-hour coaching with former consular officer', icon: 'user-tie' },
            { title: 'Approval Celebration', desc: 'Champagne delivery with your documents', icon: 'glass-cheers' }
          ]" :key="index" class="relative md:flex md:items-center md:justify-between"
            :class="{ 'md:flex-row-reverse': index % 2 !== 0 }">
            <div class="md:w-5/12 mb-8 md:mb-0" :class="{ 'md:text-right': index % 2 === 0 }">
              <div class="inline-block bg-gray-800 rounded-lg p-6 shadow-xl">
                <h3 class="text-xl font-bold text-amber-300 mb-2">{{ step.title }}</h3>
                <p class="text-blue-200">{{ step.desc }}</p>
              </div>
            </div>

            <div class="hidden md:block md:w-2/12 flex justify-center">
              <div
                class="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl border-4 border-emerald-400 shadow-lg">
                <i class="fas" :class="`fa-${step.icon}`"></i>
              </div>
            </div>

            <div class="md:w-5/12" :class="{ 'md:text-left': index % 2 === 0 }">
              <div class="inline-block bg-gray-800 rounded-lg p-6 shadow-xl">
                <h3 class="text-xl font-bold text-emerald-300 mb-2">Stage {{ index + 1 }}</h3>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section
    class="py-20 bg-[url('https://images.unsplash.com/photo-1519642918688-7e43b19245d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-fixed">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
          Voices of <span class="text-amber-300">Distinction</span>
        </h2>
        <p class="text-xl text-blue-200 max-w-2xl mx-auto">
          What our elite clients say about their experience
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index"
          class="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-amber-300/50 transition-all duration-500">
          <div class="text-amber-300 text-4xl mb-4">“</div>
          <p class="text-white text-lg italic mb-6">{{ testimonial.quote }}</p>
          <div class="border-t border-white/20 pt-4">
            <p class="text-white font-bold">{{ testimonial.author }}</p>
            <p class="text-blue-200">{{ testimonial.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
          Elite <span class="text-blue-600">Inquiries</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Answers to our most discerning clients' questions
        </p>
      </div>

      <div class="space-y-4">
        <div v-for="(item, index) in [
          { question: 'How discreet are your services?', answer: 'We operate with absolute confidentiality. All communications are encrypted, documents are handled through secure channels, and we never disclose client relationships without explicit permission.' },
          { question: 'What makes your processing times faster?', answer: 'Our premium relationships with consulates and immigration offices, combined with flawless document preparation and strategic filing approaches developed over 15+ years.' },
          { question: 'Do you handle complex cases?', answer: 'Special situations are our specialty. From prior denials to sensitive backgrounds, we have successfully navigated the most challenging immigration scenarios for high-profile clients.' },
          { question: 'What ongoing support do you provide?', answer: 'Our platinum clients receive lifetime concierge support for all future immigration needs, including visa renewals, family petitions, and citizenship applications.' }
        ]" :key="index" class="border border-gray-200 rounded-xl overflow-hidden">
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
          Your Global Journey <span class="text-amber-300">Begins Here</span>
        </h2>
        <p class="text-xl text-blue-200 max-w-2xl mx-auto mb-10">
          Schedule a confidential consultation with our immigration strategists
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            class="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-blue-900 font-bold rounded-lg transition-all duration-300 hover:shadow-xl">
            Book Elite Consultation
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
</template>

<style scoped>
.animate-parallax {
  animation: parallax 20s linear infinite;
}

@keyframes parallax {
  0% {
    transform: scale(1) translateY(0);
  }

  50% {
    transform: scale(1.05) translateY(-20px);
  }

  100% {
    transform: scale(1) translateY(0);
  }
}

.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
