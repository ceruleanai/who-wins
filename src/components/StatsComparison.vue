<script setup>
import StatBar from './StatBar.vue'

const props = defineProps({
  stats1: { type: Object, required: true },
  stats2: { type: Object, required: true },
  specialAbility1Name: { type: String, default: 'Special' },
  specialAbility2Name: { type: String, default: 'Special' },
  name1: { type: String, default: '' },
  name2: { type: String, default: '' },
})

const statLabels = [
  { key: 'strength', label: 'Strength' },
  { key: 'speed', label: 'Speed' },
  { key: 'size', label: 'Size' },
  { key: 'defense', label: 'Defense' },
  { key: 'specialAbility', label: 'Special' },
]
</script>

<template>
  <div class="stats-comparison">
    <div class="stats-comparison__header">
      <span class="stats-comparison__name stats-comparison__name--left">{{ name1 }}</span>
      <h3 class="stats-comparison__title">Stats</h3>
      <span class="stats-comparison__name stats-comparison__name--right">{{ name2 }}</span>
    </div>

    <div class="stats-comparison__bars">
      <StatBar
        v-for="(stat, index) in statLabels"
        :key="stat.key"
        :label="stat.key === 'specialAbility' ? 'Special' : stat.label"
        :value1="stats1[stat.key] || 0"
        :value2="stats2[stat.key] || 0"
        :delay="index * 150"
      />
    </div>

    <div class="stats-comparison__abilities">
      <div class="stats-comparison__ability stats-comparison__ability--left">
        {{ specialAbility1Name }}
      </div>
      <div class="stats-comparison__ability-label">Special Ability</div>
      <div class="stats-comparison__ability stats-comparison__ability--right">
        {{ specialAbility2Name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-comparison {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow-md);
  animation: slideUp 0.6s ease-out;
}

.stats-comparison__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stats-comparison__title {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.stats-comparison__name {
  font-size: 0.9rem;
  font-weight: 600;
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.stats-comparison__name--left {
  color: var(--team-left);
}

.stats-comparison__name--right {
  color: var(--team-right);
}

.stats-comparison__bars {
  margin-bottom: 16px;
}

.stats-comparison__abilities {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 12px;
  border-top: 2px dashed #eee;
}

.stats-comparison__ability-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-light);
  flex-shrink: 0;
}

.stats-comparison__ability {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  max-width: 140px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.stats-comparison__ability--left {
  background: rgba(255, 107, 53, 0.1);
  color: var(--team-left);
}

.stats-comparison__ability--right {
  background: rgba(78, 205, 196, 0.1);
  color: var(--team-right);
}
</style>
