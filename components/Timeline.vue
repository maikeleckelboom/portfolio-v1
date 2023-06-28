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
        class="timeline-start-stripes mb-7 pl-6 text-headline-small md:text-headline-medium"
      >
        <slot name="title" />
      </h1>
    </li>
    <li v-for="(item, index) in data" :key="item.id" class="relative mb-6">
      <slot :index="index" :item="item" name="item" />
    </li>
  </ol>
</template>
