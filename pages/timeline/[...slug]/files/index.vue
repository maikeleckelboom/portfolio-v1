<script lang="ts" setup>

const route = useRoute()

const { data, error } = await useAsyncData(
  'timeline-item-files',
  async () =>
    await $fetch(`/api/timeline/${route.params.slug}/files`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (response) => response.data
  }
)
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
