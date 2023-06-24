<script lang="ts" setup></script>

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
    <div class="grid gap-y-12 md:grid-cols-[420px,1fr]">
      <div class="">
        <ProfileHeroCard />
      </div>
      <div class="">
        <h1 class="text-title-large">Werkervaring</h1>
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
