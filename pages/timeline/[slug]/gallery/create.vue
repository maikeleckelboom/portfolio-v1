<script lang="ts" setup>
import { FileEvent } from 'vscode-languageserver-protocol'

const route = useRoute()

const { data: item } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) => data
  }
)

const files = ref<File[]>([])

const onUploadFiles = (files: File[]) => {
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx!.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')
        const base64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
        $fetch(`/api/timeline/${route.params.slug}/gallery`, {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: JSON.stringify({
            image: base64
          })
        })
      }
    }
    reader.readAsDataURL(file)
  })
}

const onFilesChange = (event: FileEvent) => {
  onUploadFiles(files)
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex h-16 w-full items-start justify-start bg-surface-container"
    >
      <div
        class="mx-auto flex h-full w-full max-w-5xl items-center justify-between"
      >
        <Breadcrumbs />
        <TheSignature />
      </div>
    </div>
    <PageContainer>
      <form>
        <h1 class="mt-6 text-3xl font-bold text-primary">Galerij</h1>
        <fieldset></fieldset>
      </form>
    </PageContainer>
  </div>
</template>
