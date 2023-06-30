<script setup lang="ts">
import {ITimelineItem} from "~/types/portfolio";

const route = useRoute()

console.log(route.params.slug)
const {data} = await useAsyncData(
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
</script>

<template>
  <BottomSheet>
      <div
          v-if="data"
          class="relative flex flex-col gap-2 overflow-hidden xl:pt-16 md:col-start-2 md:row-start-1"
      >
        <TimelineItemTextContent
            :data="data"
        />
      </div>
      <div
          v-if="data?.timeline_files"
          class="col-span-full col-start-1 flex flex-col px-2"
      >
        <TimelineItemFileContent
            :data="data"
        />
      </div>
  </BottomSheet>
</template>
