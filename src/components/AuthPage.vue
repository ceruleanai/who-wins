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
</script>

<template>
  <div class="auth">
    <div class="auth__card">
      <div class="auth__icon">{{ isSignUp ? '🦁' : '🐾' }}</div>
      <h2 class="auth__title">{{ isSignUp ? 'Create Account' : 'Welcome Back!' }}</h2>
      <p class="auth__subtitle">{{ isSignUp ? 'Join the animal kingdom' : 'Sign in to see your fight history' }}</p>

      <div v-if="successMessage" class="auth__success">
        {{ successMessage }}
      </div>

      <div v-if="error" class="auth__error">
        {{ error }}
      </div>

      <form class="auth__form" @submit.prevent="handleSubmit">
        <div class="auth__field">
          <label class="auth__label" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="auth__input"
            placeholder="tiger@jungle.com"
            required
            :disabled="loading"
          />
        </div>

        <div class="auth__field">
          <label class="auth__label" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="auth__input"
            placeholder="At least 6 characters"
            required
            minlength="6"
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          class="auth__submit"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In') }}
        </button>
      </form>

      <p class="auth__toggle">
        {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
        <button class="auth__toggle-btn" @click="toggleMode" :disabled="loading">
          {{ isSignUp ? 'Sign In' : 'Sign Up' }}
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.auth__card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 40px 32px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: slideUp 0.5s ease-out;
}

.auth__icon {
  font-size: 3rem;
  margin-bottom: 8px;
}

.auth__title {
  font-size: 1.6rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.auth__subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.auth__success {
  background: #d4edda;
  color: #155724;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.auth__error {
  background: #fecaca;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.auth__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth__field {
  text-align: left;
}

.auth__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.auth__input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.2s;
}

.auth__input:focus {
  border-color: var(--bg-start);
}

.auth__input:disabled {
  opacity: 0.6;
}

.auth__submit {
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

.auth__submit:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: var(--shadow-md);
}

.auth__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth__toggle {
  margin-top: 20px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.auth__toggle-btn {
  background: none;
  border: none;
  color: var(--bg-start);
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
}

.auth__toggle-btn:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .auth__card {
    padding: 32px 20px;
  }

  .auth__title {
    font-size: 1.3rem;
  }
}
</style>
