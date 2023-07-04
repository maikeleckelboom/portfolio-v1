<script lang="ts" setup>
const props = defineProps<{
  item: TimelineItem
}>()

const selected = useState('selected')
</script>

<template>
  <div class="flex flex-col">
    <h1 class="mb-4 text-headline-medium">
      <slot name="title">Schermafbeeldingen</slot>
    </h1>
    <div v-if="item?.timeline_files?.length" class="grid grid-cols-3 gap-4">
      <NuxtLink
        v-for="(attachment, index) in item.timeline_files"
        :to="`/timeline/${item.slug}/files/${attachment.file.id}`"
        class="relative flex aspect-video h-full max-h-[160px] min-h-[80px] w-full min-w-full overflow-hidden rounded-lg border outline-offset-2"
        @click.native="selected = index"
      >
        <NuxtImg
          :alt="attachment.file.filename"
          :class="{ selected: selected === index }"
          :src="attachment.file.filepath"
          class="mx-auto rounded-md object-cover group-hover:opacity-80"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
img.selected {
  view-transition-name: selected;
  contain: layout;
}
</style>
