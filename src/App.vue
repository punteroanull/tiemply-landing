<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

const route = useRoute()

// Re-initialize icons on route change
watch(
  () => route.path,
  () => {
    setTimeout(() => {
      if (window.feather) {
        window.feather.replace()
      }
      if (window.AOS) {
        window.AOS.refresh()
      }
    }, 100)
  }
)

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheNavbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
