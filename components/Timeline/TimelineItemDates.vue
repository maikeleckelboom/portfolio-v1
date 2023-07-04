<script lang="ts" setup>
const props = defineProps<{
  dates: {
    start: string
    end: string
    duration: string
  }
}>()
</script>

<template>
  <time
    class="mb-0.5 flex text-sm font-normal leading-none text-on-surface-variant"
  >
    <span class="text-label-medium tabular-nums">
      <span class="italic opacity-70">
        {{ monthFromShortDate(dates.start) }}
      </span>
      {{ yearFromShortDate(dates.start) }}
    </span>
    <span class="mx-1">-</span>
    <span class="text-label-medium tabular-nums">
      <span class="italic opacity-70">
        {{ monthFromShortDate(dates.end) }}
      </span>
      {{ yearFromShortDate(dates.end) }}
    </span>
    <span class="ml-2 text-label-medium tabular-nums">
      ({{ dates.duration }})
    </span>
  </time>
</template>
