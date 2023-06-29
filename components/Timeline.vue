<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

const props = defineProps<{
  data: ITimelineItem[]
}>()
</script>

<template>
  <div class="relative">
    <div
      class="absolute bottom-0 left-0 top-6 flex h-full min-h-[50vh] w-[1px] bg-outline-variant md:-left-[1px]"
    />
    <ol class="timeline-start-stripes relative flex h-full flex-col md:pl-0">
      <li>
        <h1 class="mb-6 mt-2 pl-6 text-headline-small md:text-headline-large">
          <span class="relative -top-2">
            <slot name="title" />
          </span>
        </h1>
      </li>
      <li v-for="(item, index) in data" :key="item.id" class="relative mb-6">
        <slot :index="index" :item="item" name="item" />
      </li>
    </ol>
  </div>
</template>
