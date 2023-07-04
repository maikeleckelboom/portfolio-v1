<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'
import { Ref } from 'vue'

const route = useRoute()

const { data, refresh } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (response) =>
      ({
        ...response.data,
        dates: getDates(response.data)
      } as ITimelineItem)
  }
)

const dataModel = ref() as Ref<ITimelineItem>

watch(
  data,
  () => {
    if (!data.value) return
    dataModel.value = data.value!
  },
  { immediate: true, deep: true }
)

const onDeleteFile = async (id: number) => {
  setAction(id, 'delete')

  const { error } = await $fetch(
    `/api/timeline/${route.params.slug}/files/${id}`,
    {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie'])
    }
  )

  setAction(id, null)

  if (error) {
    console.error(error)
  }

  // await toast('File deleted', 'success')

  await refresh()
}

const actionName = ref<LoadingAction>(null)
const actionId = ref<number | null>(null)

type LoadingAction = 'delete' | 'edit' | null
const setAction = (id, action: LoadingAction) => {
  if (actionId.value === id && action === null) {
    actionId.value = null
  } else {
    actionId.value = id
  }
  actionName.value = action
}

const onEditFileMetadata = async (id: number) => {
  setAction(id, 'edit')
  await refresh()
  setTimeout(() => {
    setAction(id, null)
  }, 1000)
}

const onSubmit = async () => {
  const response = await $fetch(`/api/timeline/${route.params.slug}`, {
    method: 'POST',
    headers: useRequestHeaders(['cookie']),
    body: JSON.stringify(dataModel.value)
  })

  if (response.error) {
    console.error(response.error)
  }
}

const files = shallowRef<FileList | null>()

const onDrop = (droppedFiles) => {
  files.value = droppedFiles
}

const onSubmitFiles = () => {
  console.log('submitting files', files.value)
  // onUpload()
}

