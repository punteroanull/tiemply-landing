<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    if (window.feather) window.feather.replace()
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-12">
    <div class="container-custom text-center">
      <div class="max-w-lg mx-auto">
        <!-- 404 Illustration -->
        <div class="mb-8">
          <div class="text-9xl font-bold text-gray-200">404</div>
        </div>

        <h1 class="text-3xl font-bold text-dark mb-4">
          Página no encontrada
        </h1>
        <p class="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/" class="btn btn-primary">
            <i data-feather="home" class="w-5 h-5 mr-2"></i>
            Volver al inicio
          </router-link>
          <a href="mailto:hola@tiemply.com" class="btn border-gray-300 text-gray-700 hover:bg-gray-50">
            <i data-feather="mail" class="w-5 h-5 mr-2"></i>
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
