import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const url = new URL(getRequestURL(event))
  const slug = url.pathname.split('/').pop()
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client
    .from('timeline')
    .select(`*, timeline_files(file: files(*))`)
    .eq('slug', slug)
  return { data, error }
})
