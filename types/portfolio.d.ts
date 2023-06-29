import { JSONContent } from '@tiptap/vue-3'

export interface IFile {
  id: number
  originalFilename: string
  filename: string
  filepath: string
  size: number
  mimetype: string
  created_at: string
}

export interface ITimelineItem {
  id: number
  roleName: string
  roleDescription: string
  companyName: string
  companyWebsite: string
  companyDescription: string
  companyLocation: string
  createdAt: string

  contractType: string

  dateStart: string
  dateEnd: string

  tags: string[]

  timeline_files?: {
    file: IFile
  }[]

  type: 'internship' | 'job'
  slug: string

  dates: {
    duration: string
    start: string
    end: string
  }
}

export interface PortfolioJSONContent extends JSONContent {
  type: 'experience'
  attrs: ITimelineItem
}
