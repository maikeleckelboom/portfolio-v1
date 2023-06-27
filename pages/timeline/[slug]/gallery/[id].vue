<script lang="ts" setup>
const route = useRoute()

const { data: item, error } = await useAsyncData(
  'timeline-item',
  async () =>
    await $fetch(
      `/api/timeline/${route.params.slug}/gallery/${route.params.id}`,
      {
        method: 'GET',
        headers: useRequestHeaders(['cookie'])
      }
    ),
  {
    transform: ({ data }) => data
  }
)
</script>
<template>
  <diV>
    <pre>{{ item }}</pre>
  </diV>
</template>
