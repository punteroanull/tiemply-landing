<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const requestId = route.query.requestId

onMounted(() => {
  setTimeout(() => {
    if (window.feather) window.feather.replace()
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center pt-20 pb-12">
    <div class="container-custom">
      <div class="max-w-lg mx-auto text-center">
        <!-- Success Icon -->
        <div class="mb-8" data-aos="zoom-in">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
            <i data-feather="check" class="w-12 h-12 text-teal-500"></i>
          </div>
        </div>

        <!-- Content -->
        <div data-aos="fade-up" data-aos-delay="100">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Solicitud enviada!
          </h1>
          <p class="text-xl text-white/90 mb-8">
            Hemos recibido tu solicitud de registro. Nuestro equipo la revisará
            y te enviaremos un email de confirmación en las próximas horas.
          </p>
        </div>

        <!-- Info Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 text-left" data-aos="fade-up" data-aos-delay="200">
          <h2 class="font-bold text-dark mb-4">¿Qué sigue ahora?</h2>
          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span class="text-primary-500 font-bold text-sm">1</span>
              </div>
              <div>
                <p class="font-medium text-dark">Revisamos tu solicitud</p>
                <p class="text-gray-500 text-sm">Verificamos los datos de tu empresa</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span class="text-primary-500 font-bold text-sm">2</span>
              </div>
              <div>
                <p class="font-medium text-dark">Te enviamos un email</p>
                <p class="text-gray-500 text-sm">Con el enlace para activar tu cuenta</p>
              </div>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span class="text-primary-500 font-bold text-sm">3</span>
              </div>
              <div>
                <p class="font-medium text-dark">Activa tu cuenta y empieza</p>
                <p class="text-gray-500 text-sm">Configura tu empresa y añade empleados</p>
              </div>
            </li>
          </ul>

          <div v-if="requestId" class="mt-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-500">ID de solicitud:</p>
            <p class="font-mono text-dark">{{ requestId }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
          <router-link to="/" class="btn btn-white">
            <i data-feather="home" class="w-5 h-5 mr-2"></i>
            Volver al inicio
          </router-link>
          <a href="mailto:hola@tiemply.com" class="btn btn-outline">
            <i data-feather="mail" class="w-5 h-5 mr-2"></i>
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
