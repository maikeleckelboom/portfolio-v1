import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const url = new URL(getRequestURL(event))
  const slug = url.pathname.split('/').pop()
  const id = url.pathname.split('/').pop()
  const client = serverSupabaseServiceRole(event)

  console.log(`timeline-[${slug}]-gallery-[${id}]`, { slug, id })

  // const { data, error } = await client
  //   .from('experiences')
  //   .select('*')
  //   .eq('slug', slug)
  // return { data, error }
})