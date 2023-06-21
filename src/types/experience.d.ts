import { JSONContent } from '@tiptap/vue-3'

declare interface IExperience {
  id: number
  type: 'internship' | 'work'
  startDate: string
  endDate: string
  roleName: string
  roleDescription: JSONContent
  companyName: string
  companyWebsite: string
  companyDescription: JSONContent
  companyLocation: string
  createdAt: string
}
