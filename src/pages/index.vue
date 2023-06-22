<script lang="ts" setup>
import ProfileHeroCard from '~/components/Profile/ProfileHeroCard.vue'
</script>

<template>
  <TopAppHeader>
    <template #leading-icons>
      <NuxtLink class="flex h-full w-full items-center justify-center" to="/">
        <TheLogo />
      </NuxtLink>
    </template>
    <template #title>Portfolio</template>
    <template #trailing-icons></template>
  </TopAppHeader>
  <PageContainer>
    <div class="">
      <ProfileHeroCard />
    </div>
    <div class="">
      <Experiences />
    </div>
  </PageContainer>
</template>

<style>
html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}
</style>
