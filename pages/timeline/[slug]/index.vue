<script lang="ts" setup>
import { getDates } from '~/utils/date'

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

const { data: item } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) =>
      data
        .map((item) => ({
          ...item,
          dates: getDates(item)
        }))
        .at(0)
  }
)
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start bg-surface-container">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between"
    >
      <Breadcrumbs />
      <TheSignature />
    </div>
  </div>
  <PageContainer>
    <div
      class="mt-6 grid grid-cols-1 gap-4 overflow-hidden px-4 pb-8 md:grid-cols-[380px,1fr] md:gap-8 xl:gap-10"
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
      <div class="relative flex flex-col gap-2 overflow-hidden pt-[4em]">
        <fieldset class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Functietitel
            </sub>
            <h1 class="mb-4 text-body-large">{{ item.roleName }}</h1>
          </div>
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Dienstverband
            </sub>
            <h1 class="mb-4 text-body-large capitalize">
              {{ item.type === 'job' ? 'Baan' : 'Stage' }}
              <span>- {{ item.contractType }}</span>
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
            <h1 class="mb-4 text-body-large">{{ item.companyName }}</h1>
          </div>
          <div class="flex flex-col">
            <sub
              class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
            >
              Locatie
            </sub>
            <h1 class="mb-4 text-body-large">{{ item.companyLocation }}</h1>
          </div>
        </fieldset>
        <fieldset>
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Bedrijfsomschrijving
          </sub>
          <h1 class="mb-4 text-body-large">{{ item.companyDescription }}</h1>
        </fieldset>
        <fieldset>
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Periode
          </sub>
          <h1 class="mb-4 text-body-large">
            {{ item.dates.start }} - {{ item.dates.end }} ({{
              item.dates.duration
            }})
          </h1>
        </fieldset>

        <sub
          class="mb-0.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Taken en verantwoordelijkheden
        </sub>
        <ul class="">
          <li
            v-for="listItem in item.roleDescription.split('--').slice(1)"
            class="list-disc pl-6 text-body-large text-body-large"
          >
            {{ listItem }}
          </li>
        </ul>
        <div class="mt-6 flex">
          <TheTags :tags="item.tags" />
        </div>
      </div>
    </div>
  </PageContainer>
</template>
