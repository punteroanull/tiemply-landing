<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import PricingSection from '@/components/sections/PricingSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

onMounted(() => {
  // Re-initialize Feather icons after component mount
  setTimeout(() => {
    if (window.feather) {
      window.feather.replace()
    }
  }, 100)
})
</script>

<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>
