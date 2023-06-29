import { serverSupabaseServiceRole } from '#supabase/server'
import { Database } from '~/types/database.types'
import { Files, readFiles } from 'h3-formidable'
import path from 'pathe'
import * as fs from 'fs'

interface IFile {
  id?: string
  created_at?: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  filepath: string
}

export default defineEventHandler(async (event) => {
  const context = await readFiles(event, {
    includeFields: true
  })

  const fileList: Files[] = []

  for (const file of Object.keys(context.files)) {
    fileList.push(context.files[file].at(0))
  }

  if (!fileList.length) return

  const files: IFile[] = fileList.reduce((acc, file, index) => {
    const { newFilename, originalFilename, mimetype, size, filepath } = file
    const newPath = `${path.join('public', 'uploads', newFilename)}.${mimetype
      .split('/')
      .at(0)}`
    fs.copyFileSync(filepath, newPath)
    acc[index] = {
      filename: newFilename,
      originalFilename,
      mimetype,
      size,
      filepath: newPath.replace('public', '')
    }
    return acc
  }, [] satisfies IFile[])

  const client = serverSupabaseServiceRole<Database>(event)

  const { data, error } = await client.from('files').insert(files)

  const { data: fileIDCollection, error: rlError } = await client
    .from('files')
    .select('id')
    .in(
      'filename',
      files.map((file) => file.filename)
    )

  if (!fileIDCollection) return { data, error: rlError }

  const insertRows = fileIDCollection.map((file) => ({
    file_id: file.id,
    timeline_id: context.fields.id.at(0)
  }))

  console.log({ insertRows })

  const { error: err } = await client.from('timeline_files').insert(insertRows)

  if (err) return { data, error: err }

  return { data, error }
})
