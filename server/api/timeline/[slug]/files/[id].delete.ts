import {serverSupabaseServiceRole} from '#supabase/server'

export default defineEventHandler(async (event) => {
    const {slug, id} = event.context.params as { slug: string; id: string }
    const client = serverSupabaseServiceRole(event)
    const {error: relationshipError} = await client
        .from('timeline_files')
        .delete()
        .match({file_id: id})

    if (relationshipError) {
        console.error(
            'Error while interacting from timeline_files',
            relationshipError
        )

        return {data: null, error: relationshipError}
    }

    const {data, error} = await client.from('files').delete().match({id})

    return {data, error}
})
