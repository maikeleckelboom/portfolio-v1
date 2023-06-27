<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

const props = defineProps<{
  data: ITimelineItem[]
}>()
</script>

<template>
  <ol class="relative flex h-full min-h-[calc(100dvh-112px)] flex-col border-l">
    <li>
      <h1
        class="timeline-start-stripes mb-3.5 pb-2 pl-6 text-title-large md:text-headline-small"
      >
        <slot name="title" />
      </h1>
    </li>
    <li v-for="(item, index) in data" :key="item.id" class="mb-4">
      <slot :index="index" :item="item" name="item">
        <TimelineItem :index="index" :item="item" />
      </slot>
    </li>
  </ol>
</template>

<style lang="postcss" scoped>
/**
  * Timeline
*/
</style>
