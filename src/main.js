import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    window.AOS.init({
      disable: 'mobile',
      duration: 600,
      once: true,
    })
  }

  // Initialize Feather Icons
  if (window.feather) {
    window.feather.replace()
  }
})
