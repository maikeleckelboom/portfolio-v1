<script lang="ts" setup>
const route = useRoute()

const { data: timelineData } = await useAsyncData(
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

const { data: itemData } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (response) => ({
      ...response.data,
      dates: getDates(response.data)
    })
  }
)

console.log('On client after asyncData: ', {
  itemData: itemData.value,
  timelineData: timelineData.value
})

const router = useRouter()

const trailingIcons = ref([
  {
    icon: 'ic:outline-upload-file',
    label: 'Files Uploaden',
    name: 'add',
    onClick: () => router.push(`/timeline/${itemData.value.slug}/files/create`)
  },
  {
    icon: 'ic:round-edit',
    label: 'Aanpassen',
    name: 'edit',
    onClick: () => router.push(`/timeline/${itemData.value.slug}/edit`)
  },
  {
    icon: 'ic:baseline-delete-outline',
    label: 'Verwijderen',
    name: 'delete',
    onClick: () => router.push(`/timeline/${itemData.value.slug}/delete`)
  },
  {
    icon: 'ic:round-print',
    label: 'Afdrukken',
    name: 'print',
    onClick: () => window && window.print()
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
  }
])

const { Placeholder, toggle, hide } = useMenu(
  {
    trailingIcons: trailingIcons.value,
    top: `-10px`
  },
  {
    emits: {
      onClicked: () => setTimeout(hide, 100)
    }
  }
)
</script>

<template>
  <div>
    <div
      class="mb-4 flex h-16 w-full items-start justify-start bg-surface-container"
    >
      <div
        class="mx-auto flex h-full w-full max-w-5xl items-center justify-between pl-1 pr-1 @container"
      >
        <Breadcrumbs />
        <button
          class="group grid h-12 w-12 place-content-center"
          @click="toggle"
        >
          <span
            class="grid h-10 w-10 place-content-center rounded-md border border-outline-variant text-on-surface-variant transition-colors group-hover:bg-outline-variant/20 group-active:bg-outline-variant/30"
          >
            <Icon class="h-6 w-6" name="ic:round-more-vert" />
          </span>
        </button>
      </div>
    </div>

    <PageContainer>
      <div class="flex w-full max-w-5xl justify-end px-1">
        <Placeholder />
      </div>

      <div
        class="grid grid-cols-1 gap-4 pb-8 md:grid-cols-[380px,1fr] md:gap-8 xl:gap-14"
      >
        <div class="col-start-1 row-start-1 hidden flex-col md:flex">
          <Timeline :data="timelineData">
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
          class="relative flex flex-col gap-2 overflow-hidden md:col-start-2 md:row-start-1 xl:pt-16"
        >
          <TimelineItemTextContent :data="itemData" />
        </div>
        <div
          v-if="itemData?.timeline_files"
          class="col-span-full col-start-1 flex flex-col px-2"
        >
          <TimelineItemFileContent :data="itemData" />
        </div>
      </div>
    </PageContainer>
  </div>
</template>
