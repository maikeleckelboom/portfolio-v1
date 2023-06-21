<script lang="ts" setup>
const selected = useState()
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
    <div class="grid-cols-container grid">
      <div class="flex w-full flex-col items-center justify-start">
        <NuxtLink to="/picture" @click.native="selected = 'picture'">
          <NuxtImg
            :class="{ selected: selected === 'picture' }"
            alt="Maikel Eckelboom"
            class="rounded-full border border-outline-variant bg-surface-container"
            preset="picture"
            src="picture.webp"
          />
        </NuxtLink>
      </div>
      <ProfileHero>
        <template #title> Maikel Eckelboom</template>
        <template #subtitle>
          Full-stack developer met een passie voor ontwerp en technologie.
        </template>
        <template #supportingText>
          <!--          Creatief, analytisch en een teamspeler.-->
        </template>
      </ProfileHero>
    </div>
    <Experiences />
  </PageContainer>
</template>

<style>
html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}
</style>
