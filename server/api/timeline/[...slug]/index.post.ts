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
  if (error) {
    console.error(error)
    return {
      error: {
        status: 500,
        message: 'Something went wrong'
      }
    }
  }
  return {
    data,
    error
  }
})
