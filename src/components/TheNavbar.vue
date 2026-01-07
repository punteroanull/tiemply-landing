<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Características', path: '/#features' },
  { name: 'Precios', path: '/#pricing' },
  { name: 'Contacto', path: '/#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled || route.path !== '/'
        ? 'bg-white/95 backdrop-blur-sm shadow-lg'
        : 'bg-transparent'
    ]"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center space-x-2 text-2xl font-bold transition-colors"
          :class="[
            isScrolled || route.path !== '/' ? 'text-primary-500' : 'text-white'
          ]"
        >
          <i data-feather="clock" class="w-8 h-8"></i>
          <span>tiemply</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.path"
            :href="link.path"
            class="font-medium transition-colors hover:text-primary-500"
            :class="[
              isScrolled || route.path !== '/' ? 'text-gray-700' : 'text-white'
            ]"
          >
            {{ link.name }}
          </a>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <a
            href="https://app.tiemply.com"
            class="font-medium transition-colors hover:text-primary-500"
            :class="[
              isScrolled || route.path !== '/' ? 'text-gray-700' : 'text-white'
            ]"
          >
            Iniciar sesión
          </a>
          <router-link
            to="/registro"
            class="btn btn-teal btn-sm"
          >
            Empezar gratis
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg transition-colors"
          :class="[
            isScrolled || route.path !== '/'
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          ]"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 absolute left-4 right-4"
        >
          <div class="space-y-2">
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="link.path"
              @click="closeMobileMenu"
              class="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              {{ link.name }}
            </a>
            <hr class="my-3" />
            <a
              href="https://app.tiemply.com"
              class="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Iniciar sesión
            </a>
            <router-link
              to="/registro"
              @click="closeMobileMenu"
              class="block w-full text-center btn btn-teal"
            >
              Empezar gratis
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>
