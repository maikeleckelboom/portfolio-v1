<script lang="ts" setup>
useHead({
  title: 'Maikel - Portfolio'
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="useColorGradient()" />
    <NuxtPage />
  </NuxtLayout>
  <VitePwaManifest />
</template>

<style lang="postcss">
body {
  @apply bg-background text-on-background;
}

ul:has(.list-disc) {
  //list-style-position: inside;

  .list-disc {
    position: relative;
    list-style: none;

    &:nth-child(odd)::before {
      transform: rotate(0deg);
    }

    &:nth-child(even)::before {
      transform: rotate(45deg) translateY(0px);
    }

    &:nth-child(3n)::before {
      transform: rotate(90deg) translateY(-0px);
    }

    &::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 8px;
      background-image: url('/assets/list-bullet-dark.svg');
      background-size: cover;
      background-repeat: no-repeat;
      height: 8px;
      width: 8px;
      z-index: 20;
    }

    &::marker {
      @apply text-primary;
    }

    &::marker {
      @apply flex items-center justify-center;
    }
  }
}
</style>
