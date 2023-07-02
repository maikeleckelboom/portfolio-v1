<script setup lang="ts">
const emit = defineEmits<{
  (ev: 'open'): void
}>()

const route = useRoute()
</script>

<template>
  <button
    @click="emit('open')"
    class="min-h-12 group flex w-fit items-center rounded-xl border border-transparent pl-4 hover:border-on-surface-variant/20 hover:bg-outline-variant/20 active:bg-outline-variant/30"
  >
    <span class="text-shadow-bold">
      {{ route.params.slug }}
    </span>
    <span class="flex h-10 w-10 items-center justify-center">
      <Icon class="h-6 w-6" name="ic:round-arrow-drop-down" />
    </span>
  </button>
</template>
