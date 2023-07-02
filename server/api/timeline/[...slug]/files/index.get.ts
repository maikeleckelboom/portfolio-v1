import {serverSupabaseServiceRole} from '#supabase/server'
import {Database} from '~/types/database.types'

const NOT_IMPLEMENTED_RESPONSE = {
    data: {
        message: 'Not implemented yet 😄'
    },
    error: null
}

export default defineEventHandler(async (event) => {
    const {slug} = event.context.params as { slug: string }
    const client = serverSupabaseServiceRole<Database>(event)

    const {data, error} = await client
        .from('timeline')
        .select('files(*)')
        .eq('slug', slug)
        .single()

    return {
        data,
        error
    }
})
