// @ts-ignore
import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '../../types/database.types'

export default defineEventHandler(async (event) => {
  const formModel = await readBody(event)
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client.from('experiences').insert([
    {
      roleDescription: JSON.stringify(formModel.roleDescription),
      companyDescription: JSON.stringify(formModel.companyDescription),
      ...formModel
    }
  ])
  return {
    data,
    error
  }
})
