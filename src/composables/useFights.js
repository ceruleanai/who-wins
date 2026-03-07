import { supabase } from '../services/supabase.js'
import { useAuth } from './useAuth.js'

export function useFights() {
  const { user } = useAuth()

  async function saveFight(result, animal1Image, animal2Image) {
    if (!supabase || !user.value) return null

    const { data, error } = await supabase.from('fights').insert({
      user_id: user.value.id,
      animal1_name: result.animal1.name,
      animal1_stats: result.animal1.stats,
      animal1_special_ability_name: result.animal1.specialAbilityName,
      animal1_fun_facts: result.animal1.funFacts,
      animal1_image_url: animal1Image,
      animal1_extra: result.animal1.extra ?? null,
      animal2_name: result.animal2.name,
      animal2_stats: result.animal2.stats,
      animal2_special_ability_name: result.animal2.specialAbilityName,
      animal2_fun_facts: result.animal2.funFacts,
      animal2_image_url: animal2Image,
      animal2_extra: result.animal2.extra ?? null,
      winner: result.winner,
      explanation: result.explanation,
      is_draw: result.isDraw ?? false,
    }).select()

    if (error) {
      console.error('Failed to save fight:', error.message)
      return null
    }

    return data?.[0] ?? null
  }

  async function fetchFights() {
    if (!supabase || !user.value) return []

    const { data, error } = await supabase
      .from('fights')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch fights:', error.message)
      return []
    }

    return data ?? []
  }

  async function deleteFight(id) {
    if (!supabase || !user.value) return false

    const { error } = await supabase.from('fights').delete().eq('id', id)

    if (error) {
      console.error('Failed to delete fight:', error.message)
      return false
    }

    return true
  }

  return { saveFight, fetchFights, deleteFight }
}
