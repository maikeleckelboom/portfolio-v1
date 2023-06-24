import { JSONContent } from '@tiptap/vue-3'

declare interface IExperience {
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

  periodDuration?: string
  periodMilliseconds?: number
}

export interface IExperienceJSON extends JSONContent {
  type: 'experience'
  attrs: IExperience
}
