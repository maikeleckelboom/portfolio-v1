<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'
import { ComputedRef } from 'vue'

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

console.log('itemData', itemData.value)

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
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start bg-surface-container">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-2"
    >
      <Breadcrumbs />
      <TheSignature />
    </div>
  </div>
  <PageContainer>
    <div
      class="mt-6 grid grid-cols-1 gap-4 px-4 pb-8 md:grid-cols-[380px,1fr] md:gap-8 xl:gap-14"
    >
      <div class="flex flex-col">
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
        v-if="itemData"
        class="relative flex flex-col gap-2 overflow-hidden pt-16"
      >
        <fieldset class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Functietitel
            </sub>
            <h1 class="mb-4 text-body-large">{{ itemData.roleName }}</h1>
          </div>
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Dienstverband
            </sub>
            <h1 class="mb-4 text-body-large capitalize">
              {{ itemData.type === 'job' ? 'Baan' : 'Stage' }}
              <span>- {{ itemData.contractType }}</span>
            </h1>
          </div>
        </fieldset>
        <fieldset class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Bedrijf
            </sub>
            <h1 class="mb-4 text-body-large">{{ itemData.companyName }}</h1>
          </div>
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Locatie
            </sub>
            <h1 class="mb-4 text-body-large">{{ itemData.companyLocation }}</h1>
          </div>
        </fieldset>
        <fieldset>
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Bedrijfsomschrijving
          </sub>
          <h1 class="mb-4 text-body-large">
            {{ itemData.companyDescription }}
          </h1>
        </fieldset>
        <fieldset>
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Periode
          </sub>
          <h1 class="mb-4 text-body-large">
            {{ itemData.dates.start }} - {{ itemData.dates.end }} ({{
              itemData.dates.duration
            }})
          </h1>
        </fieldset>
        <fieldset>
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Taken en verantwoordelijkheden
          </sub>
          <ul class="">
            <li
              v-for="listItem in itemData.roleDescription.split('--').slice(1)"
              class="list-disc pl-6 text-body-large"
            >
              {{ listItem }}
            </li>
          </ul>
        </fieldset>
        <fieldset class="mb-8 mt-6 flex">
          <TheTags :tags="itemData.tags" />
        </fieldset>
        <div class="absolute right-0 flex justify-end">
          <NuxtLink :to="`/timeline/${itemData.slug}/files/create`">
            <button
              class="flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-primary-container text-on-primary-container"
            >
              <Icon class="h-6 w-6" name="ic:round-upload" />
            </button>
          </NuxtLink>
          <NuxtLink :to="`/timeline/${itemData.slug}/edit`">
            <button
              class="flex w-[72px] items-center justify-center rounded-[18px] border-1 border-primary-container text-on-primary-container"
            >
              Edit
              <Icon class="h-6 w-4" name="ic:round-edit" />
            </button>
          </NuxtLink>
        </div>
        <div v-if="itemData?.timeline_files" class="flex flex-col">
          <h1 class="mb-4 text-headline-medium">Schermafbeeldingen</h1>
          <div class="grid grid-cols-3 gap-4">
            <NuxtLink
              v-for="attachment in itemData.timeline_files"
              :to="`/timeline/${itemData.slug}/files/${attachment.file.id}`"
              class="relative flex h-full min-h-full w-full min-w-full overflow-hidden rounded-lg border outline-offset-2"
            >
              <NuxtImg
                :alt="attachment.file.filename"
                :src="attachment.file.filepath"
                class="h-full max-h-[400px] w-full object-cover"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>
