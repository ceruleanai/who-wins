<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value1: { type: Number, required: true },
  value2: { type: Number, required: true },
  delay: { type: Number, default: 0 },
})

const animated = ref(false)

onMounted(() => {
  setTimeout(() => {
    animated.value = true
  }, props.delay + 100)
})
</script>

<template>
  <div class="stat-bar">
    <div class="stat-bar__row">
      <!-- Left bar (animal 1) -->
      <div class="stat-bar__track stat-bar__track--left">
        <div
          class="stat-bar__fill stat-bar__fill--left"
          :class="{ 'stat-bar__fill--winner': value1 > value2 }"
          :style="{ width: animated ? `${value1 * 10}%` : '0%' }"
        >
          <span class="stat-bar__value">{{ value1 }}</span>
        </div>
      </div>

      <!-- Label -->
      <div class="stat-bar__label">{{ label }}</div>

      <!-- Right bar (animal 2) -->
      <div class="stat-bar__track stat-bar__track--right">
        <div
          class="stat-bar__fill stat-bar__fill--right"
          :class="{ 'stat-bar__fill--winner': value2 > value1 }"
          :style="{ width: animated ? `${value2 * 10}%` : '0%' }"
        >
          <span class="stat-bar__value">{{ value2 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-bar {
  margin-bottom: 10px;
}

.stat-bar__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-bar__label {
  flex-shrink: 0;
  width: 100px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}

.stat-bar__track {
  flex: 1;
  height: 28px;
  background: #f0f0f0;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
}

.stat-bar__track--left {
  direction: rtl;
}

.stat-bar__fill {
  height: 100%;
  border-radius: 14px;
  transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  min-width: 0;
  position: relative;
}

.stat-bar__fill--left {
  background: linear-gradient(90deg, var(--team-left-light), var(--team-left));
  justify-content: flex-start;
  padding-left: 10px;
  direction: ltr;
}

.stat-bar__fill--right {
  background: linear-gradient(90deg, var(--team-right), var(--team-right-light));
  justify-content: flex-end;
  padding-right: 10px;
}

.stat-bar__fill--winner {
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.4);
}

.stat-bar__value {
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

@media (max-width: 600px) {
  .stat-bar__label {
    width: 70px;
    font-size: 0.7rem;
  }

  .stat-bar__track {
    height: 22px;
  }
}
</style>
