<script lang="ts" setup>
const elPicture = ref<HTMLElement>()
const router = useRouter()

const goBack = () => {
  router.push('/')
}

onClickOutside(elPicture, goBack)

const { escape } = useMagicKeys()

whenever(escape, goBack)
</script>

<template>
  <div
    class="fixed z-10 mt-4 grid w-full grid-rows-[auto,1fr] place-items-center px-2 py-4 text-surface md:mt-12"
  >
    <div class="relative flex justify-center">
      <NuxtImg
        ref="elPicture"
        :modifiers="{ grayscale: false }"
        alt="Maikel Eckelboom"
        class="max-w-full rounded-full border-1 border-outline-variant bg-surface-container"
        format="webp"
        src="/picture.webp"
        width="360"
      />
    </div>
    <div
      class="relative flex w-full max-w-md flex-col items-center justify-start p-8 text-on-secondary-container"
    >
      <h1 class="mb-2 text-center text-headline-large font-bold">
        Maikel Eckelboom
      </h1>
      <p class="-skew-x-5 text-center text-headline-small text-[balance]">
        "Dagelijks bezig met ontwikkeling, ontwerp en onderhoud van
        webapplicaties."
      </p>
      <div class="mt-14 opacity-70">
        <p class="inline-flex flex-nowrap items-center">
          <Icon
            class="h-8 w-8 rotate-90 text-on-secondary-container opacity-90"
            name="mdi:keyboard-space"
          />
          <span class="mb-0.5 text-title-small">click anywhere to close</span>
          <Icon
            class="h-8 w-8 -rotate-90 text-on-secondary-container opacity-90"
            name="mdi:keyboard-space"
          />
        </p>
      </div>
    </div>
  </div>
  <!--  <div-->
  <!--    id="ambient-backlight"-->
  <!--    class="background-animate fixed z-0 h-screen w-screen bg-gradient-to-b from-primary-container to-surface dark:from-primary-container/20"-->
  <!--  />-->
</template>

<style lang="postcss" scoped>
html:not(.is-transitioning) img {
  view-transition-name: picture;
}
</style>
