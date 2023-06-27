import { JSONContent } from '@tiptap/vue-3'

export interface ITimelineItem {
  id: number
  tags?: string[]
  roleName: string
  roleDescription: string
  companyName: string
  companyWebsite: string
  companyDescription: string
  companyLocation: string
  createdAt: string

  dateStart: string
  dateEnd: string

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
