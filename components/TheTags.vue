<script lang="ts" setup>
const props = defineProps<{
  tags: string[]
}>()

const colorArr = ref([
  'bg-primary-container/50 text-on-primary-container',
  'bg-secondary-container/50 text-on-secondary-container',
  'bg-tertiary-container/50 text-on-tertiary-container'
])

const iconsVisible = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-wrap gap-1 overflow-hidden">
    <div
      v-for="(tag, n) in tags"
      :key="n"
      :class="`${colorArr[n % colorArr.length]}`"
      class="flex items-center justify-center gap-1 rounded-full px-3 py-1 text-title-small font-semibold"
    >
      <Icon
        v-if="iconsVisible"
        :name="`logos:${tag.trim().toLowerCase()}`"
        :title="tag.trim().toLowerCase()"
        class="min-w-5 h-5 shrink-0"
      />
      <span v-else class="text-label-small font-bold capitalize">
        {{ tag }}
      </span>
    </div>
  </div>
</template>
