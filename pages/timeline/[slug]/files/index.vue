<script lang="ts" setup>
import { IFile } from '~/types/portfolio'

const route = useRoute()

const { data, error } = await useAsyncData(
  'timeline-item-files',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}/files`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (res) => res.data as IFile[]
  }
)

/*
  This function makes a plain array of objects into a nested array of objects,
  where each object has a property called 'children' which is an array of objects.
  The objects in the 'children' array are the objects that have a property called 'parent_id'
  which matches the 'id' of the parent object.

 */

const createMasonryGrid = () => {
  if (!data.value) return
  return (data.value as IFile[]).reduce((acc, file) => {
    if (file?.parent_id === null) {
      acc.push({ ...file, children: [] })
    } else {
      const parent = acc.find((item) => item.id === file?.parent_id)
      if (parent) {
        parent.children.push(file)
      }
    }
    return acc
  }, [])
}

const nestedFiles = computed(() => {
  if (process.server) return
})
</script>
<template>
  <div
    class="flex h-16 w-full items-start justify-start bg-surface-container px-4"
  >
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between"
    >
      <Breadcrumbs />
      <TheSignature />
    </div>
  </div>
  <PageContainer>
    <div class="p-4">
      <pre>{{ data }}</pre>
    </div>
  </PageContainer>
</template>
