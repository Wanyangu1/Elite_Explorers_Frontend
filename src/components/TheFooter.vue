<template>
  <footer class="text-white py-8" style="background-color: rgba(59, 130, 246, 0.7);">
    <div class="mb-12 max-w-screen-lg mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-10">
      <!-- Social Media Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">Follow Us</h3>
        <hr class="w-14 mb-3" />
        <h4 class="font-bold mb-4">MiteExplorers.com</h4>
        <ul class="flex space-x-4">
          <li>
            <a href="https://facebook.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" class="hover:text-gray-300">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
        <img src="@/assets/images/logo1.png" class="img-fluid rounded h-12 mt-2" alt="AfroartSafari Logo" />
      </div>

      <!-- About Us Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">About Us</h3>
        <hr class="w-14 mb-3" />
        <ul class="space-y-1">
          <li>
            <router-link to="/" class="hover:text-gray-300">About EliteExplorers</router-link>
          </li>
          <li>
            <router-link to="/" class="hover:text-gray-300">Careers</router-link>
          </li>
          <li>
            <router-link to="/" class="hover:text-gray-300">Sustainability</router-link>
          </li>
          <li class="flex items-center space-x-2">
            <router-link to="https://www.oanda.com/currency-converter/en/?from=USD&to=EUR&amount=1"
              class="text-white font-semibold hover:text-gray-300">
              USD
            </router-link>
            <img class="rounded-full h-8 w-8" src="@/assets/images/usa.png" alt="USA Flag" />
          </li>
        </ul>
      </div>

      <!-- Services Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">Services</h3>
        <hr class="w-14 mb-3" />
        <ul class="space-y-1">
          <li>
            <router-link to="/stays" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-bed"></i>
              <span>Stays</span>
            </router-link>
          </li>
          <li>
            <router-link to="/comingsoon" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-plane"></i>
              <span>Flights</span>
            </router-link>
          </li>
          <li>
            <router-link to="/comingsoon" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-car"></i>
              <span>Car Rentals</span>
            </router-link>
          </li>
          <li>
            <router-link to="/comingsoon" class="flex items-center space-x-2 hover:text-gray-300">
              <i class="fas fa-taxi"></i>
              <span>Airport Taxis</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contact Section -->
      <div>
        <h3 class="text-xl font-semibold mb-1">Contact</h3>
        <hr class="w-14 mb-3" />
        <ul class="space-y-1">
          <li class="flex items-center space-x-2">
            <i class="fas fa-phone-alt"></i>
            <span>+1 (520) 736-1677</span>
          </li>
          <li class="flex items-center space-x-2">
            <i class="fas fa-envelope"></i>
            <span>davidirihose94@gmail.com</span>
          </li>
          <li class="flex items-center space-x-2">
            <i class="fas fa-map-marker-alt"></i>
            <span>Phoenix, Arizona-USA</span>
          </li>
        </ul>
      </div>
    </div>
    <hr class="my-5 border-gray-700" />
    <div class="text-center text-sm">
      <p>&copy; 2025 Mite_Explorers. All rights reserved.</p>
    </div>
  </footer>
</template>
<style scoped>
footer a:hover {
  color: #93c5fd;
}

footer hr {
  border-top: 2px solid #93c5fd;
}
</style>
