<script setup>
import { ref, computed } from 'vue'
import AnimalInput from './AnimalInput.vue'
import AnimalCard from './AnimalCard.vue'
import StatsComparison from './StatsComparison.vue'
import WinnerAnnouncement from './WinnerAnnouncement.vue'
import LoadingBattle from './LoadingBattle.vue'
import { fetchBattleResult } from '../services/gemini.js'
import { fetchAnimalImage } from '../services/wikipedia.js'
import { useAuth } from '../composables/useAuth.js'
import { useFights } from '../composables/useFights.js'

const { user } = useAuth()
const { saveFight } = useFights()

const animal1 = ref('')
const animal2 = ref('')
const result = ref(null)
const loading = ref(false)
const error = ref(null)
const animal1Image = ref(null)
const animal2Image = ref(null)
const saveStatus = ref(null) // 'saving' | 'saved' | 'error' | null

const canFight = computed(() => {
  return animal1.value.trim() && animal2.value.trim() && !loading.value
})

async function fight() {
  if (!canFight.value) return

  loading.value = true
  error.value = null
  result.value = null
  animal1Image.value = null
  animal2Image.value = null

  const name1 = animal1.value.trim()
  const name2 = animal2.value.trim()

  try {
    const [battleResult, img1, img2] = await Promise.allSettled([
      fetchBattleResult(name1, name2),
      fetchAnimalImage(name1),
      fetchAnimalImage(name2),
    ])

    if (battleResult.status === 'rejected') {
      throw battleResult.reason
    }

    result.value = battleResult.value
    animal1Image.value = img1.status === 'fulfilled' ? img1.value : null
    animal2Image.value = img2.status === 'fulfilled' ? img2.value : null

    // Auto-save if user is signed in
    if (user.value && result.value) {
      saveStatus.value = 'saving'
      try {
        await saveFight(result.value, animal1Image.value, animal2Image.value)
        saveStatus.value = 'saved'
      } catch {
        saveStatus.value = 'error'
      }
    }
  } catch (err) {
    error.value = err.message || 'Something went wrong. Please try again!'
  } finally {
    loading.value = false
  }
}

function newBattle() {
  animal1.value = ''
  animal2.value = ''
  result.value = null
  error.value = null
  animal1Image.value = null
  animal2Image.value = null
  saveStatus.value = null
}

function handleKeydown(e) {
  if (e.key === 'Enter' && canFight.value) {
    fight()
  }
}
</script>

