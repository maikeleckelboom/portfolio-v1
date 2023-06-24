<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <div class="grid-cols-container grid rounded-md p-2">
    <div class="flex w-full flex-col items-center justify-start pt-1.5">
      <NuxtLink to="/picture" @click.native="selected = 'picture'">
        <NuxtImg
          :class="{ selected: selected === 'picture' }"
          alt="Maikel E."
          class="picture rounded-full border border-outline-variant bg-surface-container"
          height="60"
          src="/assets/img/picture.webp"
          width="60"
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

<style lang="postcss"></style>
