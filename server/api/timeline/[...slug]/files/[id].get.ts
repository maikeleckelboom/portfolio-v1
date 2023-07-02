import {serverSupabaseServiceRole} from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {slug, id} = event.context.params as { slug: string; id: string }
    const client = serverSupabaseServiceRole(event)
    const {data, error} = await client.from('files').select(`*`).eq('id', id)
    return {data, error}
})
