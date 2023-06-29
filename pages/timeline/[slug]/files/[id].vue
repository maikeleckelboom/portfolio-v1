<script lang="ts" setup>
import ListText from '~/components/ListText.vue'
import { IFile } from '~/types/portfolio'

const route = useRoute()

const { data: item, error } = await useAsyncData(
  'timeline-item-file',
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
</script>
<template>
  <PageContainer>
    <div
      v-if="item"
      class="relative flex h-full w-full flex-col gap-4 overflow-hidden p-4"
    >
      <div class="flex">
        <div class="max-h-1/2">
          <NuxtImg :src="item.filepath" />
        </div>
      </div>

      <!-- If is admin -->
      <div class="relative flex flex-col">
        <ListText>
          <template #title> Filename</template>
          {{ item.filename }}
        </ListText>
        <ListText>
          <template #title> Filepath</template>
          {{ item.filepath }}
        </ListText>
        <ListText>
          <template #title> Size</template>
          {{ item.size }}
        </ListText>
        <ListText>
          <template #title> Mimetype</template>
          {{ item.mimetype }}
        </ListText>
      </div>
    </div>
  </PageContainer>
</template>
