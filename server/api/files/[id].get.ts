import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const client = serverSupabaseServiceRole(event)
  const { data, error } = await client
    .from('files')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
})
