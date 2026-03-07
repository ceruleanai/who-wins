<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  animal1: { type: String, default: '' },
  animal2: { type: String, default: '' },
})

const messages = [
  'The animals are sizing each other up...',
  'This is going to be epic...',
  'Crunching the numbers...',
  'Consulting the animal kingdom...',
  'Analyzing special abilities...',
  'Checking the stats...',
  'Almost ready...',
]

const currentMessage = ref(messages[0])
let messageIndex = 0
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length
    currentMessage.value = messages[messageIndex]
  }, 2000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="loading">
    <div class="loading__card">
      <div class="loading__paws">
        <span class="loading__paw loading__paw--left">🐾</span>
        <span class="loading__vs">VS</span>
        <span class="loading__paw loading__paw--right">🐾</span>
      </div>

      <div class="loading__names">
        <span class="loading__name loading__name--left">{{ animal1 }}</span>
        <span class="loading__name loading__name--right">{{ animal2 }}</span>
      </div>

      <p class="loading__message">{{ currentMessage }}</p>

      <div class="loading__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 40px 24px;
  box-shadow: var(--shadow-md);
  text-align: center;
  animation: slideUp 0.3s ease-out;
}

.loading__card {
  max-width: 400px;
  margin: 0 auto;
}

.loading__paws {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.loading__paw {
  font-size: 2.5rem;
}

.loading__paw--left {
  animation: pawBounce 1s ease-in-out infinite;
}

.loading__paw--right {
  animation: pawBounce 1s ease-in-out infinite 0.5s;
}

.loading__vs {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--fight-button);
  animation: pulse 1.5s ease-in-out infinite;
}

.loading__names {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 24px;
}

.loading__name {
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: capitalize;
}

.loading__name--left {
  color: var(--team-left);
}

.loading__name--right {
  color: var(--team-right);
}

.loading__message {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  min-height: 1.5em;
  transition: opacity 0.3s;
}

.loading__dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.loading__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bg-start);
  animation: pawBounce 1.4s ease-in-out infinite;
}

.loading__dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading__dots span:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
