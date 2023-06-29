<script lang="ts" setup>
import FilePlaceholderImage from '~/components/FilePlaceholderImage.vue'
import { ITimelineItem } from '~/types/portfolio'
import { WritableComputedRef } from '@vue/reactivity'
import { ComputedRef } from 'vue'

type FileMeta = {
  name: string
  description: string
}

interface FormModel {
  id: string
  file: Blob
  url: string
  meta: FileMeta
  selected: boolean
}

type FormModelArray = FormModel[]

const route = useRoute()

const { data: item } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) => data as ITimelineItem
  }
)

const files = shallowRef<FileList | null>()

const fileCounter = computed(() => formModel.value?.length ?? 0)

const formModel = ref<FormModelArray>([])

const buildFileModel = (file: Blob) => ({
  id: window.crypto.randomUUID(),
  file,
  url: useObjectUrl(file).value,
  selected: false,
  meta: {
    name: '',
    description: ''
  }
})

watch(files, () => {
  if (!process.client || !files.value) return
  const newData = Array.from(files.value).map((file: Blob) =>
    buildFileModel(file)
  )
  formModel.value = [...formModel.value, ...newData]
  files.value = null
})

const upload = async () => {
  if (!formModel.value.length) return
  const formData = new FormData()
  formModel.value
    .map((f) => f.file)
    .forEach((file: Blob, index) => formData.append(String(index), file))
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

  formModel.value = []

  return { data, error }
}

const router = useRouter()

const onSubmit = async () => {
  await upload()
  await router.push(`/timeline/${route.params.slug}`)
}

const onFilesChange = (_files) => {
  formModel.value = [...formModel.value, ..._files.map(buildFileModel)]
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
    <PageContainer class="px-4">
      <h1 class="mb-6 mt-3 text-headline-large font-bold">
        Bestanden toevoegen
      </h1>
      <div class="grid grid-cols-2">
        <div>
          <!-- Files -->
          <form @submit.prevent="onSubmit">
            <Dropzone
              class="flex h-[280px] w-full min-w-fit flex-wrap gap-4 rounded-md border-2 border-dashed p-4"
              @drop="onFilesChange"
            >
              <div
                v-for="(_, key) in fileCounter"
                :key="key"
                class="relative grid aspect-square w-[180px] flex-shrink-0 flex-grow place-content-center overflow-clip rounded-md border border-outline bg-surface-level-1"
              >
                <img
                  v-if="formModel[key].url"
                  :alt="`Upload #${key}`"
                  :src="formModel[key].url"
                  class="h-full w-full rounded-md object-cover"
                />
                <div
                  v-else
                  class="relative z-10 h-full w-full animate-pulse bg-secondary-container/50 text-on-secondary-container"
                >
                  <!-- -->
                </div>
              </div>
            </Dropzone>
            <div class="mt-4 flex justify-end">
              <BaseButton
                :disabled="!fileCounter"
                class="mt-4 h-[40px]"
                type="submit"
              >
                Upload
              </BaseButton>
            </div>
          </form>
        </div>
        <div>
          <!-- Meta -->
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
