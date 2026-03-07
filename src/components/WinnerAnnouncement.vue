<script setup>
import { computed } from 'vue'

const props = defineProps({
  winnerName: { type: String, default: '' },
  explanation: { type: String, default: '' },
  isDraw: { type: Boolean, default: false },
})

// Generate confetti pieces with random properties
const confettiPieces = computed(() => {
  const colors = ['#ff6b35', '#4ecdc4', '#ffd700', '#e63946', '#667eea', '#f093fb', '#00b894', '#fdcb6e']
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[i % colors.length],
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`,
    size: `${6 + Math.random() * 6}px`,
  }))
})
</script>

<template>
  <div class="winner">
    <!-- Confetti -->
    <div class="winner__confetti">
      <span
        v-for="piece in confettiPieces"
        :key="piece.id"
        class="winner__confetti-piece"
        :style="{
          left: piece.left,
          backgroundColor: piece.color,
          animationDelay: piece.delay,
          animationDuration: piece.duration,
          width: piece.size,
          height: piece.size,
        }"
      />
    </div>

    <!-- Announcement -->
    <div class="winner__content">
      <template v-if="isDraw">
        <div class="winner__emoji">🤝</div>
        <h2 class="winner__title">IT'S A TIE!</h2>
        <p class="winner__subtitle">Both animals are equally matched!</p>
      </template>
      <template v-else>
        <div class="winner__emoji">🏆</div>
        <h2 class="winner__title">THE WINNER IS...</h2>
        <h2 class="winner__name">{{ winnerName }}!</h2>
      </template>

      <div class="winner__explanation">
        <p>{{ explanation }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.winner {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #fff9e6, #fff3cd, #fff9e6);
  padding: 32px 24px;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.4s ease-out;
}

.winner__confetti {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.winner__confetti-piece {
  position: absolute;
  top: -10px;
  border-radius: 2px;
  animation: confettiFall linear infinite;
}

.winner__content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.winner__emoji {
  font-size: 3rem;
  margin-bottom: 8px;
  animation: bounceIn 0.6s ease-out;
}

.winner__title {
  font-size: 1.2rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 4px;
  animation: bounceIn 0.6s ease-out 0.1s both;
}

.winner__name {
  font-size: 2rem;
  color: var(--fight-button);
  text-transform: capitalize;
  animation: bounceIn 0.6s ease-out 0.2s both;
}

.winner__subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  animation: bounceIn 0.6s ease-out 0.2s both;
}

.winner__explanation {
  margin-top: 20px;
  background: white;
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  position: relative;
  box-shadow: var(--shadow-sm);
  animation: slideUp 0.5s ease-out 0.4s both;
}

.winner__explanation::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 16px;
  height: 16px;
  background: white;
}

.winner__explanation p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
}

@media (max-width: 600px) {
  .winner {
    padding: 24px 16px;
  }

  .winner__name {
    font-size: 1.6rem;
  }
}
</style>
