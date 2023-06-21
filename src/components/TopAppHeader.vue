<script lang="ts" setup>
const elTopBar = ref<HTMLElement>()
const { transform, translateY } = useSharedStickyTransform(elTopBar)

const { Placeholder, toggle, hide, visible } = useMenu(
  {
    trailingIcons: []
  },
  {
    emits: {
      onClicked: () => setTimeout(hide, 100)
    }
  }
)
</script>

<template>
  <header
    ref="elTopBar"
    :style="{ transform }"
    class="fixed inset-x-0 top-0 z-20 flex h-[64px] max-h-[128px] w-d-screen py-2"
  >
    <div
      class="mx-auto grid h-full max-w-5xl flex-1 grid-cols-[auto,1fr,auto] gap-6 pl-4 pr-2"
    >
      <div class="flex flex-nowrap items-center">
        <slot name="leading-icons" />
      </div>
      <div class="flex h-full flex-nowrap items-center">
        <span class="pt-1 text-title-medium md:text-title-medium">
          <slot name="title" />
        </span>
        <slot />
      </div>
      <div class="flex flex-nowrap items-center">
        <slot name="trailing-icons" />
        <button
          :class="{ visible }"
          class="flex h-12 w-12 rounded-full p-3 hover:bg-surface-level-1 focus-visible:bg-surface-level-3 active:bg-surface-level-4"
          @click="toggle"
        >
          <Icon
            class="h-6 w-6 text-on-surface-variant"
            name="ic:round-more-vert"
          />
        </button>
      </div>
    </div>
  </header>
  <div class="h-[64px]" />
  <div class="mx-auto flex w-full max-w-5xl justify-end">
    <Placeholder />
  </div>
</template>

<style scoped>
html:not(.is-transitioning) {
  header {
  }
}
</style>
