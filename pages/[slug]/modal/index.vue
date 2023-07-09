<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

const timelineStore = useTimelineStore()

const { setTimeline } = timelineStore

const { timeline } = storeToRefs(timelineStore)

const route = useRoute()

if (!timeline.value?.length) {
  const { data: timeline } = await useAsyncData(
    'timeline',
    async () =>
      await $fetch('/api/timeline', {
        method: 'GET',
        headers: useRequestHeaders(['cookie'])
      }),
    {
      transform: (response) =>
        response.data.map((item) => ({
          ...item,
          dates: getDates(item)
        }))
    }
  )
  setTimeline(timeline.value)
}

const item = computed<ITimelineItem>(() => {
  if (!timeline.value && !Array.isArray(timeline.value)) return
  return timeline.value.find((item) => item.slug === route.params.slug)
})

const router = useRouter()

const {
  Placeholder: MenuPlaceholder,
  toggle,
  hide
} = useMenu(
  {
    trailingIcons: [
      {
        icon: 'ic:round-edit',
        label: 'Aanpassen',
        name: 'edit',
        onClick: () => router.push(`/${item.value!.slug}/edit`)
      }
    ]
  },
  {
    emits: {
      onClose: () => setTimeout(hide, 100)
    }
  }
)

const onClose = () => {
  router.push('/')
}
</script>

<template>
  <BottomSheet @close="onClose">
    <div>
      <TimelineItemTextContent :item="item" />
      <TimelineItemFiles :item="item" />
    </div>
  </BottomSheet>
</template>

<style scoped>
@import 'assets/css/keyframes.css';
</style>
