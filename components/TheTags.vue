<script lang="ts" setup>
const props = defineProps<{
  tags: string[]
}>()

const colorArr = ref(['bg-primary-container/50 text-on-primary-container'])
</script>

<template>
  <div class="relative flex w-full flex-wrap gap-2 overflow-hidden">
    <div
      v-for="(tag, n) in tags"
      :key="n"
      class="title-small flex items-center justify-center rounded-2xl border border-outline-variant bg-primary-container/50 px-2 py-1 font-semibold text-on-primary-container"
    >
      <span class="whitespace-nowrap text-label-small font-bold capitalize">
        {{ tag }}
      </span>
    </div>
  </div>
</template>
