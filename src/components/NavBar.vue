<script setup>
import { useAuth } from '../composables/useAuth.js'
import { useRouter, useRoute } from 'vue-router'

const { user, loading, signOut } = useAuth()
const router = useRouter()
const route = useRoute()

async function handleSignOut() {
  await signOut()
  router.push('/auth')
}

function handleSignIn() {
  if (route.name === 'auth') {
    document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push('/auth')
  }
}
</script>

<template>
  <nav class="nav">
    <div class="nav__inner container">
      <router-link to="/" class="nav__brand">WHO WINS?</router-link>

      <div class="nav__links">
        <router-link v-if="user" to="/history" class="nav__link">My Fights</router-link>

        <template v-if="!loading">
          <button v-if="!user" class="nav__link nav__link--auth" @click="handleSignIn">
            Sign In
          </button>
          <template v-else>
            <span class="nav__email">{{ user.email }}</span>
            <button class="nav__link nav__link--auth" @click="handleSignOut">Sign Out</button>
          </template>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  padding: 16px 0;
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__brand {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
  animation: bounceIn 0.8s ease-out;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav__link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
  border-radius: 50px;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.nav__link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav__link--auth {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.nav__link--auth:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav__email {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .nav__brand {
    font-size: 1.3rem;
  }

  .nav__links {
    gap: 8px;
  }

  .nav__link {
    font-size: 0.85rem;
    padding: 6px 12px;
  }

  .nav__email {
    display: none;
  }
}
</style>
