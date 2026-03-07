<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { useRouter } from 'vue-router'

const { signUp, signIn } = useAuth()
const router = useRouter()

const isSignUp = ref(false)
const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const successMessage = ref(null)

async function handleSubmit() {
  error.value = null
  successMessage.value = null
  loading.value = true

  try {
    if (isSignUp.value) {
      const data = await signUp(email.value, password.value)
      if (data.user && !data.session) {
        successMessage.value = 'Check your email to confirm your account!'
      } else {
        router.push('/')
      }
    } else {
      await signIn(email.value, password.value)
      router.push('/')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function toggleMode() {
  isSignUp.value = !isSignUp.value
  error.value = null
  successMessage.value = null
}

function scrollToAuth() {
  document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="landing">
    <!-- Floating background emojis -->
    <div class="landing__floaters" aria-hidden="true">
      <span class="landing__floater" style="top: 8%; left: 6%; animation-delay: 0s;">🦁</span>
      <span class="landing__floater" style="top: 20%; right: 8%; animation-delay: 0.8s;">🐺</span>
      <span class="landing__floater" style="top: 45%; left: 3%; animation-delay: 1.6s;">🦈</span>
      <span class="landing__floater" style="top: 55%; right: 5%; animation-delay: 2.4s;">🦅</span>
      <span class="landing__floater" style="top: 75%; left: 10%; animation-delay: 3.2s;">🐊</span>
      <span class="landing__floater" style="top: 85%; right: 12%; animation-delay: 4s;">🐘</span>
    </div>

    <!-- ==================== SECTION 1: Hero ==================== -->
    <section class="landing__hero">
      <h1 class="landing__title">WHO WINS?</h1>
      <p class="landing__tagline">Pick any two animals. AI decides who wins the ultimate showdown!</p>
      <p class="landing__sub-tagline">Stats, fun facts, superpowers, battle cries &amp; more</p>

      <!-- Mock matchup -->
      <div class="landing__matchup">
        <span class="landing__matchup-pill landing__matchup-pill--left">🐅 Tiger</span>
        <span class="landing__matchup-vs">VS</span>
        <span class="landing__matchup-pill landing__matchup-pill--right">🐻 Bear</span>
      </div>

      <button class="landing__cta" @click="scrollToAuth">
        Start Battling
      </button>
    </section>

    <!-- ==================== SECTION 2: How It Works ==================== -->
    <section class="landing__how">
      <h2 class="landing__section-title">How It Works</h2>
      <div class="landing__steps">
        <div class="landing__step">
          <div class="landing__step-badge">1</div>
          <div class="landing__step-icon">🐾</div>
          <h3 class="landing__step-title">Pick Two Animals</h3>
          <p class="landing__step-desc">Choose any two creatures for an epic battle</p>
        </div>

        <div class="landing__step-arrow" aria-hidden="true">→</div>

        <div class="landing__step">
          <div class="landing__step-badge">2</div>
          <div class="landing__step-icon">⚔️</div>
          <h3 class="landing__step-title">Watch Them Battle</h3>
          <p class="landing__step-desc">AI analyzes their strengths, weaknesses &amp; abilities</p>
        </div>

        <div class="landing__step-arrow" aria-hidden="true">→</div>

        <div class="landing__step">
          <div class="landing__step-badge">3</div>
          <div class="landing__step-icon">🏆</div>
          <h3 class="landing__step-title">See Who Wins!</h3>
          <p class="landing__step-desc">Get detailed stats, fun facts &amp; a definitive winner</p>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 3: Feature Showcase ==================== -->
    <section class="landing__features">
      <h2 class="landing__section-title">Every Battle Is Packed With Detail</h2>
      <div class="landing__features-grid">
        <!-- Left: Mock AnimalCard -->
        <div class="landing__mock-card">
          <!-- Image fallback -->
          <div class="landing__mock-card-image">
            <span class="landing__mock-card-emoji">🐾</span>
            <span class="landing__mock-card-letter">L</span>
          </div>

          <!-- Name -->
          <h3 class="landing__mock-card-name">Lion</h3>

          <!-- Scientific name + taxonomy -->
          <p class="landing__mock-card-scientific">
            <em>Panthera leo</em>
            <span class="landing__mock-card-taxonomy">MAMMAL</span>
          </p>

          <!-- Battle cry -->
          <div class="landing__mock-card-cry">
            <span class="landing__mock-card-cry-text">"I am the king of the savanna — bow before my roar!"</span>
          </div>

          <!-- Info grid -->
          <div class="landing__mock-card-info">
            <div class="landing__mock-card-info-item">
              <span class="landing__mock-card-info-emoji">🌍</span>
              <span class="landing__mock-card-info-label">Habitat</span>
              <span class="landing__mock-card-info-value">African Savanna</span>
            </div>
            <div class="landing__mock-card-info-item">
              <span class="landing__mock-card-info-emoji">🥩</span>
              <span class="landing__mock-card-info-label">Diet</span>
              <span class="landing__mock-card-info-value">Carnivore</span>
            </div>
            <div class="landing__mock-card-info-item">
              <span class="landing__mock-card-info-emoji">📏</span>
              <span class="landing__mock-card-info-label">Size</span>
              <span class="landing__mock-card-info-value">Up to 420 lbs</span>
            </div>
            <div class="landing__mock-card-info-item">
              <span class="landing__mock-card-info-emoji">⚠️</span>
              <span class="landing__mock-card-info-label">Status</span>
              <span class="landing__mock-card-info-value">Vulnerable</span>
            </div>
          </div>

          <!-- Superpower -->
          <div class="landing__mock-card-superpower">
            <span class="landing__mock-card-superpower-icon">⚡</span>
            <span class="landing__mock-card-superpower-text">Thunderous roar heard 5 miles away, paralyzing prey with fear</span>
          </div>

          <!-- Fun facts -->
          <div class="landing__mock-card-facts">
            <h4 class="landing__mock-card-facts-title">Fun Facts</h4>
            <ul class="landing__mock-card-facts-list">
              <li>Lions are the only cats that live in groups (prides)</li>
              <li>A lion's roar can be heard from 5 miles away</li>
            </ul>
          </div>
        </div>

        <!-- Right: Feature list -->
        <div class="landing__feature-list">
          <div class="landing__feature-item">
            <span class="landing__feature-icon">📊</span>
            <div>
              <h4 class="landing__feature-title">Battle Stats</h4>
              <p class="landing__feature-desc">Detailed strength, speed, and ability comparisons</p>
            </div>
          </div>
          <div class="landing__feature-item">
            <span class="landing__feature-icon">🧬</span>
            <div>
              <h4 class="landing__feature-title">Real Science</h4>
              <p class="landing__feature-desc">Scientific names, taxonomy, and conservation status</p>
            </div>
          </div>
          <div class="landing__feature-item">
            <span class="landing__feature-icon">⚡</span>
            <div>
              <h4 class="landing__feature-title">Superpowers</h4>
              <p class="landing__feature-desc">Every animal gets a unique, AI-generated superpower</p>
            </div>
          </div>
          <div class="landing__feature-item">
            <span class="landing__feature-icon">🎤</span>
            <div>
              <h4 class="landing__feature-title">Battle Cries</h4>
              <p class="landing__feature-desc">Hilarious personalized trash talk for each creature</p>
            </div>
          </div>
          <div class="landing__feature-item">
            <span class="landing__feature-icon">⭐</span>
            <div>
              <h4 class="landing__feature-title">Fun Facts</h4>
              <p class="landing__feature-desc">Learn real animal trivia with every fight</p>
            </div>
          </div>
          <div class="landing__feature-item">
            <span class="landing__feature-icon">📖</span>
            <div>
              <h4 class="landing__feature-title">Fight History</h4>
              <p class="landing__feature-desc">Track every matchup and revisit past battles</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 4: Auth Form ==================== -->
    <section id="auth-section" class="landing__auth">
      <div class="landing__auth-card">
        <div class="landing__auth-icon">{{ isSignUp ? '🦁' : '🐾' }}</div>
        <h2 class="landing__auth-title">{{ isSignUp ? 'Create Account' : 'Welcome Back!' }}</h2>
        <p class="landing__auth-subtitle">{{ isSignUp ? 'Join the animal kingdom' : 'Sign in to see your fight history' }}</p>

        <div v-if="successMessage" class="landing__auth-success">
          {{ successMessage }}
        </div>

        <div v-if="error" class="landing__auth-error">
          {{ error }}
        </div>

        <form class="landing__auth-form" @submit.prevent="handleSubmit">
          <div class="landing__auth-field">
            <label class="landing__auth-label" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="landing__auth-input"
              placeholder="tiger@jungle.com"
              required
              :disabled="loading"
            />
          </div>

          <div class="landing__auth-field">
            <label class="landing__auth-label" for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="landing__auth-input"
              placeholder="At least 6 characters"
              required
              minlength="6"
              :disabled="loading"
            />
          </div>

          <button
            type="submit"
            class="landing__auth-submit"
            :disabled="loading"
          >
            {{ loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In') }}
          </button>
        </form>

        <p class="landing__auth-toggle">
          {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
          <button class="landing__auth-toggle-btn" @click="toggleMode" :disabled="loading">
            {{ isSignUp ? 'Sign In' : 'Sign Up' }}
          </button>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Landing container ===== */
.landing {
  position: relative;
  overflow: hidden;
}

/* ===== Floating emojis ===== */
.landing__floaters {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.landing__floater {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.3;
  animation: float 4s ease-in-out infinite;
}

/* ===== Section shared ===== */
.landing__hero,
.landing__how,
.landing__features,
.landing__auth {
  position: relative;
  z-index: 1;
}

.landing__section-title {
  text-align: center;
  font-size: 2rem;
  color: white;
  margin-bottom: 40px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.5s ease-out;
}

/* ================================================================
   SECTION 1 — Hero
   ================================================================ */
.landing__hero {
  text-align: center;
  padding: 60px 20px 40px;
}

.landing__title {
  font-size: 3.5rem;
  color: white;
  letter-spacing: 4px;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  animation: bounceIn 0.8s ease-out;
  margin-bottom: 12px;
}

.landing__tagline {
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.92);
  max-width: 520px;
  margin: 0 auto 8px;
  animation: slideUp 0.5s ease-out 0.2s both;
}

.landing__sub-tagline {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  animation: slideUp 0.5s ease-out 0.35s both;
}

/* Mock matchup */
.landing__matchup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 36px;
  animation: slideUp 0.5s ease-out 0.5s both;
}

.landing__matchup-pill {
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
}

.landing__matchup-pill--left {
  background: var(--team-left);
}

.landing__matchup-pill--right {
  background: var(--team-right);
}

.landing__matchup-vs {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  background: var(--fight-button);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

/* CTA */
.landing__cta {
  display: inline-block;
  padding: 16px 48px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  background: var(--fight-button);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(230, 57, 70, 0.4);
  animation: slideUp 0.5s ease-out 0.65s both;
}

.landing__cta:hover {
  background: var(--fight-button-hover);
  transform: scale(1.05);
  box-shadow: 0 6px 28px rgba(230, 57, 70, 0.5);
}

/* ================================================================
   SECTION 2 — How It Works
   ================================================================ */
.landing__how {
  padding: 50px 20px 60px;
}

.landing__steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.landing__step {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 28px 20px;
  text-align: center;
  flex: 1;
  max-width: 220px;
  box-shadow: var(--shadow-md);
  position: relative;
  animation: slideUp 0.5s ease-out;
}

.landing__step-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing__step-icon {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.landing__step-title {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.landing__step-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.landing__step-arrow {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 50px;
  flex-shrink: 0;
}

/* ================================================================
   SECTION 3 — Feature Showcase
   ================================================================ */
.landing__features {
  padding: 50px 20px 60px;
}

.landing__features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 860px;
  margin: 0 auto;
  align-items: start;
}

/* --- Mock AnimalCard (left column) --- */
.landing__mock-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-md);
  animation: slideInLeft 0.5s ease-out;
}

.landing__mock-card-image {
  width: 140px;
  height: 140px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--team-left-light);
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.landing__mock-card-emoji {
  font-size: 2rem;
}

.landing__mock-card-letter {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-light);
}

.landing__mock-card-name {
  font-size: 1.4rem;
  color: var(--team-left);
  margin-bottom: 4px;
}

.landing__mock-card-scientific {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 12px;
}

.landing__mock-card-taxonomy {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f1f5f9;
  color: var(--text-secondary);
  border-radius: 50px;
  vertical-align: middle;
}

.landing__mock-card-cry {
  margin-bottom: 14px;
  padding: 10px 14px;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--team-left);
  text-align: left;
}

.landing__mock-card-cry-text {
  font-size: 0.95rem;
  font-weight: 600;
  font-style: italic;
  color: var(--text-secondary);
}

.landing__mock-card-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}

.landing__mock-card-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 6px;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
}

.landing__mock-card-info-emoji {
  font-size: 1.1rem;
}

.landing__mock-card-info-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-light);
}

