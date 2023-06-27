import { ITimelineItem } from '~/types/portfolio'
import humanizeDuration from 'humanize-duration'

export const getDates = (item: ITimelineItem) => ({
  start: new Date(item.dateStart).toLocaleDateString('nl-NL', {
    month: 'short',
    year: 'numeric'
  }),
  end: new Date(item.dateEnd).toLocaleDateString('nl-NL', {
    month: 'short',
    year: 'numeric'
  }),
  duration: humanizeDuration(
    new Date(item.dateEnd).getTime() - new Date(item.dateStart).getTime(),
    {
      language: 'nl',
      largest: 1
    }
  )
})

export const yearFromShortDate = (date: string): number =>
  parseInt(
    new Date(date).toLocaleDateString('nl-NL', {
      year: 'numeric'
    })
  )

export const monthFromShortDate = (date: string): string =>
  new Date(date).toLocaleDateString('nl-NL', {
    month: 'short'
  })
