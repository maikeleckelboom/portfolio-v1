<script lang="ts" setup>
const props = defineProps<{
  tags: string[]
}>()

const colorArr = ref(['bg-primary-container/50 text-on-primary-container'])

const iconsVisible = ref<boolean>(false)
</script>

<template>
  <div class="relative flex w-full flex-wrap gap-2 overflow-hidden">
    <div
      v-for="(tag, n) in tags"
      :key="n"
      :class="`${colorArr[n % colorArr.length]}`"
      class="title-small flex items-center justify-center rounded-2xl border border-outline-variant px-2 py-1 font-semibold"
    >
      <Icon
        v-if="iconsVisible"
        :name="`logos:${tag.trim().toLowerCase()}`"
        :title="tag.trim().toLowerCase()"
        class="min-w-5 h-5 shrink-0"
      />
      <span
        v-else
        class="whitespace-nowrap text-label-small font-bold capitalize"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
