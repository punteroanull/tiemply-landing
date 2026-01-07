<script setup>
const currentYear = new Date().getFullYear()

const footerLinks = {
  producto: [
    { name: 'Características', href: '/#features' },
    { name: 'Precios', href: '/#pricing' },
    { name: 'Integraciones', href: '#' },
    { name: 'API', href: '#' },
  ],
  empresa: [
    { name: 'Sobre nosotros', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contacto', href: '/#contact' },
    { name: 'Empleo', href: '#' },
  ],
  legal: [
    { name: 'Términos de uso', href: '#' },
    { name: 'Política de privacidad', href: '#' },
    { name: 'Cookies', href: '#' },
    { name: 'RGPD', href: '#' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: 'twitter', href: '#' },
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'GitHub', icon: 'github', href: '#' },
]
</script>

<template>
  <footer class="bg-dark text-white">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold mb-4">
            <i data-feather="clock" class="w-8 h-8 text-teal-500"></i>
            <span>tiemply</span>
          </router-link>
          <p class="text-gray-400 mb-6 max-w-sm">
            La solución más sencilla para el control horario de tu empresa.
            Cumple con la normativa y mejora la gestión de tu equipo.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
              :aria-label="social.name"
            >
              <i :data-feather="social.icon" class="w-5 h-5"></i>
            </a>
          </div>
        </div>

        <!-- Product Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Producto</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.producto" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Empresa</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.empresa" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Legal</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.legal" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ currentYear }} Tiemply. Todos los derechos reservados.
        </p>
        <p class="text-gray-500 text-sm mt-2 md:mt-0">
          Hecho con <span class="text-red-500">♥</span> en España
        </p>
      </div>
    </div>
  </footer>
</template>
