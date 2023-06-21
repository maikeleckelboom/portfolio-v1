<script lang='ts' setup>
const selected = useState()
</script>

<template>
  <PageContainer>
    <div class='grid grid-cols-[auto,1fr] gap-3.5 px-2 py-10'>
      <div class='h-ful flex flex-col items-center justify-start pt-1 border-r pr-2'>
        <NuxtLink to='/picture'
                  @click.native='selected = "picture"'>
          <NuxtImg
            :class='selected === "picture" ? "selected" : "selected"'
            :modifiers='{ grayscale: true, rounded: true}'
            alt='Maikel Eckelboom'
            class='rounded-full bg-surface-container border-thin border-surface-container-high'
            src='/picture.webp'
            width='80' />
        </NuxtLink>
      </div>
      <div>
        <h2 class='mb-1.5 text-headline-small md:text-headline-medium'>
          Maikel Eckelboom
        </h2>
        <p class='mb-0.5 text-bold -skew-x-3 text-on-surface-variant'>
          Full-stack developer met een passie voor ontwerp en technologie.
        </p>
        <p class='mb-0.5 text-on-surface-variant'>
          Dagelijks bezig met ontwikkeling, ontwerp en onderhoud van webapplicaties.
        </p>
      </div>
    </div>
    <DarkToggleButton />
  </PageContainer>
</template>

<style>
img.selected {
  view-transition-name: picture;
}
</style>
