import { JSONContent } from '@tiptap/vue-3'

export interface Portfolio {
  id: number
  type: 'internship' | 'job'
  tags?: string[]
  dateStart: string
  dateEnd: string
  roleName: string
  roleDescription: string
  companyName: string
  companyWebsite: string
  companyDescription: string
  companyLocation: string
  createdAt: string

  shortDescription?: string

  periodDuration?: string
  periodMilliseconds?: number
}

export interface PortfolioJSONContent extends JSONContent {
  type: 'experience'
  attrs: Portfolio
}
