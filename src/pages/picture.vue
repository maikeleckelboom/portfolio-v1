<template>
  <div class='flex h-auto justify-center bg-on-surface text-surface w-full h-24 z-10 fixed '>
    <NuxtImg
      :modifiers='{ grayscale: true, rounded: true}'
      alt='Maikel Eckelboom'
      class='rounded-full bg-surface-container border-thin border-surface-container-high'
      src='/picture.webp'
      width='280' />
  </div>
  <div class='bg-scrim/20 fixed inset-0 w-full h-full pointer-events-none' />
</template>

<style lang='postcss' scoped>
img {
  view-transition-name: picture;
}
</style>
