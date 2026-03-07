<script setup>
defineProps({
  name: { type: String, required: true },
  imageUrl: { type: String, default: null },
  funFacts: { type: Array, default: () => [] },
  isWinner: { type: Boolean, default: false },
  side: { type: String, default: 'left' },
})
</script>

<template>
  <div
    class="animal-card"
    :class="[
      `animal-card--${side}`,
      { 'animal-card--winner': isWinner },
    ]"
  >
    <!-- Winner crown -->
    <div v-if="isWinner" class="animal-card__crown">👑</div>

    <!-- Image -->
    <div class="animal-card__image-wrap">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="animal-card__image"
      />
      <div v-else class="animal-card__fallback">
        <span class="animal-card__fallback-emoji">🐾</span>
        <span class="animal-card__fallback-letter">{{ name.charAt(0).toUpperCase() }}</span>
      </div>
    </div>

    <!-- Name -->
    <h3 class="animal-card__name">{{ name }}</h3>

    <!-- Fun facts -->
    <div v-if="funFacts.length" class="animal-card__facts">
      <h4 class="animal-card__facts-title">Fun Facts</h4>
      <ul class="animal-card__facts-list">
        <li v-for="(fact, i) in funFacts" :key="i">{{ fact }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.animal-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-md);
  position: relative;
  flex: 1;
  min-width: 0;
  transition: transform 0.3s, box-shadow 0.3s;
}

.animal-card--left {
  animation: slideInLeft 0.5s ease-out;
}

.animal-card--right {
  animation: slideInRight 0.5s ease-out;
}

.animal-card--winner {
  border: 3px solid var(--winner-gold);
  box-shadow: 0 0 24px rgba(255, 215, 0, 0.3), var(--shadow-lg);
}

.animal-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.animal-card__crown {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.2rem;
  animation: bounceIn 0.6s ease-out;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.animal-card__image-wrap {
  width: 160px;
  height: 160px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f0f0f0;
  background: #fafafa;
}

.animal-card--winner .animal-card__image-wrap {
  border-color: var(--winner-gold);
}

.animal-card--left .animal-card__image-wrap {
  border-color: var(--team-left-light);
}

.animal-card--right .animal-card__image-wrap {
  border-color: var(--team-right-light);
}

.animal-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animal-card__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.animal-card--left .animal-card__fallback {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05));
}

.animal-card--right .animal-card__fallback {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(78, 205, 196, 0.05));
}

.animal-card__fallback-emoji {
  font-size: 2rem;
}

.animal-card__fallback-letter {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-light);
}

.animal-card__name {
  font-size: 1.4rem;
  margin-bottom: 12px;
  text-transform: capitalize;
}

.animal-card--left .animal-card__name {
  color: var(--team-left);
}

.animal-card--right .animal-card__name {
  color: var(--team-right);
}

.animal-card__facts {
  text-align: left;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}

.animal-card__facts-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.animal-card__facts-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.animal-card__facts-list li {
  font-size: 0.85rem;
  color: var(--text-secondary);
  padding-left: 20px;
  position: relative;
  line-height: 1.4;
}

.animal-card__facts-list li::before {
  content: '⭐';
  position: absolute;
  left: 0;
  font-size: 0.7rem;
}

@media (max-width: 600px) {
  .animal-card__image-wrap {
    width: 120px;
    height: 120px;
  }
}
</style>
