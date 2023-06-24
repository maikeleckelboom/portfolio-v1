<script lang="ts" setup>
const elPicture = ref<HTMLElement>()
const router = useRouter()

const goBack = () => {
  router.push('/')
}

onClickOutside(elPicture, goBack)

const { escape } = useMagicKeys()

whenever(escape, goBack)

const maikelQuotes = ref([
  'Dagelijks bezig met ontwikkeling, ontwerp en onderhoud van webapplicaties.'
])
</script>

<template>
  <div
    class="fixed z-10 mt-4 grid w-full grid-rows-[auto,1fr] place-items-center px-2 py-4 text-surface md:mt-12"
  >
    <div class="relative flex justify-center p-1">
      <NuxtImg
        ref="elPicture"
        alt="Maikel Eckelboom"
        class="max-w-full rounded-full border-1 border-outline-variant bg-surface-container"
        preset="picture"
        src="/assets/img/picture.webp"
      />
    </div>
    <div
      class="relative flex w-full max-w-md flex-col items-center justify-start p-8 text-on-secondary-container"
    >
      <h1 class="mb-2 text-center text-headline-large font-bold">
        Maikel Eckelboom
      </h1>
      <p class="-skew-x-5 mb-4 text-center text-headline-small text-[balance]">
        <!-- Quote Slideshow -->

        {{ maikelQuotes[Math.floor(Math.random() * maikelQuotes.length)] }}
      </p>
      <div class="flex flex-nowrap">
        <!-- Socials -->
        <ul class="my-2 grid grid-flow-col-dense">
          <li>
            <a class="p-2" href="https://github.com/">
              <Icon class="h-8 w-8" name="ci:github" />
            </a>
          </li>
          <li>
            <a class="p-2" href="https://www.linkedin.com/in/">
              <Icon class="h-8 w-8" name="ci:linkedin" />
            </a>
          </li>
          <li>
            <a class="p-2" href="https://twitter.com/">
              <Icon class="h-8 w-8" name="ci:twitter" />
            </a>
          </li>
        </ul>
      </div>
      <div class="mt-14 opacity-70">
        <p class="inline-flex flex-nowrap items-center">
          <Icon
            class="h-5 rotate-90 text-on-secondary-container opacity-90"
            name="mdi:keyboard-space"
          />
          <span class="text-title-small">
            Klik <span class="font-bold">ESC</span> om terug te gaan
          </span>
          <Icon
            class="h-5 -rotate-90 text-on-secondary-container opacity-90"
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
