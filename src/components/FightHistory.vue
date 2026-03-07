<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useFights } from '../composables/useFights.js'

const { user } = useAuth()
const { fetchFights, deleteFight } = useFights()

const fights = ref([])
const loading = ref(true)

onMounted(async () => {
  if (user.value) {
    fights.value = await fetchFights()
  }
  loading.value = false
})

async function handleDelete(id) {
  const success = await deleteFight(id)
  if (success) {
    fights.value = fights.value.filter(f => f.id !== id)
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="history">
    <!-- Not signed in -->
    <div v-if="!user" class="history__card history__card--empty">
      <span class="history__icon">🔒</span>
      <h2 class="history__title">Sign in to see your fights</h2>
      <p class="history__subtitle">Create an account to save and revisit your epic animal battles!</p>
      <router-link to="/auth" class="history__cta">Sign In</router-link>
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="history__card history__card--empty">
      <span class="history__icon">🐾</span>
      <p class="history__subtitle">Loading your fights...</p>
    </div>

    <!-- Empty -->
    <div v-else-if="fights.length === 0" class="history__card history__card--empty">
      <span class="history__icon">🏟️</span>
      <h2 class="history__title">No fights yet!</h2>
      <p class="history__subtitle">Go start an epic animal battle and it'll show up here.</p>
      <router-link to="/" class="history__cta">Start a Fight</router-link>
    </div>

    <!-- Fight list -->
    <template v-else>
      <h2 class="history__heading">My Fights</h2>
      <div class="history__list">
        <div v-for="fight in fights" :key="fight.id" class="history__fight">
          <div class="history__fight-animals">
            <div class="history__animal">
              <img
                v-if="fight.animal1_image_url"
                :src="fight.animal1_image_url"
                :alt="fight.animal1_name"
                class="history__animal-img"
              />
              <div v-else class="history__animal-img history__animal-img--placeholder">🐾</div>
              <span class="history__animal-name" :class="{ 'history__animal-name--winner': !fight.is_draw && fight.winner?.toLowerCase() === fight.animal1_name?.toLowerCase() }">
                {{ fight.animal1_name }}
              </span>
            </div>

            <span class="history__vs">VS</span>

            <div class="history__animal">
              <img
                v-if="fight.animal2_image_url"
                :src="fight.animal2_image_url"
                :alt="fight.animal2_name"
                class="history__animal-img"
              />
              <div v-else class="history__animal-img history__animal-img--placeholder">🐾</div>
              <span class="history__animal-name" :class="{ 'history__animal-name--winner': !fight.is_draw && fight.winner?.toLowerCase() === fight.animal2_name?.toLowerCase() }">
                {{ fight.animal2_name }}
              </span>
            </div>
          </div>

          <div class="history__fight-result">
            <span v-if="fight.is_draw" class="history__badge history__badge--draw">Draw</span>
            <span v-else class="history__badge history__badge--winner">{{ fight.winner }} wins!</span>
          </div>

          <p class="history__fight-explanation">{{ fight.explanation }}</p>

          <div class="history__fight-footer">
            <span class="history__fight-date">{{ formatDate(fight.created_at) }}</span>
            <button class="history__fight-delete" @click="handleDelete(fight.id)" title="Delete this fight">
              ✕
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.history {
  padding: 20px 0;
  max-width: 700px;
  margin: 0 auto;
}

.history__heading {
  color: white;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.history__card--empty {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 48px 32px;
  text-align: center;
  box-shadow: var(--shadow-md);
  animation: slideUp 0.5s ease-out;
}

.history__icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}

.history__title {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.history__subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.history__cta {
  display: inline-block;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.history__cta:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

/* Fight list */
.history__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.history__fight {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 20px 24px;
  box-shadow: var(--shadow-sm);
  animation: slideUp 0.4s ease-out;
}

.history__fight-animals {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.history__animal {
  display: flex;
  align-items: center;
  gap: 10px;
}

.history__animal-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.history__animal-img--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  font-size: 1.2rem;
}

.history__animal-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary);
}

.history__animal-name--winner {
  color: var(--winner-gold);
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}

.history__vs {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--fight-button);
  flex-shrink: 0;
}

.history__fight-result {
  text-align: center;
  margin-bottom: 8px;
}

.history__badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
}

.history__badge--winner {
  background: linear-gradient(135deg, #ffd700, #ffb700);
  color: #5a4800;
}

.history__badge--draw {
  background: #e2e8f0;
  color: var(--text-secondary);
}

.history__fight-explanation {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  text-align: center;
  margin-bottom: 12px;
}

.history__fight-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history__fight-date {
  font-size: 0.75rem;
  color: var(--text-light);
}

.history__fight-delete {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.history__fight-delete:hover {
  color: var(--fight-button);
  background: rgba(230, 57, 70, 0.1);
}

@media (max-width: 600px) {
  .history__fight-animals {
    gap: 10px;
  }

  .history__animal-img {
    width: 36px;
    height: 36px;
  }

  .history__animal-name {
    font-size: 0.9rem;
  }
}
</style>
