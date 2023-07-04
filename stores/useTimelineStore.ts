import type { ITimelineItem } from '~/types/portfolio'

export const useTimelineStore = defineStore('timeline', () => {
  const timeline = ref<ITimelineItem[] | undefined>()
  const item = ref<ITimelineItem | undefined>()

  const setTimeline = (newTimeline: ITimelineItem[]) => {
    timeline.value = newTimeline
  }

  const setItem = (newItem: ITimelineItem) => {
    item.value = newItem
  }

  return {
    timeline,
    setTimeline,
    item,
    setItem
  }
})
