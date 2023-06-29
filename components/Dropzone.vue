<script lang="ts" setup>
import DropzoneCard from '~/components/DropzoneCard.vue'

const dropZoneRef = ref<HTMLDivElement>()

const emit = defineEmits<{
  (e: 'drop', files: File[] | null): void
  (e: 'dragover', isOver: boolean): void
}>()

const onDrop = (files: File[] | null) => {
  emit('drop', files)
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

watch(isOverDropZone, (isOver) => {
  emit('dragover', isOver)
})
</script>

<template>
  <div
    ref="dropZoneRef"
    class="flex h-auto max-h-fit w-fit max-w-full flex-wrap gap-4 rounded-md border border-dashed p-4"
  >
    <slot />
    <DropzoneCard>
      <input
        id="files"
        accept="image/*"
        class="sr-only"
        multiple
        name="files"
        type="file"
        @change.prevent="onDrop($event.target.files)"
      />
    </DropzoneCard>
  </div>
</template>
