<template>
  <footer class="bg-gradient-to-r from-blue-800 to-blue-900 text-white pt-12 pb-6">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <!-- Brand Column -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <img src="@/assets/images/logo3.png" class="h-12" alt="MiteExplorers Logo" />
          </div>
          <p class="text-blue-100">
            Your trusted partner for seamless travel experiences and unforgettable adventures worldwide.
          </p>
          <div class="flex space-x-4 pt-2">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
              class="bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
              :aria-label="social.name">
              <i :class="social.icon + ' text-lg'"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.text">
              <router-link :to="link.to" class="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <i :class="link.icon + ' text-blue-300 w-5'"></i>
                <span>{{ link.text }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">Our Services</h3>
          <ul class="space-y-3">
            <li v-for="service in services" :key="service.text">
              <router-link :to="service.to" class="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <i :class="service.icon + ' text-blue-300 w-5'"></i>
                <span>{{ service.text }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-white/20">Contact Us</h3>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3">
              <i class="fas fa-phone-alt text-blue-300 mt-1"></i>
              <div>
                <p class="font-medium">Phone</p>
                <a href="tel:+15207361677" class="text-blue-100 hover:text-white">+1 (520) 736-1677</a>
              </div>
            </li>
            <li class="flex items-start space-x-3">
              <i class="fas fa-envelope text-blue-300 mt-1"></i>
              <div>
                <p class="font-medium">Email</p>
                <a href="mailto:davidirihose94@gmail.com"
                  class="text-blue-100 hover:text-white">davidirihose94@gmail.com</a>
              </div>
            </li>
            <li class="flex items-start space-x-3">
              <i class="fas fa-map-marker-alt text-blue-300 mt-1"></i>
              <div>
                <p class="font-medium">Location</p>
                <p class="text-blue-100">Phoenix, Arizona, USA</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-white/20 my-6"></div>

      <!-- Bottom Footer -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-4 mb-4 md:mb-0">
          <span>Currency:</span>
          <div class="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
            <img src="@/assets/images/usa.png" class="h-5" alt="USA Flag" />
            <span>USD</span>
          </div>
        </div>

        <div class="text-center md:text-right">
          <p class="text-sm text-blue-100">
            &copy; {{ new Date().getFullYear() }} MiteExplorers. All rights reserved.
            <router-link to="/privacy" class="hover:text-white ml-4">Privacy Policy</router-link>
            <router-link to="/terms" class="hover:text-white ml-4">Terms of Service</router-link>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        { name: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f' },
        { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
        { name: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin-in' }
      ],
      quickLinks: [
        { text: 'About Us', to: '/about', icon: 'fas fa-info-circle' },
        { text: 'Careers', to: '/careers', icon: 'fas fa-briefcase' },
        { text: 'Blog', to: '/blog', icon: 'fas fa-newspaper' },
        { text: 'Contact', to: '/contact', icon: 'fas fa-envelope' }
      ],
      services: [
        { text: 'Luxury Stays', to: '/stays', icon: 'fas fa-bed' },
        { text: 'Flight Bookings', to: '/flights', icon: 'fas fa-plane' },
        { text: 'Car Rentals', to: '/car-rentals', icon: 'fas fa-car' },
        { text: 'Travel Packages', to: '/packages', icon: 'fas fa-suitcase-rolling' }
      ]
    }
  }
}
</script>

<style scoped>
footer a {
  transition: color 0.2s ease, background-color 0.2s ease;
}

footer .router-link-active {
  color: white;
  font-weight: 500;
}

/* Smooth hover transitions */
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: translateY(-2px);
}
</style>
