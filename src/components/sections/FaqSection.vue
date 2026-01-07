<script setup>
import { ref } from 'vue'

const faqs = [
  {
    question: '¿Cómo funciona la prueba gratuita?',
    answer: 'Tienes 14 días para probar todas las funcionalidades del plan Professional sin coste. No necesitas tarjeta de crédito para empezar. Al finalizar, puedes elegir el plan que mejor se adapte a tu empresa o continuar con el plan Starter gratuito.',
  },
  {
    question: '¿Es obligatorio el control horario en España?',
    answer: 'Sí, desde mayo de 2019 todas las empresas están obligadas a registrar la jornada laboral de sus empleados. Tiemply te ayuda a cumplir con esta normativa de forma sencilla, almacenando los registros de forma segura durante 4 años.',
  },
  {
    question: '¿Puedo cambiar de plan en cualquier momento?',
    answer: 'Por supuesto. Puedes actualizar o reducir tu plan cuando lo necesites. Si actualizas, el cambio es inmediato. Si reduces, se aplicará en el siguiente período de facturación.',
  },
  {
    question: '¿Qué pasa con mis datos si cancelo?',
    answer: 'Tus datos permanecen almacenados y accesibles durante 30 días después de la cancelación. Después, se eliminan de forma permanente. Puedes exportar todos tus datos en cualquier momento.',
  },
  {
    question: '¿Funciona sin conexión a internet?',
    answer: 'La app móvil guarda los fichajes localmente cuando no hay conexión y los sincroniza automáticamente cuando vuelve a estar online. Así tus empleados nunca tendrán problemas para fichar.',
  },
  {
    question: '¿Ofrecéis soporte en español?',
    answer: 'Sí, todo nuestro equipo de soporte es hispanohablante. Ofrecemos soporte por email para todos los planes y soporte prioritario con tiempos de respuesta garantizados para planes Professional y Enterprise.',
  },
]

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="section bg-dark">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
        <span class="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
          FAQ
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Preguntas frecuentes
        </h2>
        <p class="text-lg text-gray-400">
          ¿Tienes dudas? Aquí respondemos las preguntas más comunes.
        </p>
      </div>

      <!-- FAQ List -->
      <div class="max-w-3xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white/5 rounded-2xl overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="index * 50"
        >
          <button
            @click="toggle(index)"
            class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
          >
            <span class="font-medium text-white pr-4">{{ faq.question }}</span>
            <i
              data-feather="chevron-down"
              class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180': openIndex === index }"
            ></i>
          </button>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="openIndex === index" class="px-6 pb-6">
              <p class="text-gray-400">{{ faq.answer }}</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12" data-aos="fade-up">
        <p class="text-gray-400 mb-4">¿No encuentras lo que buscas?</p>
        <a href="#contact" class="btn btn-white">
          Contáctanos
          <i data-feather="arrow-right" class="w-5 h-5 ml-2"></i>
        </a>
      </div>
    </div>
  </section>
</template>
