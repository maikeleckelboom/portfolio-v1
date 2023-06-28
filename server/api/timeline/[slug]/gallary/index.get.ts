import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client.from('gallery').select(`*, gallery(*)`)
  return { data, error }
})
