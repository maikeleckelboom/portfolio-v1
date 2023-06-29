import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const url = new URL(getRequestURL(event))
  const id = url.pathname.split('/').pop()
  const client = serverSupabaseServiceRole(event)
  const { data, error } = await client.from('files').select(`*`).eq('id', id)
  return { data, error }
})
