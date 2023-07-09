<script lang="ts" setup>
const props = defineProps<{
  item: TimelineItem
}>()

const selected = useState('selected')

const setSelected = async (index: number) => {
  selected.value = index
}
</script>

<template>
  <div v-if="item?.timeline_files?.length" class="flex flex-col">
    <h1 class="mb-4 text-headline-medium">
      <slot name="title">Schermafbeeldingen</slot>
    </h1>
    <div class="grid grid-cols-3 gap-4" id="timeline-item-files">
      <NuxtLink
        v-for="(fileList, index) in item.timeline_files"
        :to="`/${item.slug}/files/${fileList.file.id}`"
        class="relative flex aspect-video h-full max-h-[160px] min-h-[80px] w-full min-w-full overflow-hidden rounded-lg border outline-offset-2"
        @click.native="setSelected(index)"
      >
        <NuxtImg
          :alt="fileList.file.filename"
          :class="{ selected: selected === index }"
          :src="fileList.file.filepath"
          class="mx-auto rounded-md object-cover group-hover:opacity-80"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style>
@import 'assets/css/keyframes.css';

#timeline-item-files {
  view-transition-name: timeline-item-files;
}

::view-transition-new(timeline-item-files) {
  animation-name: fade-in-up;
}

::view-transition-new(timeline-item-files):only-child {
  animation-delay: 500ms;
}
</style>
