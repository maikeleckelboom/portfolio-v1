<script lang="ts" setup>
useHead({
  title: 'Portfolio | Maikel Eckelboom'
})

const onReportError = (error: Error | unknown) => {
  console.log('Reporting error from app.vue', error)
}
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="useColorGradient()" />
    <NuxtPage />
  </NuxtLayout>

  <!--  <ClientOnly>-->
  <!--    <BottomSheet v-if="isOpened" @close="toggleSheet">-->
  <!--      <div-->
  <!--        class="relative flex flex-col gap-2 overflow-hidden md:col-start-2 md:row-start-1 xl:pt-16"-->
  <!--      >-->
  <!--        <TimelineItemTextContent :data="itemData" />-->
  <!--      </div>-->
  <!--    </BottomSheet>-->
  <!--  </ClientOnly>-->
  <!--  <BaseButton class="col-start-2" @click="toggleSheet">-->
  <!--    <Icon name="ic:round-add" />-->
  <!--    Open sheet-->
  <!--  </BaseButton>-->
  <VitePwaManifest />
</template>

<style lang="postcss"></style>
