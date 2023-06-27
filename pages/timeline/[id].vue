<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'
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
    await $fetch(`/api/timeline/${route.params.id}`, {
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
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 py-4"
    >
      <NuxtLink
        class="grid h-12 w-12 place-items-center rounded-full hover:bg-surface-level-1 focus-visible:bg-surface-level-2 active:bg-surface-level-5"
        to="/"
      >
        <Icon class="h-6 w-6" name="ic:outline-arrow-back" />
      </NuxtLink>
      <DomainNameLogo />
    </div>
  </div>
  <PageContainer>
    <div
      class="grid grid-cols-1 gap-4 overflow-hidden px-4 pt-6 md:grid-cols-[380px,1fr] md:gap-8"
    >
      <div class="flex flex-col">
        <Timeline v-if="timelineData" :data="timelineData">
          <template #title> Werkervaring</template>
          <template #item="{ item, index }">
            <TimelineItem
              :index="index"
              :item="item"
              :to="`/timeline/${item.id}`"
            />
          </template>
        </Timeline>
      </div>
      <div class="relative flex flex-col overflow-hidden pl-8">
        <h1 class="mb-4 text-headline-small">Taken en verantwoordelijkheden</h1>
        <!--        <strong class="mb-2 text-title-large">-->
        <!--          {{ item.roleName }}-->
        <!--        </strong>-->
        <!--        <p class="mb-2 text-label-small">-->
        <!--          <span>{{ item.companyName }}</span>-->
        <!--          <span>{{ item.companyDescription }}</span>-->
        <!--        </p>-->
        <!--        <p class="mb-2 text-label-small">-->
        <!--          {{ item.dates.start }} - {{ item.dates.end }}-->
        <!--        </p>-->

        <ul class="mb-4">
          <li
            v-for="listItem in item.roleDescription.split('--').slice(1)"
            class="list-disc"
          >
            {{ listItem }}
          </li>
        </ul>
        <TheTags :tags="item.tags" />
      </div>
    </div>
  </PageContainer>
</template>
