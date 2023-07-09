<script setup lang="ts">
import { ITimelineItem } from '~/types/portfolio'

const props = defineProps<{
  timeline?: ITimelineItem[] | null
}>()
</script>

<template>
  <Timeline v-if="timeline" :timeline="timeline">
    <template #title></template>
    <template #item="{ item, index }">
      <TimelineItem :index="index" :item="item" :to="`/${item.slug}`" />
    </template>
  </Timeline>
</template>