const onUpload = async () => {
  console.log('uploading', files.value)

  if (!files.value) return

  const formData = new FormData()
  Array.from(files.value).forEach((file, index) => {
    formData.append(String(index), file)
  })

  formData.append('id', dataModel.value!.id.toString())

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

  files.value = null

  return { data, error }
}
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start bg-surface-container">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-2"
    >
      <Breadcrumbs />
      <TheSignature />
    </div>
  </div>
  <PageContainer class="px-4 pb-8 pt-6">
    <div class="">
      <div v-if="data" class="relative flex flex-col gap-2 overflow-hidden">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div class="relative flex flex-col overflow-clip">
            <h1 class="mb-4 text-headline-medium">
              <!-- -->
            </h1>
            <form @submit.prevent="onSubmit">
              <fieldset class="mb-4 flex flex-col">
                <label
                  class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                  for="role-name"
                >
                  Functietitel
                </label>
                <!-- -->
                <input
                  id="role-name"
                  v-model="dataModel.roleName"
                  class="rounded-xl border border-outline-variant bg-surface p-4"
                  type="text"
                />
              </fieldset>
              <fieldset class="mb-4 flex flex-col">
                <label
                  class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                  for="employment"
                >
                  Dienstverband
                </label>
                <!-- -->
                <input
                  id="employment"
                  v-model="dataModel.contractType"
                  class="rounded-xl border border-outline-variant bg-surface p-4"
                  type="text"
                />
              </fieldset>
              <fieldset class="mb-4 flex flex-col">
                <label
                  class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                  for="company-name"
                >
                  Bedrijfsnaam
                </label>
                <!-- -->
                <input
                  id="company-name"
                  v-model="dataModel.companyName"
                  class="rounded-xl border border-outline-variant bg-surface p-4"
                  type="text"
                />
              </fieldset>
              <fieldset class="mb-4 flex flex-col">
                <label
                  class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                  for="company-description"
                >
                  Bedrijfsomschrijving
                </label>
                <textarea
                  id="company-description"
                  v-model="dataModel.companyDescription"
                  class="p-4"
                />
              </fieldset>
              <fieldset class="mb-4 flex flex-col">
                <label
                  class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                  for="company-location"
                >
                  Bedrijfslocatie
                </label>
                <!-- -->
                <input
                  id="company-location"
                  v-model="dataModel.companyLocation"
                  class="rounded-xl border border-outline-variant bg-surface p-4"
                  type="text"
                />
              </fieldset>
              <fieldset class="mb-4 flex flex-col">
                <div class="grid grid-cols-2 gap-4">
                  <!-- dateStart, dateEnd -->
                  <div class="flex flex-col">
                    <label
                      class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                      for="dateStart"
                    >
                      Startdatum
                    </label>
                    <input
                      id="dateStart"
                      v-model="dataModel.dateStart"
                      class="rounded-xl border border-outline-variant bg-surface p-4"
                      type="date"
                    />
                  </div>
                  <div class="flex flex-col">
                    <label
                      class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                      for="dateEnd"
                    >
                      Einddatum
                    </label>
                    <input
                      id="dateEnd"
                      v-model="dataModel.dateEnd"
                      class="rounded-xl border border-outline-variant bg-surface p-4"
                      type="date"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset class="mb-4 flex flex-col">
                <label
                  class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                  for="role-description"
                >
                  Taken en verantwoordelijkheden
                </label>
                <AppTextEditor
                  id="role-description"
                  v-model="data.roleDescription"
                />
              </fieldset>
              <div>
                <button
                  class="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-bold text-on-primary hover:bg-primary/90 active:bg-primary/80"
                  type="submit"
                  @click="onSubmit"
                >
                  <span>Wijzigingen opslaan</span>
                </button>
              </div>
            </form>
          </div>

          <div class="relative mb-8 flex flex-col overflow-clip">
            <h1 class="mb-4 text-headline-medium">
              <!-- Schermafbeeldingen -->
            </h1>
            <div class="mb-7">
              <label
                class="mb-2.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
                for="files"
              >
                Schermafbeeldingen
              </label>
              <TimelineDropzone
                :timeline-id="dataModel.id!"
                @refresh="refresh"
              />
            </div>
            <ul
              v-if="dataModel?.timeline_files"
              class="col-span-full col-start-1 grid grid-cols-3 gap-4"
            >
              <li
                v-for="attachment in dataModel.timeline_files"
                class="group relative flex w-full min-w-full overflow-clip rounded-md border outline-offset-2"
              >
                <NuxtLink
                  v-for="attachment in data.timeline_files"
                  :to="`/timeline/${data.slug}/files/${attachment.file.id}`"
                  class="relative flex h-full max-h-[160px] min-h-[80px] w-full min-w-full overflow-hidden rounded-lg border outline-offset-2"
                >
                  <NuxtImg
                    :alt="attachment.file.filename"
                    :src="attachment.file.filepath"
                    class="mx-auto rounded-md object-cover group-hover:opacity-80"
                  />
                </NuxtLink>
                <!-- File Crud Bar / Toolbar -->
                <div
                  class="absolute inset-x-1 bottom-2 z-20 flex flex-wrap justify-end gap-1 @container md:inset-x-2 md:gap-2"
                >
                  <button
                    class="w-fit overflow-clip rounded-md bg-secondary-container px-2.5 py-1.5 font-semibold text-on-secondary-container group-hover:visible"
                    @click="onEditFileMetadata(attachment.file.id)"
                  >
                    <span
                      v-if="
                        actionName === 'edit' && actionId === attachment.file.id
                      "
                    >
                      <Icon class="h-5 w-5" name="line-md:loading-loop" />
                    </span>
                    <span v-else class="overflow-clip">
                      Edit
                      <span class="sr-only">metadata</span>
                    </span>
                  </button>
                  <button
                    class="w-fit rounded-md border-error-container bg-error-container px-2.5 py-1.5 font-semibold text-on-error-container group-hover:visible"
                    @click="onDeleteFile(attachment.file.id)"
                  >
                    <span
                      v-if="
                        actionName === 'delete' &&
                        actionId === attachment.file.id
                      "
                      class="mx-4"
                    >
                      <Icon class="h-5 w-5" name="line-md:loading-loop" />
                    </span>
                    <span v-else> Delete </span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>
