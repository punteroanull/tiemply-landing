<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    if (window.feather) window.feather.replace()
  }, 100)
})

const featureGroups = [
  {
    title: 'Control horario',
    description: 'Todo lo que necesitas para gestionar el tiempo de trabajo',
    features: [
      {
        icon: 'clock',
        title: 'Fichaje en segundos',
        description: 'Tus empleados fichan con un solo toque desde cualquier dispositivo. Sin apps complicadas ni hardware adicional.',
      },
      {
        icon: 'map-pin',
        title: 'Geolocalización',
        description: 'Verifica la ubicación del fichaje cuando lo necesites. Configurable por empleado, departamento o ubicación.',
      },
      {
        icon: 'wifi-off',
        title: 'Funciona sin conexión',
        description: 'Los fichajes se guardan localmente y se sincronizan automáticamente cuando vuelve la conexión.',
      },
      {
        icon: 'smartphone',
        title: 'App móvil nativa',
        description: 'Disponible para iOS y Android. Diseñada para ser rápida y fácil de usar.',
      },
    ],
  },
  {
    title: 'Gestión de equipos',
    description: 'Organiza tu empresa de forma eficiente',
    features: [
      {
        icon: 'users',
        title: 'Gestión de empleados',
        description: 'Añade, edita y organiza empleados por departamentos. Asigna roles y permisos personalizados.',
      },
      {
        icon: 'calendar',
        title: 'Turnos y horarios',
        description: 'Crea turnos, asígnalos a empleados y gestiona los cambios fácilmente.',
      },
      {
        icon: 'sun',
        title: 'Gestión de vacaciones',
        description: 'Los empleados solicitan vacaciones y tú apruebas desde el panel. Todo centralizado.',
      },
      {
        icon: 'file-text',
        title: 'Gestión de ausencias',
        description: 'Registra bajas médicas, permisos y otras ausencias. Histórico completo por empleado.',
      },
    ],
  },
  {
    title: 'Informes y análisis',
    description: 'Datos que te ayudan a tomar mejores decisiones',
    features: [
      {
        icon: 'bar-chart-2',
        title: 'Dashboard en tiempo real',
        description: 'Visualiza quién está trabajando, horas acumuladas y tendencias de un vistazo.',
      },
      {
        icon: 'download',
        title: 'Exportación flexible',
        description: 'Exporta informes a Excel, PDF o CSV. Ideal para nóminas y auditorías.',
      },
      {
        icon: 'trending-up',
        title: 'Análisis de productividad',
        description: 'Identifica patrones, compara períodos y optimiza la gestión del tiempo.',
      },
      {
        icon: 'shield',
        title: 'Cumplimiento legal',
        description: 'Registros almacenados de forma segura durante 4 años. Cumple con la normativa española.',
      },
    ],
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-500 to-secondary-500 pt-32 pb-20">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Todas las características
        </h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Descubre todo lo que Tiemply puede hacer por tu empresa
        </p>
      </div>
    </section>

    <!-- Feature Groups -->
    <section
      v-for="(group, groupIndex) in featureGroups"
      :key="group.title"
      class="section"
      :class="groupIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
    >
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-dark mb-4">{{ group.title }}</h2>
          <p class="text-lg text-gray-600">{{ group.description }}</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(feature, index) in group.features"
            :key="feature.title"
            class="flex items-start p-6 bg-white rounded-2xl shadow-lg"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="icon-stack icon-stack-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white mr-6 flex-shrink-0">
              <i :data-feather="feature.icon"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-dark mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-gradient-to-br from-primary-500 to-secondary-500">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          ¿Listo para simplificar tu gestión?
        </h2>
        <p class="text-white/90 mb-8 max-w-xl mx-auto">
          Empieza tu prueba gratuita de 14 días. Sin compromiso, sin tarjeta de crédito.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/registro" class="btn btn-white btn-lg">
            Empezar gratis
            <i data-feather="arrow-right" class="w-5 h-5 ml-2"></i>
          </router-link>
          <router-link to="/precios" class="btn btn-outline btn-lg">
            Ver precios
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