.landing__mock-card-info-value {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.3;
  text-align: center;
}

.landing__mock-card-superpower {
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

.landing__mock-card-superpower-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.landing__mock-card-superpower-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #065f46;
  line-height: 1.4;
}

.landing__mock-card-facts {
  text-align: left;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}

.landing__mock-card-facts-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.landing__mock-card-facts-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.landing__mock-card-facts-list li {
  font-size: 0.95rem;
  color: var(--text-secondary);
  padding-left: 20px;
  position: relative;
  line-height: 1.4;
}

.landing__mock-card-facts-list li::before {
  content: '\2B50';
  position: absolute;
  left: 0;
  font-size: 0.7rem;
}

/* --- Feature list (right column) --- */
.landing__feature-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: slideInRight 0.5s ease-out;
}

.landing__feature-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-sm);
  padding: 16px;
  transition: transform 0.2s, background 0.2s;
}

.landing__feature-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.18);
}

.landing__feature-icon {
  font-size: 1.6rem;
  flex-shrink: 0;
}

.landing__feature-title {
  font-size: 1.1rem;
  color: white;
  margin-bottom: 2px;
}

.landing__feature-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

/* ================================================================
   SECTION 4 — Auth Form
   ================================================================ */
.landing__auth {
  display: flex;
  justify-content: center;
  padding: 40px 20px 60px;
}

