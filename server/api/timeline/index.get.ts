import { Database } from '../../../types/database.types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client
    .from('experiences')
    .select('*')
    .order('dateStart', { ascending: false })
  return { data, error }
})
