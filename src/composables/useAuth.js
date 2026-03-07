import { ref, readonly } from 'vue'
import { supabase } from '../services/supabase.js'

const user = ref(null)
const loading = ref(true)

// Set up auth state listener once
if (supabase) {
  supabase.auth.getSession().then(({ data: { session } }) => {
    user.value = session?.user ?? null
    loading.value = false
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
} else {
  loading.value = false
}

export function useAuth() {
  async function signUp(email, password) {
    if (!supabase) throw new Error('Supabase is not configured')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  async function signIn(email, password) {
    if (!supabase) throw new Error('Supabase is not configured')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signOut() {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    signUp,
    signIn,
    signOut,
  }
}
