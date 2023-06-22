<script lang="ts" setup>
const selected = useState()
</script>
<template>
  <div class="grid-cols-container grid">
    <div
      class="flex w-full flex-col items-end justify-start pl-2.5 pr-0 pt-1 md:pt-0"
    >
      <NuxtLink to="/picture" @click.native="selected = 'picture'">
        <NuxtImg
          :class="{ selected: selected === 'picture' }"
          alt="Maikel Eckelboom"
          class="h-full w-full rounded-full border border-outline-variant bg-surface-container"
          height="54"
          preset="avatar"
          src="picture.webp"
          width="54"
        />
      </NuxtLink>
    </div>
    <ProfileHeroText>
      <template #title> Maikel Eckelboom</template>
      <template #subtitle>
        Full-stack developer met een passie voor ontwerp en technologie.
      </template>
    </ProfileHeroText>
  </div>
</template>
