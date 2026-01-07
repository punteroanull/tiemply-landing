<script setup>
import { onMounted } from 'vue'
import PricingSection from '@/components/sections/PricingSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'

onMounted(() => {
  setTimeout(() => {
    if (window.feather) window.feather.replace()
  }, 100)
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-500 to-secondary-500 pt-32 pb-20">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Precios transparentes
        </h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Sin sorpresas ni costes ocultos. Elige el plan que mejor se adapte a tu empresa.
        </p>
      </div>
    </section>

    <!-- Pricing -->
    <PricingSection />

    <!-- FAQ -->
    <FaqSection />

    <!-- CTA -->
    <section class="section bg-white">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold text-dark mb-4">
          ¿Listo para empezar?
        </h2>
        <p class="text-gray-600 mb-8 max-w-xl mx-auto">
          Prueba Tiemply gratis durante 14 días. Sin compromiso, sin tarjeta de crédito.
        </p>
        <router-link to="/registro" class="btn btn-teal btn-lg">
          Empezar prueba gratis
          <i data-feather="arrow-right" class="w-5 h-5 ml-2"></i>
        </router-link>
      </div>
    </section>
  </div>
</template>
