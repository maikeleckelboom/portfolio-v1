import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params as { slug: string }
  const body = await readBody(event)
  const client = serverSupabaseServiceRole<Database>(event)
  const { dates, timeline_files, ...withoutDates } = body
  const { data, error } = await client
    .from('timeline')
    .update(withoutDates)
    .match({ slug })

  console.log('withoutDates', withoutDates)
  console.log('data', data, 'error', error)

  return {
    data,
    error
  }
})
