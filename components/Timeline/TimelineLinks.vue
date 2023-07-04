<script lang="ts" setup>
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
</script>

<template>
  <div></div>
</template>
