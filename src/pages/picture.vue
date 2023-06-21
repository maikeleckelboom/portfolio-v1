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
    class="fixed z-10 flex h-full w-full flex-col items-center px-2 py-14 text-surface"
  >
    <div>
      <NuxtImg
        ref="elPicture"
        :modifiers="{ grayscale: false }"
        alt="Maikel Eckelboom"
        class="max-w-full rounded-full border-thin border-surface-container-high bg-surface-container"
        format="webp"
        src="/picture.webp"
        width="360"
      />
    </div>
  </div>
  <div
    id="ambient-backlight"
    class="background-animate fixed z-0 h-screen w-screen bg-gradient-to-b from-primary-container to-surface dark:from-primary-container/20"
  />
</template>

<style lang="postcss" scoped>
html:not(.is-transitioning) img {
  view-transition-name: picture;
}
</style>
