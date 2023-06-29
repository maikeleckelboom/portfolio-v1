<script lang="ts" setup>
import ListText from '~/components/ListText.vue'
import { IFile } from '~/types/portfolio'

definePageMeta({
  title: 'File - Portfolio',
  description: 'File - Portfolio'
})

const route = useRoute()

const router = useRouter()

const { data, error } = await useAsyncData(
  'timeline-data-file',
  async () =>
    await $fetch(
      `/api/timeline/${route.params.slug}/files/${route.params.id}`,
      {
        method: 'GET',
        headers: useRequestHeaders(['cookie'])
      }
    ),
  {
    transform: (res) => res.data.at(0) as IFile
  }
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    cause: error.value
  })
}

const onDelete = async () => {
  const { data, error } = await $fetch(
    `/api/timeline/${route.params.slug}/files/${route.params.id}`,
    {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie'])
    }
  )

  if (error) {
    console.error(error)
  }

  if (data) {
    await router.push(`/timeline/${route.params.slug}`)
  }
}
</script>
<template>
  <PageContainer>
    <div
      v-if="data"
      class="relative flex h-full w-full flex-col gap-4 overflow-hidden p-4"
    >
      <div class="flex">
        <div class="md:max-h-1/2">
          <NuxtImg :src="data.filepath"  class="rounded-md"/>
        </div>
      </div>
      <!-- If is admin -->
      <div class="relative flex flex-col">
        <div class="flex gap-4">
          <BaseButton
            :disabled="!data"
            :loading="!data"
            class=""
            @click="onDelete"
          >
            Delete
          </BaseButton>
        </div>
        <ListText>
          <template #title> Filename</template>
          {{ data.filename }}
        </ListText>
        <ListText>
          <template #title> Filepath</template>
          {{ data.filepath }}
        </ListText>
        <ListText>
          <template #title> Size</template>
          {{ data.size }}
        </ListText>
        <ListText>
          <template #title> Mimetype</template>
          {{ data.mimetype }}
        </ListText>
      </div>
    </div>
  </PageContainer>
</template>
