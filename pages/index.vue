<script lang="ts" setup>
const profileHeroCard = ref<HTMLElement>()
</script>

<template>
  <!--  <TopAppHeader class="relative">-->
  <!--    <template #leading-icons>-->
  <!--      <NuxtLink class="flex h-full w-full items-center justify-center" to="/">-->
  <!--        <TheLogo />-->
  <!--      </NuxtLink>-->
  <!--    </template>-->
  <!--    <template #title></template>-->
  <!--    <template #trailing-icons></template>-->
  <!--  </TopAppHeader>-->
  <PageContainer>
    <div class="mt-8 grid gap-x-4 gap-y-12 md:grid-cols-[420px,1fr]">
      <div class="flex flex-col">
        <ProfileHeroCard ref="profileHeroCard" />
      </div>
      <div class="">
        <Experiences />
      </div>
    </div>
  </PageContainer>
</template>

<style>
html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}
</style>
