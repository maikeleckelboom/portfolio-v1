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

const {
  Placeholder: MenuPlaceholder,
  toggle,
  hide
} = useMenu(
  {
    trailingIcons: []
  },
  {
    emits: {
      onClose: () => setTimeout(hide, 100)
    }
  }
)
</script>

<template>
  <div class="flex h-16 items-start justify-start bg-surface">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between p-4"
    >
      <Breadcrumbs />
      <MenuTrigger @click="toggle" />
    </div>
  </div>
  <PageContainer>
    <div class="flex w-full max-w-5xl justify-end px-1">
      <MenuPlaceholder />
    </div>
    <div class="w-full max-w-md p-4">
      <Timeline :timeline="timeline">
        <template #title> Werkervaring</template>
        <template #item="{ item, index, active }">
          <TimelineItem
            :item="item"
            :index="index"
            :to="`/timeline/${item.slug}`"
          />
        </template>
      </Timeline>
    </div>
  </PageContainer>
</template>
