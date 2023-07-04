declare interface TimelineItem {
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
