<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  company: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simular envío
  await new Promise(resolve => setTimeout(resolve, 1000))

  isSubmitting.value = false
  isSubmitted.value = true

  // Reset form
  formData.value = { name: '', email: '', company: '', message: '' }

  // Reset success message after 5 seconds
  setTimeout(() => {
    isSubmitted.value = false
  }, 5000)
}
</script>

<template>
  <section id="contact" class="section bg-white">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div data-aos="fade-right">
          <span class="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Contacto
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">
            ¿Listo para empezar?
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Escríbenos y te responderemos en menos de 24 horas.
            También puedes registrarte directamente y empezar tu prueba gratuita.
          </p>

          <!-- Contact Info -->
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="icon-stack icon-stack-md bg-primary-100 text-primary-500 mr-4">
                <i data-feather="mail"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Email</p>
                <a href="mailto:hola@tiemply.com" class="font-medium text-dark hover:text-primary-500">
                  hola@tiemply.com
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <div class="icon-stack icon-stack-md bg-primary-100 text-primary-500 mr-4">
                <i data-feather="phone"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Teléfono</p>
                <a href="tel:+34900123456" class="font-medium text-dark hover:text-primary-500">
                  900 123 456
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <div class="icon-stack icon-stack-md bg-primary-100 text-primary-500 mr-4">
                <i data-feather="message-circle"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Chat en vivo</p>
                <p class="font-medium text-dark">Lun-Vie 9:00-18:00</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div data-aos="fade-left">
          <div class="bg-gray-50 rounded-2xl p-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="form-label">Nombre</label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    class="form-input"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label for="company" class="form-label">Empresa</label>
                <input
                  id="company"
                  v-model="formData.company"
                  type="text"
                  class="form-input"
                  placeholder="Nombre de tu empresa"
                />
              </div>
              <div>
                <label for="message" class="form-label">Mensaje</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="4"
                  required
                  class="form-input resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn btn-primary w-full"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
                <span v-else>Enviar mensaje</span>
              </button>

              <!-- Success Message -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
              >
                <div
                  v-if="isSubmitted"
                  class="p-4 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-center"
                >
                  <i data-feather="check-circle" class="w-5 h-5 inline mr-2"></i>
                  ¡Mensaje enviado! Te responderemos pronto.
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
