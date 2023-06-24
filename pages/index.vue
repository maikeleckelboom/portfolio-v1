<script lang="ts" setup></script>

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
      <DarkToggleButton />

      <div class="flex flex-col gap-y-4 p-12">
        <Tooltip
          subhead="Subhead Tooltip"
          text="Supporting Text"
          variant="plain"
        />
        <Tooltip
          :buttons="[
            { label: 'Action 1', onClick: () => console.log('Action 1') },
            { label: 'Action 2', onClick: () => console.log('Action 2') }
          ]"
          subhead="Subhead Tooltip"
          text="Supporting Text"
          variant="rich"
        />
      </div>
      <div class="">
        <ProfileHeroCard />
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
