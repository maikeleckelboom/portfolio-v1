<script lang="ts" setup>
interface ClientFormModel {
  id: string
  url: string
  file: Blob
}

interface Props {
  timelineId: number
  files?: FileList | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (ev: 'refresh'): void
}>()

const files = shallowRef<FileList | null>(props.files ?? null)

const route = useRoute()

const fileCounter = computed(() => formModel.value?.length ?? 0)

const formModel = ref<ClientFormModel[]>([])

const buildFileModel = (file: Blob) => ({
  id: window.crypto.randomUUID(),
  url: useObjectUrl(file).value,
  file
})

watch(files, () => {
  if (!process.client || !files.value) return
  const newData = Array.from(files.value).map((file: Blob) =>
    buildFileModel(file)
  )
  formModel.value = [...formModel.value, ...newData]
})

const onSubmit = async () => {
  if (!formModel.value) return
  const formData = new FormData()
  formData.append('id', String(props.timelineId))
  formModel.value.forEach((row, index) => {
    formData.append(String(index), row.file)
  })
  const { error: fileError } = await $fetch(
    `/api/timeline/${route.params.slug}/files`,
    {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: formData
    }
  )

  if (fileError) {
    console.error(fileError)
    return
  }

  // await toast('Bestanden geüpload', 'success')

  formModel.value = []

  emit('refresh')
}

const onFilesChange = (_files) => {
  formModel.value = [
    ...formModel.value,
    ...Array.from(_files).map((file: Blob) => buildFileModel(file))
  ]
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Dropzone
      class="flex h-[280px] w-full min-w-fit flex-wrap gap-4 rounded-md border-2 border-dashed p-4"
      @drop="onFilesChange"
    >
      <div
        v-for="(_, key) in fileCounter"
        :key="key"
        class="relative flex grid flex-shrink-0 flex-grow place-content-center overflow-clip rounded-md border border-outline bg-surface-level-1"
      >
        <NuxtImg
          v-if="formModel[key].url"
          :src="formModel[key].url"
          class="h-full w-full max-w-[100px] rounded-md object-cover"
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
        class="w-full max-w-[180px] bg-primary text-on-primary"
        type="submit"
      >
        Uploaden ({{ fileCounter }})
      </BaseButton>
    </div>
  </form>
</template>
