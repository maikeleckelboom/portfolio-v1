<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-start">
      <!--      <div-->
      <!--        class="relative mr-4 flex w-fit items-start justify-start rounded-full"-->
      <!--      >-->
      <!--        <NuxtLink to="/picture">-->
      <!--          <NuxtImg-->
      <!--            class="w-[68px] rounded-full object-cover"-->
      <!--            format="webp"-->
      <!--            src="/assets/img/picture-alt-circle.webp"-->
      <!--            width="68"-->
      <!--          />-->
      <!--        </NuxtLink>-->
      <!--      </div>-->
      <ProfileHeroText>
        <template #title> Maikel Eckelboom</template>
        <template #subtitle>
          Full-stack developer met een passie voor ontwerp en technologie.
        </template>
        <template #button>
          <div class="flex flex-col">
            <div class="mt-2 inline-flex items-center gap-2">
              <NuxtLink to="/profile">
                <BaseButton>over mij</BaseButton>
              </NuxtLink>
            </div>
            <!--            <TheSocials />-->
          </div>
        </template>
      </ProfileHeroText>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
img {
  view-transition-name: picture;
}
</style>
