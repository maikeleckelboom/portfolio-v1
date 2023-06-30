<script lang="ts" setup>
import DropzoneCard from '~/components/DropzoneCard.vue'

const props = defineProps<{
  uuid?: string
}>()

const uuid = props.uuid || 'dropzone-id'

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
  <label
    ref="dropZoneRef"
   :for="uuid"
    class="flex h-auto max-h-fit w-fit max-w-full flex-wrap gap-4 rounded-md border border-dashed p-4"
  >
    <slot />
    <DropzoneCard>
      <input
        :id="uuid"
        accept="image/*"
        class="sr-only"
        multiple
        name="files"
        type="file"
        @change.prevent="onDrop($event.target.files)"
      />
    </DropzoneCard>
  </label>
</template>