<template>
  <div class="arena">
    <!-- Input section -->
    <div class="arena__inputs" @keydown="handleKeydown">
      <AnimalInput
        v-model="animal1"
        side="left"
        :disabled="loading"
      />

      <div class="arena__vs">
        <span>VS</span>
      </div>

      <AnimalInput
        v-model="animal2"
        side="right"
        :disabled="loading"
      />
    </div>

    <!-- Fight button -->
    <div class="arena__action">
      <button
        class="arena__fight-btn"
        :class="{ 'arena__fight-btn--ready': canFight }"
        :disabled="!canFight"
        @click="fight"
      >
        FIGHT!
      </button>
    </div>

    <!-- Error -->
    <div v-if="error" class="arena__error">
      <div class="arena__error-card">
        <span class="arena__error-icon">😿</span>
        <p class="arena__error-title">Oops! Something went wrong.</p>
        <p class="arena__error-message">{{ error }}</p>
        <button class="arena__error-retry" @click="fight">Try Again</button>
      </div>
    </div>

    <!-- Loading -->
    <LoadingBattle
      v-if="loading"
      :animal1="animal1"
      :animal2="animal2"
    />

    <!-- Results -->
    <template v-if="result && !loading">
      <!-- Animal cards -->
      <div class="arena__cards">
        <AnimalCard
          :name="result.animal1.name"
          :image-url="animal1Image"
          :fun-facts="result.animal1.funFacts"
          :is-winner="!result.isDraw && result.winner?.toLowerCase() === result.animal1.name?.toLowerCase()"
          side="left"
        />
        <AnimalCard
          :name="result.animal2.name"
          :image-url="animal2Image"
          :fun-facts="result.animal2.funFacts"
          :is-winner="!result.isDraw && result.winner?.toLowerCase() === result.animal2.name?.toLowerCase()"
          side="right"
        />
      </div>

      <!-- Stats comparison -->
      <StatsComparison
        :stats1="result.animal1.stats"
        :stats2="result.animal2.stats"
        :special-ability1-name="result.animal1.specialAbilityName"
        :special-ability2-name="result.animal2.specialAbilityName"
        :name1="result.animal1.name"
        :name2="result.animal2.name"
      />

      <!-- Winner announcement -->
      <WinnerAnnouncement
        :winner-name="result.winner"
        :explanation="result.explanation"
        :is-draw="result.isDraw"
      />

      <!-- Save status -->
      <div class="arena__save-status">
        <span v-if="saveStatus === 'saving'" class="arena__save-text">Saving to your history...</span>
        <span v-else-if="saveStatus === 'saved'" class="arena__save-text arena__save-text--success">Saved to your history!</span>
        <span v-else-if="saveStatus === 'error'" class="arena__save-text arena__save-text--error">Couldn't save — try again later</span>
        <router-link v-else-if="!user" to="/auth" class="arena__save-text arena__save-text--prompt">Sign in to save your battles</router-link>
      </div>

      <!-- New battle button -->
      <div class="arena__action">
        <button class="arena__new-btn" @click="newBattle">
          New Battle!
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.arena {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
}

/* Inputs */
.arena__inputs {
  display: flex;
  align-items: center;
  gap: 16px;
}

.arena__vs {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--fight-button);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-md);
  animation: pulse 2s ease-in-out infinite;
}

/* Fight button */
.arena__action {
  text-align: center;
}

.arena__fight-btn {
  padding: 14px 48px;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 2px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--fight-button), var(--fight-button-hover));
  color: white;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;
  opacity: 0.5;
}

.arena__fight-btn--ready {
  opacity: 1;
  animation: pulse 2s ease-in-out infinite;
}

.arena__fight-btn--ready:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(230, 57, 70, 0.4);
}

.arena__fight-btn:disabled {
  cursor: not-allowed;
  animation: none;
}

.arena__fight-btn:active:not(:disabled) {
  transform: scale(0.95);
}

/* Error */
.arena__error-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 32px 24px;
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 2px solid #fecaca;
  animation: shake 0.5s ease-out;
}

.arena__error-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 12px;
}

.arena__error-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--fight-button);
  margin-bottom: 8px;
}

.arena__error-message {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  word-break: break-word;
}

.arena__error-retry {
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background: var(--fight-button);
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.arena__error-retry:hover {
  transform: scale(1.05);
}

/* Animal cards */
.arena__cards {
  display: flex;
  gap: 20px;
}

/* New battle button */
.arena__new-btn {
  padding: 12px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border: 3px solid white;
  border-radius: 50px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.arena__new-btn:hover {
  background: white;
  color: var(--text-primary);
  transform: scale(1.05);
}

/* Save status */
.arena__save-status {
  text-align: center;
}

.arena__save-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.arena__save-text--success {
  color: #a7f3d0;
}

.arena__save-text--error {
  color: #fecaca;
}

.arena__save-text--prompt {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.arena__save-text--prompt:hover {
  color: white;
}

/* Responsive */
@media (max-width: 600px) {
  .arena__inputs {
    flex-direction: column;
    gap: 12px;
  }

  .arena__vs {
    width: 40px;
    height: 40px;
    font-size: 0.8rem;
  }

  .arena__cards {
    flex-direction: column;
  }

  .arena__fight-btn {
    padding: 12px 36px;
    font-size: 1.2rem;
  }
}
</style>
