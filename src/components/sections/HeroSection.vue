<script setup>
</script>

<template>
  <section class="relative min-h-screen flex items-center bg-gradient-to-br from-primary-500 to-secondary-500 pt-20 overflow-hidden">
    <!-- Background Pattern (deshabilitado - imagen no disponible)
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('/img/backgrounds/pattern-shapes.png'); background-size: cover;"></div>
    </div>
    -->

    <div class="container-custom relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="text-center lg:text-left" data-aos="fade-right">
          <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            Control horario simplificado
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Gestiona el tiempo de tu equipo
            <span class="text-teal-400">sin complicaciones</span>
          </h1>
          <p class="text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
            La solución de control horario más sencilla para tu empresa.
            Tus empleados fichan en segundos y tú tienes todo bajo control.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <router-link to="/registro" class="btn btn-teal btn-lg">
              Empezar gratis
              <i data-feather="arrow-right" class="w-5 h-5 ml-2"></i>
            </router-link>
            <a href="#features" class="btn btn-outline btn-lg">
              Ver características
            </a>
          </div>
          <p class="text-white/70 text-sm mt-6">
            <i data-feather="check" class="w-4 h-4 inline mr-1"></i>
            Sin tarjeta de crédito · 14 días de prueba gratis
          </p>
        </div>

        <!-- Illustration -->
        <div class="relative hidden lg:block" data-aos="fade-left" data-aos-delay="200">
          <div class="relative animate-float">
            <!-- Dashboard mockup -->
            <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <p class="text-sm text-gray-500">Hoy</p>
                  <p class="text-2xl font-bold text-dark">08:45:32</p>
                </div>
                <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <i data-feather="clock" class="w-6 h-6 text-teal-500"></i>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <i data-feather="log-in" class="w-4 h-4 text-primary-500"></i>
                    </div>
                    <span class="font-medium">Entrada</span>
                  </div>
                  <span class="text-gray-500">09:00</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <i data-feather="coffee" class="w-4 h-4 text-orange-500"></i>
                    </div>
                    <span class="font-medium">Descanso</span>
                  </div>
                  <span class="text-gray-500">11:30</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-teal-50 rounded-lg border-2 border-teal-200">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <i data-feather="play" class="w-4 h-4 text-teal-500"></i>
                    </div>
                    <span class="font-medium text-teal-700">Trabajando</span>
                  </div>
                  <span class="text-teal-600 font-medium">Activo</span>
                </div>
              </div>
            </div>

            <!-- Floating elements -->
            <div class="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-pulse">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i data-feather="check" class="w-4 h-4 text-green-500"></i>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Fichaje registrado</p>
                  <p class="text-sm font-medium">09:00:12</p>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
              <div class="flex items-center space-x-3">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 bg-primary-500 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-secondary-500 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-teal-500 rounded-full border-2 border-white"></div>
                </div>
                <p class="text-sm font-medium">+24 empleados activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Border -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg class="w-full h-16 text-white" viewBox="0 0 1440 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,37L48,36.3C96,36,192,34,288,42.8C384,51,480,69,576,69.3C672,70,768,52,864,40.8C960,30,1056,26,1152,28.2C1248,30,1344,40,1392,44.3L1440,49L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"/>
      </svg>
    </div>
  </section>
</template>
