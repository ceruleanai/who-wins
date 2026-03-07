<script setup>
import BattleArena from './components/BattleArena.vue'
</script>

<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <h1 class="header__title">WHO WINS?</h1>
        <p class="header__subtitle">The Ultimate Animal Showdown!</p>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <div class="container">
        <BattleArena />
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
  text-align: center;
  padding: 40px 0 20px;
}

.header__title {
  font-size: 3.5rem;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  letter-spacing: 4px;
  animation: bounceIn 0.8s ease-out;
}

.header__subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  margin-top: 4px;
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
  .header {
    padding: 24px 0 12px;
  }

  .header__title {
    font-size: 2.4rem;
    letter-spacing: 2px;
  }

  .header__subtitle {
    font-size: 1rem;
  }
}
</style>
