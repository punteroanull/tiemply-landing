<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { usePlans } from '@/composables/usePlans'

const { plans, isLoading, error, fetchPlans, formatPrice } = usePlans()

const billingPeriod = ref('monthly')

// Cargar planes al montar el componente
onMounted(() => {
  fetchPlans()
})

// Calcular el descuento máximo entre los planes
const maxDiscount = computed(() => {
  if (!plans.value.length) return 20
  const discounts = plans.value
    .map(p => p.yearlyDiscount)
    .filter(d => d > 0)
  return discounts.length ? Math.round(Math.max(...discounts)) : 20
})

const getPrice = (plan) => {
  return formatPrice(plan, billingPeriod.value)
}
</script>

<template>
  <section id="pricing" class="section bg-gray-50">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
        <span class="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-medium mb-4">
          Precios
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">
          Planes adaptados a tu empresa
        </h2>
        <p class="text-lg text-gray-600">
          Sin compromisos. Cancela cuando quieras. Empieza con 14 días de prueba gratis.
        </p>
      </div>

      <!-- Billing Toggle -->
      <div class="flex items-center justify-center mb-12" data-aos="fade-up">
        <span
          class="font-medium mr-3"
          :class="billingPeriod === 'monthly' ? 'text-dark' : 'text-gray-400'"
        >
          Mensual
        </span>
        <button
          @click="billingPeriod = billingPeriod === 'monthly' ? 'yearly' : 'monthly'"
          class="relative w-14 h-7 bg-primary-500 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <span
            class="absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform"
            :class="billingPeriod === 'yearly' ? 'left-8' : 'left-1'"
          ></span>
        </button>
        <span
          class="font-medium ml-3"
          :class="billingPeriod === 'yearly' ? 'text-dark' : 'text-gray-400'"
        >
          Anual
        </span>
        <span
          v-if="billingPeriod === 'yearly'"
          class="ml-2 px-2 py-1 bg-teal-100 text-teal-600 text-xs font-medium rounded-full"
        >
          -{{ maxDiscount }}%
        </span>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button @click="fetchPlans(true)" class="btn btn-outline">
          Reintentar
        </button>
      </div>

      <!-- Pricing Cards -->
      <div
        v-else
        class="grid gap-8 max-w-6xl mx-auto"
        :class="plans.length === 3 ? 'md:grid-cols-3' : plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-md'"
      >
        <div
          v-for="(plan, index) in plans"
          :key="plan.id"
          class="card p-8"
          :class="{ 'ring-2 ring-primary-500 relative': plan.featured }"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Popular Badge -->
          <span
            v-if="plan.featured"
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-medium rounded-full"
          >
            Más popular
          </span>

          <!-- Plan Header -->
          <div class="text-center mb-8">
            <h3 class="text-xl font-bold text-dark mb-2">{{ plan.name }}</h3>
            <p class="text-gray-500 text-sm">{{ plan.description }}</p>
          </div>

          <!-- Price -->
          <div class="text-center mb-8">
            <div class="pricing-price">
              <template v-if="plan.price[billingPeriod] !== null">
                <sup v-if="plan.price[billingPeriod] > 0"></sup>
              </template>
              {{ getPrice(plan) }}
            </div>
            <p v-if="plan.priceNote" class="text-gray-500 text-sm mt-1">
              {{ plan.priceNote }}
            </p>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-8">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start"
            >
              <i data-feather="check" class="w-5 h-5 text-teal-500 mr-3 flex-shrink-0 mt-0.5"></i>
              <span class="text-gray-600">{{ feature }}</span>
            </li>
            <li
              v-for="limitation in plan.limitations"
              :key="limitation"
              class="flex items-start opacity-50"
            >
              <i data-feather="x" class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5"></i>
              <span class="text-gray-500">{{ limitation }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <router-link
            :to="{ path: '/registro', query: { plan: plan.id } }"
            class="btn w-full"
            :class="plan.featured ? 'btn-primary' : 'btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'"
          >
            {{ plan.cta }}
          </router-link>
        </div>
      </div>

      <!-- Note -->
      <p class="text-center text-gray-500 text-sm mt-8" data-aos="fade-up">
        Todos los precios son sin IVA. Al finalizar la prueba gratis, se te pedirá método de pago.
      </p>
    </div>
  </section>
</template>
