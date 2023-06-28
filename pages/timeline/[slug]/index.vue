<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

const route = useRoute()

const { data: timelineData } = await useAsyncData(
  'timeline',
  async () =>
    await $fetch('/api/timeline', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) =>
      data.map((item) => ({
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
    transform: ({ data }) =>
      (data as ITimelineItem[])
        .map((item) => ({
          ...item,
          gallery: item?.gallery!.filter((item) => !item.hidden),
          dates: getDates(item)
        }))
        .at(0)
  }
)
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
      class="mt-6 grid grid-cols-1 gap-4 overflow-hidden px-4 pb-8 md:grid-cols-[380px,1fr] md:gap-8 xl:gap-14"
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
      <div class="relative flex flex-col gap-2 overflow-hidden pt-14">
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
            class="mb-0.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Taken en verantwoordelijkheden
          </sub>
          <ul class="">
            <li
              v-for="listItem in itemData.roleDescription.split('--').slice(1)"
              class="list-disc pl-6 text-body-large text-body-large"
            >
              {{ listItem }}
            </li>
          </ul>
        </fieldset>
        <fieldset class="mt-6 flex">
          <TheTags :tags="itemData.tags" />
        </fieldset>
        <div v-if="itemData?.gallery" class="mt-8 flex flex-col">
          <h1 class="mb-4 text-headline-large">Schermafbeeldingen</h1>
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="image in itemData.gallery"
              class="relative flex h-full min-h-full w-full min-w-full overflow-hidden rounded-lg border outline-offset-2 last:col-span-2 [&:nth-child(3)]:col-span-1"
            >
              <NuxtImg
                :alt="image.name"
                :src="image.path"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>
