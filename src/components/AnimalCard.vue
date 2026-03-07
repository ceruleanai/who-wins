<script setup>
defineProps({
  name: { type: String, required: true },
  imageUrl: { type: String, default: null },
  funFacts: { type: Array, default: () => [] },
  extra: { type: Object, default: null },
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

    <!-- Scientific name -->
    <p v-if="extra" class="animal-card__scientific">
      <em>{{ extra.scientificName }}</em>
      <span v-if="extra.taxonomy" class="animal-card__taxonomy">{{ extra.taxonomy }}</span>
    </p>

    <!-- Battle cry -->
    <div v-if="extra?.battleCry" class="animal-card__battle-cry" :class="`animal-card__battle-cry--${side}`">
      <span class="animal-card__battle-cry-text">"{{ extra.battleCry }}"</span>
    </div>

    <!-- Quick info grid -->
    <div v-if="extra" class="animal-card__info-grid">
      <div class="animal-card__info-item">
        <span class="animal-card__info-emoji">{{ extra.habitatEmoji }}</span>
        <span class="animal-card__info-label">Habitat</span>
        <span class="animal-card__info-value">{{ extra.habitat }}</span>
      </div>
      <div class="animal-card__info-item">
        <span class="animal-card__info-emoji">{{ extra.dietEmoji }}</span>
        <span class="animal-card__info-label">Diet</span>
        <span class="animal-card__info-value">{{ extra.diet }}</span>
      </div>
      <div class="animal-card__info-item">
        <span class="animal-card__info-emoji">📏</span>
        <span class="animal-card__info-label">Size</span>
        <span class="animal-card__info-value">{{ extra.sizeComparison }}</span>
      </div>
      <div class="animal-card__info-item">
        <span class="animal-card__info-emoji">{{ extra.conservationEmoji }}</span>
        <span class="animal-card__info-label">Status</span>
        <span class="animal-card__info-value">{{ extra.conservationStatus }}</span>
      </div>
    </div>

    <!-- Superpower badge -->
    <div v-if="extra?.superpower" class="animal-card__superpower">
      <span class="animal-card__superpower-icon">⚡</span>
      <span class="animal-card__superpower-text">{{ extra.superpower }}</span>
    </div>

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
  margin-bottom: 4px;
  text-transform: capitalize;
}

.animal-card--left .animal-card__name {
  color: var(--team-left);
}

.animal-card--right .animal-card__name {
  color: var(--team-right);
}

/* Scientific name */
.animal-card__scientific {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 12px;
}

.animal-card__taxonomy {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 8px;
  font-size: 0.7rem;
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f1f5f9;
  color: var(--text-secondary);
  border-radius: 50px;
  vertical-align: middle;
}

/* Battle cry */
.animal-card__battle-cry {
  margin-bottom: 14px;
  padding: 10px 14px;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
  border-left: 4px solid #ccc;
  text-align: left;
}

.animal-card__battle-cry--left {
  border-left-color: var(--team-left);
}

.animal-card__battle-cry--right {
  border-left-color: var(--team-right);
}

.animal-card__battle-cry-text {
  font-size: 0.85rem;
  font-weight: 600;
  font-style: italic;
  color: var(--text-secondary);
}

/* Quick info grid */
.animal-card__info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}

.animal-card__info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 6px;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
}

.animal-card__info-emoji {
  font-size: 1.1rem;
}

.animal-card__info-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-light);
}

.animal-card__info-value {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.3;
  text-align: center;
}

/* Superpower badge */
.animal-card__superpower {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 14px;
  padding: 10px 14px;
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border-radius: var(--radius-sm);
  border: 1px solid #a7f3d0;
  text-align: left;
}

.animal-card__superpower-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.animal-card__superpower-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #065f46;
  line-height: 1.4;
}

/* Fun facts */
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
