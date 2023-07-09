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

const timelineRefs = ref<HTMLElement[]>([])

onMounted(() => {
  useTimeoutFn(() => {
    if (document.documentElement.classList.contains('prevent-pan-x')) {
      document.documentElement.classList.remove('prevent-pan-x')
    }
  }, 100)
})

onBeforeRouteLeave(async (to, from, next) => {
  if (to.params.id) {
    document.documentElement.classList.add('prevent-pan-x')
    next()
    return
  }

  await Promise.all(
    timelineRefs.value.map((el) => {
      return new Promise((resolve) => {
        el.addEventListener('animationend', () => {
          resolve()
        })
        el.classList.add('animate-timeline-item-leave')
      })
    })
  )
  next()
})

whenever(timelineRefs, (refs) => {
  refs.forEach((el) => {
    el.addEventListener('animationend', () => {
      console.log(
        'animationend',
        el.classList.contains('animate-timeline-item-leave')
      )
      el.classList.remove('animate-timeline-item-leave')
    })
  })
})

const setAllOrNoneSelected = () => {}

const isAWithHref = (el: HTMLElement) =>
  el.tagName === 'A' && el.getAttribute('href')

const onBeforeRouteChange = (ev: PointerEvent) => {
  const targetEl = ev.currentTarget as HTMLElement
  if (!isAWithHref(targetEl)) {
    return
  }
}

const filterForTimelineItemAnimation = (event: AnimationEvent) =>
  event.animationName.match(/timeline-item/)
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
        class="grid gap-4 px-4 pb-8 md:grid-cols-[416px,1fr] md:gap-8 xl:gap-14"
      >
        <div class="col-start-1 row-start-1 flex flex-col">
          <Timeline :timeline="timeline">
            <template #title></template>
            <template #item="{ item, index, active }">
              <TimelineItem
                :item="item"
                :ref="timelineRefs[item.id]"
                :index="index"
                :active="active"
                @click.native="onBeforeRouteChange"
                :to="`/${item.slug}`"
              />
            </template>
          </Timeline>
        </div>
        <div
          id="timeline-item"
          class="relative flex flex-col gap-2 overflow-hidden md:col-start-2 md:row-start-1 xl:pt-16"
        >
          <TimelineItemTextContent :item="item" />
          <TimelineItemFiles :item="item" />
        </div>
      </div>
    </PageContainer>
  </div>
</template>

<style>
@import 'assets/css/keyframes.css';

html:not(:is(.prevent-pan-x, .is-transitioning)) {
  #timeline-item {
    view-transition-name: timeline-item;
  }
}

::view-transition-new(timeline-item):only-child {
  animation-name: fade-in-from-right;
}

::view-transition-old(timeline-item):only-child {
  animation-name: fade-out-to-right;
}
</style>
