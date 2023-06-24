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
    <div class="grid gap-x-4 md:grid-cols-[420px,1fr]">
      <div class="flex flex-col">
        <ProfileHeroCard />
      </div>
      <div class="flex flex-col">
        <Experiences />
      </div>
    </div>
    <div class="flex w-full flex-col items-center justify-start">
      <svg
        class="hand-signature absolute bottom-4 left-6 -z-10 h-8 mix-blend-hard-light"
        data-signature="true"
        fill="var(--md-sys-color-on-surface-variant)"
        viewBox="3.05 23.76 46.83 58.76"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.94 81.96000000000001 c-0.18 0.66 -1.02 0.9 -0.78 -0.18 s5.58 -20.7 7.68 -33 c2.1 -12.36 3.96 -23.34 1.8 -23.34 c-2.1 0 -8.04 4.68 -17.46 17.52 c-9.42 12.96 -12 19.08 -13.44 19.08 c-2.58 0 -0.66 -6.84 0 -15.12 c0.6 -7.32 1.98 -16.38 -0.3 -16.38 c-1.98 0 -7.5 7.32 -10.2 18 c-2.4 9.66 -2.7 17.82 -1.2 19.5 c1.02 1.2 0.18 1.62 -0.72 0.54 c-1.92 -2.46 -1.62 -12.06 0.6 -20.46 c2.4 -8.7 7.92 -18.78 11.34 -18.78 c3.72 0 1.98 13.38 1.56 17.58 c-0.48 4.8 -2.28 13.8 -1.02 13.8 c0.12 0 5.28 -9.48 12.12 -18.42 c6.84 -9.06 14.7 -18.54 18.66 -18.54 c3.6 0 2.52 9.54 -0.18 25.02 c-2.58 15 -7.26 28.86 -8.46 33.18 z"
        />
      </svg>
    </div>
  </PageContainer>
</template>

<style>
.hand-signature {
}

html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}
</style>
