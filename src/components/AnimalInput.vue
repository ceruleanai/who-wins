<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  side: { type: String, default: 'left' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="animal-input" :class="[`animal-input--${side}`]">
    <div class="animal-input__icon">🐾</div>
    <input
      type="text"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :placeholder="side === 'left' ? 'First animal...' : 'Second animal...'"
      :disabled="disabled"
      class="animal-input__field"
      maxlength="40"
    />
  </div>
</template>

<style scoped>
.animal-input {
  position: relative;
  flex: 1;
  min-width: 0;
}

.animal-input__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
  pointer-events: none;
}

.animal-input__field {
  width: 100%;
  padding: 16px 20px 16px 52px;
  font-size: 1.2rem;
  font-weight: 500;
  border: 3px solid transparent;
  border-radius: var(--radius);
  background: var(--card-bg);
  color: var(--text-primary);
  box-shadow: var(--shadow-md);
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.animal-input__field::placeholder {
  color: var(--text-light);
  font-weight: 400;
}

.animal-input--left .animal-input__field:focus {
  border-color: var(--team-left);
  box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.2);
}

.animal-input--right .animal-input__field:focus {
  border-color: var(--team-right);
  box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.2);
}

.animal-input__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
