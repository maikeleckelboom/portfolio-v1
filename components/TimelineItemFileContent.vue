<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

const props = defineProps<{
  data: ITimelineItem
}>()

const isSelected = useState()
</script>

<template>
  <div class="flex flex-col">
    <h1 class="mb-4 text-headline-medium">
      <slot name="title">Schermafbeeldingen</slot>
    </h1>
    <div v-if="data?.timeline_files?.length" class="grid grid-cols-3 gap-4">
      <NuxtLink
        v-for="attachment in data.timeline_files"
        :to="`/timeline/${data.slug}/files/${attachment.file.id}`"
        class="relative flex h-full max-h-[160px] min-h-[80px] w-full min-w-full overflow-hidden rounded-lg border outline-offset-2"
        @click.native="isSelected = true"
      >
        <NuxtImg
          :alt="attachment.file.filename"
          :class="{ 'selected-image': isSelected }"
          :src="attachment.file.filepath"
          class="mx-auto rounded-md object-cover group-hover:opacity-80"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.selected-image {
  view-transition-name: 'selected-image';
}
</style>
