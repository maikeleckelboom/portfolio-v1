<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <TopAppHeader>
    <template #leading-icons>
      <TheLogo />
    </template>
    <template #title>Portfolio</template>
    <template #trailing-icons></template>
  </TopAppHeader>
  <PageContainer>
    <div class="flex flex-col">
      <div class="grid grid-cols-[auto,1fr] gap-3.5 px-2 py-4">
        <div
          class="h-ful group relative flex flex-col items-center justify-start pr-3"
        >
          <NuxtLink to="/picture" @click.native="selected = 'picture'">
            <NuxtImg
              :class="{ selected: selected === 'picture' }"
              :modifiers="{ grayscale: true }"
              alt="Maikel Eckelboom"
              class="rounded-full border border-surface-container-high bg-surface-container"
              src="picture.webp"
              width="80"
            />
          </NuxtLink>
          <div
            class="absolute right-0 top-2 flex h-[60px] w-[1px] rounded-md bg-outline-variant"
          />
        </div>
        <ProfileHero>
          <template #title> Maikel Eckelboom</template>
          <template #subtitle>
            Full-stack developer met een passie voor ontwerp en technologie.
          </template>
          <template #supportingText>
            <!--            Dagelijks bezig met ontwikkeling, ontwerp en onderhoud van-->
            <!--            webapplicaties.-->
          </template>
          <template #button>
            <!--          <NuxtLink to="/profile" @click.native="selected = 'profile'">-->
            <!--            <BaseButton> Meer over mij</BaseButton>-->
            <!--          </NuxtLink>-->
          </template>
        </ProfileHero>
      </div>
      <div>
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
