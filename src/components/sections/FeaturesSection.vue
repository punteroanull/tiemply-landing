<script setup>
const features = [
  {
    icon: 'smartphone',
    title: 'Fichaje desde cualquier lugar',
    description: 'Tus empleados pueden fichar desde el móvil, tablet u ordenador. Sin hardware adicional.',
  },
  {
    icon: 'map-pin',
    title: 'Geolocalización opcional',
    description: 'Verifica la ubicación del fichaje cuando lo necesites. Configurable por empleado o ubicación.',
  },
  {
    icon: 'bar-chart-2',
    title: 'Informes en tiempo real',
    description: 'Visualiza horas trabajadas, ausencias y tendencias. Exporta a Excel o PDF en un clic.',
  },
  {
    icon: 'calendar',
    title: 'Gestión de ausencias',
    description: 'Vacaciones, bajas y permisos centralizados. Los empleados solicitan y tú apruebas.',
  },
  {
    icon: 'users',
    title: 'Gestión de turnos',
    description: 'Crea y asigna turnos fácilmente. Tus empleados ven su horario desde la app.',
  },
  {
    icon: 'shield',
    title: 'Cumplimiento legal',
    description: 'Cumple con la normativa de control horario. Registros almacenados de forma segura.',
  },
]
</script>

<template>
  <section id="features" class="section bg-white">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
          Características
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">
          Todo lo que necesitas para gestionar el tiempo de tu equipo
        </h2>
        <p class="text-lg text-gray-600">
          Diseñado para hacer tu vida más fácil. Sin complicaciones, sin curvas de aprendizaje.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="icon-stack icon-stack-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white mb-6 group-hover:scale-110 transition-transform">
            <i :data-feather="feature.icon"></i>
          </div>
          <h3 class="text-xl font-bold text-dark mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16" data-aos="fade-up">
        <router-link to="/caracteristicas" class="btn btn-primary btn-lg">
          Ver todas las características
          <i data-feather="arrow-right" class="w-5 h-5 ml-2"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>
