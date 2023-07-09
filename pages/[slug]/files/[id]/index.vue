<script lang="ts" setup>
import ListText from '~/components/ListText.vue'

definePageMeta({
  title: 'File - Portfolio',
  description: 'File - Portfolio'
})

const route = useRoute()

const router = useRouter()

const { data: fileData, error } = await useAsyncData(
  'timeline-data-file',
  async () =>
    await $fetch(`/api/files/${route.params.id}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (response) => {
      return response.data as IFile
    }
  }
)

const isDeleting = ref<boolean>(false)

const onDelete = async () => {
  if (isDeleting.value) return

  isDeleting.value = true

  const { error } = await $fetch(`/api/files/${route.params.id}`, {
    method: 'DELETE',
    headers: useRequestHeaders(['cookie'])
  })

  isDeleting.value = false

  if (error) {
    console.error(error)
    return
  }

  await router.push(`/${route.params.slug}`)
}
</script>
<template>
  <PageContainer>
    <div v-if="error">
      <p v-if="error.message">{{ error.message }}</p>
      <p v-else>An unexpected error occurred. Please try again later.</p>
    </div>
    <div
      v-if="fileData"
      class="relative flex h-full w-full flex-col gap-4 overflow-hidden p-4"
    >
      <div class="flex">
        <div class="md:max-h-1/2">
          <NuxtImg :src="fileData.filepath" class="selected rounded-md" />
        </div>
      </div>
      <div class="relative flex flex-col">
        <ListText>
          <template #title> Filename</template>
          {{ fileData.filename }}
        </ListText>
        <ListText>
          <template #title> Filepath</template>
          {{ fileData.filepath }}
        </ListText>
        <ListText>
          <template #title> Size</template>
          {{ fileData.size }}
        </ListText>
        <ListText>
          <template #title> Mimetype</template>
          {{ fileData.mimetype }}
        </ListText>
        <ListText>
          <template #title> Created at</template>
          {{ fileData.created_at }}
        </ListText>
        <ListText>
          <template #title> Permanent Destroy</template>
          <button
            :disabled="!fileData || isDeleting"
            class="mt-1 flex items-center justify-center gap-2 rounded-md bg-error-container py-2 pl-4 pr-3 font-semibold text-on-error-container"
            @click="onDelete"
          >
            <span v-if="isDeleting">
              <Icon name="ic:outline-sync" class="animate-spin" />
            </span>
            <template v-else>
              Delete
              <Icon name="ic:outline-delete" />
            </template>
          </button>
        </ListText>
      </div>
    </div>
  </PageContainer>
</template>
