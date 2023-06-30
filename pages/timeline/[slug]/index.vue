<script lang="ts" setup>
import {ITimelineItem} from '~/types/portfolio'

const route = useRoute()

const {data: timelineData} = await useAsyncData(
    'timeline',
    async () =>
        await $fetch('/api/timeline', {
          method: 'GET',
          headers: useRequestHeaders(['cookie'])
        }),
    {
      transform: (res) => res.data?.map((item) => ({
        ...item,
        dates: getDates(item)
      })) || []
    }
)

const {data: itemData} = await useAsyncData(
    'timeline-item',
    async () =>
        await $fetch(`/api/timeline/${route.params.slug}`, {
          method: 'GET',
          headers: useRequestHeaders(['cookie'])
        }),
    {
      transform: (response) =>
          ({
            ...response.data,
            dates: getDates(response.data)
          } as ITimelineItem)
    }
)

// const {
//   data: lazyFiles,
// } = useFetch(
//   async () =>
//     await $fetch(`/api/timeline/${route.params.slug}/files`, {
//       method: 'GET',
//       headers: useRequestHeaders(['cookie'])
//     }),
//   {
//     transform: ({ data }) => data
//   }
// )
const router = useRouter()

const trailingIcons = ref([
  {
    icon: 'ic:outline-upload-file',
    label: 'Files Uploaden',
    name: 'add',
    onClick: () => router.push(`/timeline/${itemData?.value?.slug}/files/create`)
  },
  {
    icon: 'ic:round-edit',
    label: 'Aanpassen',
    name: 'edit',
    onClick: () => router.push(`/timeline/${itemData?.value?.slug}/edit`)
  },
  {
    icon: 'ic:baseline-delete-outline',
    label: 'Verwijderen',
    name: 'delete',
    onClick: () => router.push(`/timeline/${itemData?.value?.slug}/delete`)
  },
  {
    icon: 'ic:round-share',
    label: 'Delen',
    name: 'share',
    onClick: () => console.log('click')
  },
  {
    icon: 'ic:round-get-app',
    label: 'Downloaden',
    name: 'download',
    onClick: () => console.log('click')
  },
])


const {Placeholder, toggle, hide, visible} = useMenu(
    {
      trailingIcons: trailingIcons.value,
      top: `-10px`,
    },
    {
      emits: {
        onClicked: () => setTimeout(hide, 100)
      }
    }
)

const device = useDevice()

const isOpened = ref(false)
const toggleSheet = () => {
  isOpened.value = !isOpened.value
}
</script>

<template>
  <div :class="isOpened ? 'fixed inset-0 h-full w-full' : 'relative'">
  <div class="flex h-16 w-full items-start justify-start mb-4 bg-surface-container">
    <div
        class="mx-auto flex h-full w-full max-w-5xl items-center justify-between  pr-1 pl-1 @container "
    >
      <Breadcrumbs/>
      <button class="group grid h-12 w-12 place-content-center" @click="toggle">
        <span
            class="grid h-10 w-10 place-content-center rounded-md border border-outline-variant text-on-surface-variant transition-colors group-hover:bg-outline-variant/20 group-active:bg-outline-variant/30"
        >
          <Icon class="h-6 w-6" name="ic:round-more-vert"/>
        </span>
      </button>
    </div>
  </div>

  <PageContainer>
    <div class=" flex w-full max-w-5xl px-1 justify-end">
      <Placeholder/>
    </div>
    <div class=" grid grid-cols-1 gap-4 pb-8 md:grid-cols-[380px,1fr] md:gap-8 xl:gap-14"
    >
      <div class=" flex-col hidden md:flex ">
        <Timeline v-if="timelineData" :data="timelineData">
          <template #title> Werkervaring</template>
          <template #item="{ item, index }">
            <TimelineItem
                :index="index"
                :item="item"
                :to="`/timeline/${item.slug}`"
            />
          </template>
        </Timeline>
      </div>
      <div
          v-if="itemData && device.isDesktop"
          class="relative flex flex-col gap-2 overflow-hidden xl:pt-16 md:col-start-2 md:row-start-1"
      >
        <TimelineItemTextContent
            :data="itemData"
        />
      </div>
      <div
          v-if="itemData?.timeline_files"
          class="col-span-full col-start-1 flex flex-col px-2"
      >
        <TimelineItemFileContent
            :data="itemData"
        />
      </div>

      <BaseButton @click="toggleSheet">
        <Icon name="ic:round-add"/>
        Open sheet
      </BaseButton>
    </div>
  </PageContainer>
  <BottomSheet v-if="isOpened && itemData && device.isMobile"
    @close="toggleSheet">
    <div
        v-if="itemData"
        class="relative flex flex-col gap-2 overflow-hidden xl:pt-16 md:col-start-2 md:row-start-1"
    >
      <TimelineItemTextContent
          :data="itemData"
      />
    </div>
  </BottomSheet>
  </div>
</template>
