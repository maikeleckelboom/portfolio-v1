<script lang="ts" setup>
const props = defineProps<{
  timeline: TimelineItem[]
}>()

const route = useRoute()
const timeline = computed<TimelineItem[]>(() =>
  props.timeline.map((item) => ({
    ...item,
    active: item.slug === route.params.slug
  }))
)
</script>

<template>
  <div id="timeline" class="relative flex flex-col">
    <h1
      class="mb-10 bg-gradient-to-r from-primary to-on-surface bg-clip-text pl-6 text-headline-small font-extrabold text-transparent"
    >
      <slot name="title" />
    </h1>
    <div class="relative flex flex-col">
      <div
        class="absolute bottom-0 left-0 top-0 flex h-full w-[1px] -translate-x-1/2 bg-outline-variant"
      />
      <ol class="relative flex h-full flex-col">
        <li
          v-for="(item, index) in timeline"
          :key="item.id"
          class="relative mb-6 flex last:mb-0"
        >
          <slot :index="index" :item="item" name="item" />
        </li>
      </ol>
    </div>
  </div>
</template>

<style>
#timeline {
  view-transition-name: timeline;
}
</style>
