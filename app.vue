<script lang="ts" setup>
useHead({
  title: 'Maikel - Portfolio'
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="useColorGradient()" />
    <NuxtPage />
  </NuxtLayout>
  <VitePwaManifest />
</template>

<style lang="postcss">
body {
  @apply bg-background text-on-background;
}
</style>
