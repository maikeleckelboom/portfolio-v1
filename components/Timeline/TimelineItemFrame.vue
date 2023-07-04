<script setup lang="ts">
const elFrame = ref<HTMLElement>()
</script>

<template>
  <div
    ref="elFrame"
    data-ref-name="timeline-item-frame"
    class="absolute m-0 p-0"
  >
    <slot />
  </div>
</template>

<style scoped>
.selected [data-ref-name='timeline-item-frame'] {
}
</style>
