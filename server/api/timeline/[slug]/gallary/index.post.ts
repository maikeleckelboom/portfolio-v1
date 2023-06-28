import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)

  const body = await readBody(event)

  console.log('body', body)

  const { data, error } = await client.from('gallery').insert([])
  return { data, error }
})