.landing__auth-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 40px 32px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: slideUp 0.5s ease-out;
}

.landing__auth-icon {
  font-size: 3rem;
  margin-bottom: 8px;
}

.landing__auth-title {
  font-size: 1.6rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.landing__auth-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.landing__auth-success {
  background: #d4edda;
  color: #155724;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  margin-bottom: 16px;
}

.landing__auth-error {
  background: #fecaca;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  margin-bottom: 16px;
}

.landing__auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.landing__auth-field {
  text-align: left;
}

.landing__auth-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.landing__auth-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.2s;
}

.landing__auth-input:focus {
  border-color: var(--bg-start);
}

.landing__auth-input:disabled {
  opacity: 0.6;
}

.landing__auth-submit {
  padding: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 8px;
}

.landing__auth-submit:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: var(--shadow-md);
}

.landing__auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.landing__auth-toggle {
  margin-top: 20px;
  font-size: 1rem;
  color: var(--text-secondary);
}

.landing__auth-toggle-btn {
  background: none;
  border: none;
  color: var(--bg-start);
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
}

.landing__auth-toggle-btn:hover {
  text-decoration: underline;
}

/* ================================================================
   Responsive — Mobile (600px)
   ================================================================ */
@media (max-width: 600px) {
  /* Hide floating emojis on mobile */
  .landing__floaters {
    display: none;
  }

  /* Hero */
  .landing__title {
    font-size: 2.4rem;
    letter-spacing: 2px;
  }

  .landing__tagline {
    font-size: 1.15rem;
  }

  .landing__matchup {
    gap: 10px;
  }

  .landing__matchup-pill {
    padding: 8px 16px;
    font-size: 0.95rem;
  }

  .landing__matchup-vs {
    width: 38px;
    height: 38px;
    font-size: 0.75rem;
  }

  .landing__cta {
    padding: 14px 36px;
    font-size: 1.05rem;
  }

  /* How It Works — vertical stack */
  .landing__steps {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .landing__step {
    max-width: 300px;
    width: 100%;
  }

  .landing__step-arrow {
    transform: rotate(90deg);
    margin-top: 0;
    font-size: 1.4rem;
  }

  /* Features — single column */
  .landing__features-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .landing__section-title {
    font-size: 1.6rem;
  }

  .landing__mock-card-image {
    width: 120px;
    height: 120px;
  }

  /* Auth */
  .landing__auth-card {
    padding: 32px 20px;
  }

  .landing__auth-title {
    font-size: 1.3rem;
  }
}
</style>
