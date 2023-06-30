<script lang="ts" setup>
useHead({
  title: 'Portfolio | Maikel Eckelboom',
})

const onReportError = (error: Error|unknown ) => {
  console.log('Reporting error from app.vue')
  console.error(error)
}
</script>

<template>
  <NuxtErrorBoundary @error="onReportError">
    <NuxtLayout>
      <NuxtLoadingIndicator :color="useColorGradient()" />
      <NuxtPage />
    </NuxtLayout>
    <VitePwaManifest />
  </NuxtErrorBoundary>
</template>

<style lang="postcss">

</style>
