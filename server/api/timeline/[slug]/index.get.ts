import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params as { slug: string }

  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client
    .from('timeline')
    .select(`*, timeline_files(file: files(*))`)
    .eq('slug', slug)
    .single()

  console.log(data)
  return { data, error }
})
