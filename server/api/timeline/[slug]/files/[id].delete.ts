import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { slug: string; id: string }
  const client = serverSupabaseServiceRole(event)
  const { data, error } = await client
    .from('timeline_files')
    .delete()
    .match({ file_id: id })
  return { data, error }
})
