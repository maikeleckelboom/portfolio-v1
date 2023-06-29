<script lang="ts" setup>
import FilePlaceholderImage from '~/components/FilePlaceholderImage.vue'
import { ITimelineItem } from '~/types/portfolio'

const route = useRoute()

const { data: item } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) => data[0] as ITimelineItem
  }
)

const files = shallowRef<FileList>()

const fileCounter = computed(() => files.value?.length ?? 0)

const filePreviews = computed(() => {
  if (!files.value) return
  return Array.from(files.value).map((file: Blob) => useObjectUrl(file))
})

const onFilesChange = (_files) => {
  files.value = _files
}

const upload = async () => {
  if (!files.value) return
  const formData = new FormData()
  Array.from(files.value).forEach((file: Blob, index) =>
    formData.append(String(index), file)
  )
  formData.append('id', item.value!.id.toString())
  const { data, error } = await $fetch(
    `/api/timeline/${route.params.slug}/files`,
    {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: formData
    }
  )

  if (error) {
    console.error(error)
  }

  return { data, error }
}

const router = useRouter()

const onSubmit = async () => {
  const { data, error } = await upload()
  if (error) {
    console.error(error)
    return
  }

  console.log('uploaded', data)
  await router.push(`/timeline/${route.params.slug}`)
}

const selected = ref<{
  file: File
  index: number
  metaData?: Record<string, string>
}>()

const metaData = ref()

const onFileClick = (index: number) => {
  if (!filePreviews.value) return
  const selectedFile = filePreviews.value?.[index]
  console.log('clicked', index, selectedFile)
  selected.value = {
    file: files.value?.item(index),
    index,
    metaData: metaData.value[index]
  }
}
</script>

<template>
  <div class="flex flex-col">
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
    <PageContainer class="">
      <h1 class="mb-4 mt-6 text-headline-large font-bold text-secondary">
        Bestanden toevoegen
      </h1>
      <div class="grid grid-cols-2">
        <div>
          <form @submit.prevent="onSubmit">
            <h2 class="mb-4 text-headline-small">Upload afbeeldingen</h2>
            <Dropzone
              class="flex h-[280px] w-full flex-wrap gap-4 rounded-md border-2 border-dashed p-4"
              @drop="onFilesChange"
            >
              <div
                v-for="(_, key) in fileCounter"
                :key="key"
                class="relative grid aspect-square w-[180px] flex-shrink-0 flex-grow place-content-center overflow-clip rounded-md border border-outline bg-surface-level-1"
                @click="onFileClick(key)"
              >
                <img
                  v-if="filePreviews[key]?.value"
                  :alt="`Upload #${key}`"
                  :src="filePreviews[key]?.value"
                  class="h-full w-full rounded-md object-cover"
                />
                <div
                  v-else
                  class="relative z-10 h-full w-full bg-secondary-container/50 text-on-secondary-container"
                >
                  <FilePlaceholderImage />
                </div>
              </div>
            </Dropzone>
            <div>
              <BaseButton :disabled="!fileCounter" class="mt-4" type="submit">
                Upload
              </BaseButton>
            </div>
          </form>
        </div>
        <div>
          <h2 class="mb-4 text-headline-small">Options for [selected]</h2>
          {{ selected }}
        </div>
      </div>
    </PageContainer>
  </div>
</template>

<style>
.text-wrap-balance {
  text-wrap: balance;
}
</style>
