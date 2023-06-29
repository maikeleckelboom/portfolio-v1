import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const { slug, id } = event.context.params as { slug: string; id: string }
  const client = serverSupabaseServiceRole<Database>(event)

  return {
    data: {
      message: 'Not implemented yet 😄',
      slug,
      id
    },
    error: null
  }
})
