<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <div class="flex items-center">
    <div
      class="relative mr-4 flex h-fit w-[80px] place-items-center overflow-hidden rounded-lg border-2"
    >
      <NuxtImg
        class="inset-0 h-auto w-auto"
        src="/assets/img/picture-alt.webp"
      />
    </div>
    <ProfileHeroText>
      <template #title> Maikel Eckelboom</template>
      <template #subtitle>
        Full-stack developer met een passie voor ontwerp en technologie.
      </template>
      <template #button>
        <div class="mt-2 inline-flex items-center gap-2">
          <BaseButton>meer over mij</BaseButton>
        </div>
      </template>
    </ProfileHeroText>
  </div>
</template>

<style lang="postcss"></style>
