<script lang="ts" setup>
import ListText from '~/components/ListText.vue'

definePageMeta({
  title: 'File - Portfolio',
  description: 'File - Portfolio'
})

const route = useRoute()

const router = useRouter()

const { data, error } = await useAsyncData(
  'timeline-data-file',
  async () =>
    await $fetch(`/api/files/${route.params.id}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (response) => {
      return response.data
    }
  }
)

const isBusyDelete = ref<boolean>(false)
const onDelete = async () => {
  if (isBusyDelete.value) return

  isBusyDelete.value = true

  const { error } = await $fetch(`/api/files/${route.params.id}`, {
    method: 'DELETE',
    headers: useRequestHeaders(['cookie'])
  })

  isBusyDelete.value = false

  if (error) {
    console.error(error)
    return
  }

  await router.push(`/timeline/${route.params.slug}`)
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
          <NuxtImg :src="data.filepath" class="rounded-md" />
        </div>
      </div>
      <!-- If is admin -->
      <div class="relative flex flex-col">
        <div class="flex gap-4">
          <BaseButton
            :disabled="!data || isBusyDelete"
            :loading="!data || isBusyDelete"
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

<style scoped>
img {
  view-transition-name: selected;
}
</style>
