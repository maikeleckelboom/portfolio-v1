import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '../../../types/database.types'

export default defineEventHandler(async (event) => {
  const url = new URL(getRequestURL(event))
  const id = url.pathname.split('/').pop()
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client
    .from('experiences')
    .select('*')
    .eq('id', id)
  return { data, error }
})
