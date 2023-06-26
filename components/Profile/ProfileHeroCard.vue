<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <div class="flex items-start">
    <div
      class="relative mr-4 flex aspect-square w-fit items-start justify-start rounded-full pt-1 md:pt-0"
    >
      <NuxtLink to="/picture">
        <NuxtImg
          class="rounded-full border object-cover"
          format="webp"
          src="/assets/img/picture-alt-circle.webp"
        />
      </NuxtLink>
    </div>
    <ProfileHeroText>
      <template #title> Maikel Eckelboom</template>
      <template #subtitle>
        Full-stack developer met een passie voor ontwerp en technologie.
      </template>
      <template #button>
        <div class="mt-2 inline-flex items-center gap-2">
          <NuxtLink to="/profile">
            <BaseButton>over mij</BaseButton>
          </NuxtLink>
        </div>
      </template>
    </ProfileHeroText>
  </div>
</template>

<style lang="postcss" scoped>
img {
  view-transition-name: picture;
}
</style>
