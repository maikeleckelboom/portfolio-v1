<script setup lang="ts">
const elMilestone = ref<HTMLElement>()
</script>

<template>
  <div
    ref="elMilestone"
    data-component="TimelineItemMilestone"
    class="absolute -left-2 top-1/2 grid h-4 w-4 -translate-y-1/2 place-items-center rounded-full"
  >
    <div class="absolute h-2 w-2 rounded-full bg-primary"></div>
  </div>
</template>

<style scoped>
.selected [data-component='TimelineItemMilestone'] {
}
</style>
