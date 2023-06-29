<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

const { data } = await useAsyncData(
  'timeline',
  async () =>
    await $fetch('/api/timeline', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) =>
      (data as any[]).map((item) => ({
        ...item,
        children: [],
        dates: getDates(item)
      })) as ITimelineItem[]
  }
)
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start bg-surface-container">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 py-4"
    >
      <Breadcrumbs />
      <TheSignature />
    </div>
  </div>
  <PageContainer>
    <div
      id="home-content"
      class="mt-6 grid gap-8 px-4 md:grid-cols-[1fr,420px]"
    >
      <div class="flex flex-col">
        <ProfileHeroCard />
      </div>
      <div class="relative flex flex-col">
        <Timeline v-if="data" :data="data">
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
    </div>
  </PageContainer>
</template>

<style scoped>
html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}

html:not(.is-transitioning) #home-content {
  view-transition-name: home-content;
  mix-blend-mode: normal;
}

html:not(.is-transitioning) #detail-content {
  view-transition-name: detail-content;
  mix-blend-mode: normal;
}
</style>
