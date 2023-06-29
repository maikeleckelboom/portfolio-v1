import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const url = new URL(getRequestURL(event))
  const slug = url.pathname.split('/').at(-2)
  const client = serverSupabaseServiceRole<Database>(event)

  return {
    data: {
      message: 'Not implemented yet 😄',
      slug
    },
    error: null
  }
})
