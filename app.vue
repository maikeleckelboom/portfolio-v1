<script lang="ts" setup>
useHead({
  name: 'Portfolio - Maikel Eckelboom',
  meta: [
    {
      name: 'description',
      content: ''
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="useColorGradient()"/>
    <NuxtPage/>
  </NuxtLayout>
  <VitePwaManifest/>
</template>
