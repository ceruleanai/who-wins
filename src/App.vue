<script setup>
import NavBar from './components/NavBar.vue'
import { useRoute } from 'vue-router'
import { useSeo } from './composables/useSeo.js'

const route = useRoute()
useSeo()
</script>

<template>
  <div class="app">
    <!-- Nav -->
    <header class="header">
      <div class="container">
        <NavBar />
      </div>
    </header>

    <!-- Subtitle (hidden on landing page which has its own hero) -->
    <div v-if="route.name !== 'auth'" class="subtitle">
      <p class="subtitle__text">The Ultimate Animal Showdown!</p>
    </div>

    <!-- Main -->
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>Powered by Google Gemini &bull; Images from Wikipedia</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  padding: 8px 0 0;
}

/* Subtitle */
.subtitle {
  text-align: center;
  padding: 0 0 8px;
}

.subtitle__text {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  animation: slideUp 0.6s ease-out 0.3s both;
}

/* Main */
.main {
  flex: 1;
  padding-bottom: 40px;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .subtitle__text {
    font-size: 1rem;
  }
}
</style>
