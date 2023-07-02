<script lang="ts" setup>
const { data } = await useAsyncData(
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
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start bg-surface">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 py-4"
    >
      <Breadcrumbs />
      <TheSignature />
    </div>
  </div>
  <PageContainer>
    <div class="w-full p-4">
      <Timeline v-if="data" :data="data">
        <template #item="{ item, index }">
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
