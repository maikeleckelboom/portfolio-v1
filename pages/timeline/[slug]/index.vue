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

const item = computed<TimelineItem>(() => {
  if (!timeline.value && !Array.isArray(timeline.value)) return
  return timeline.value.find((item) => item.slug === route.params.slug)
})

const router = useRouter()

const trailingIcons = ref([
  {
    icon: 'ic:round-edit',
    label: 'Aanpassen',
    name: 'edit',
    onClick: () => router.push(`/timeline/${item.value!.slug}/edit`)
  },
  {
    icon: 'ic:baseline-delete-outline',
    label: 'Verwijderen',
    name: 'delete',
    onClick: () => router.push(`/timeline/${item.value!.slug}/delete`)
  }
])

const {
  Placeholder: MenuPlaceholder,
  toggle,
  hide
} = useMenu(
  {
    trailingIcons: trailingIcons.value,
    top: `-24px`
  },
  {
    emits: {
      onClose: () => setTimeout(hide, 100)
    }
  }
)
</script>

<template>
  <div>
    <div class="mb-4 flex h-16 w-full items-start justify-start bg-surface">
      <div
        class="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 py-2"
      >
        <Breadcrumbs />
        <MenuTrigger @click="toggle" />
      </div>
    </div>
    <PageContainer>
      <div class="flex w-full max-w-5xl justify-end px-1">
        <MenuPlaceholder />
      </div>
      <div
        class="grid grid-cols-[200px,1fr] gap-4 px-4 pb-8 md:grid-cols-[416px,1fr] md:gap-8 xl:gap-14"
      >
        <div class="col-start-1 row-start-1 flex flex-col">
          <Timeline :timeline="timeline">
            <template #title> Werkervaring</template>
            <template #item="{ item, index, active }">
              <TimelineItem
                :item="item"
                :index="index"
                :active="active"
                :to="`/timeline/${item.slug}`"
              />
            </template>
          </Timeline>
        </div>
        <div
          id="timeline-item"
          class="relative flex flex-col gap-2 overflow-hidden md:col-start-2 md:row-start-1 xl:pt-16"
        >
          <TimelineItemTextContent :item="item" />
        </div>
        <div v-if="item" class="col-span-full col-start-2 flex flex-col">
          <TimelineItemFiles :item="item" />
        </div>
      </div>
    </PageContainer>
  </div>
</template>

<style>
#timeline-item {
  view-transition-name: timeline-item;
}

@keyframes fade-in-from-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-out-to-right {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

::view-transition-new(timeline-item):only-child {
  animation-name: fade-in-from-right;
}

::view-transition-old(timeline-item):only-child {
  animation-name: fade-out-to-right;
}

::view-transition-old(timeline-item),
::view-transition-new(timeline-item) {
}
</style>
