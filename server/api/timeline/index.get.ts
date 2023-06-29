import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client
    .from('timeline')
    .select(
      `*, timeline_files(
      file: files(*)
     )`
    )
    .order('dateStart', { ascending: false })
  return { data, error }
})
