import { JSONContent } from '@tiptap/vue-3'

declare interface IExperience {
  id: number
  type: 'internship' | 'job'
  tags: string[]
  dateStart: string
  dateEnd: string
  roleName: string
  roleDescription: string
  roleDescriptionLabel?: string
  companyName: string
  companyWebsite: string
  companyDescription: string
  companyLocation: string
  createdAt: string
}

declare interface IExperienceJSON extends JSONContent {
  type: 'experience'
  attrs: IExperience
}
