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
    :style="{ '--translateY': `-${translateY}px` }"
    class="fixed inset-x-0 top-0 z-20 grid h-[64px] w-screen translate-y-[--translateY] items-center bg-surface"
  >
    <PageContainer>
      <div
        class="relative grid grid-cols-[60px,1fr,auto] items-center overflow-hidden md:grid-cols-[80px,1fr,auto]"
      >
        <div class="flex h-full flex-nowrap items-center">
          <slot name="leading-icons" />
        </div>
        <div class="flex h-full flex-nowrap items-center px-2.5">
          <span
            class="pt-1 text-title-medium text-on-surface-variant md:text-title-medium"
          >
            <slot name="title" />
          </span>
        </div>
        <slot />
        <div class="flex h-full flex-nowrap items-center">
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
    </PageContainer>
  </header>
  <div class="flex h-[64px]" />
  <div class="mx-auto mb-2 flex w-full max-w-4xl justify-end">
    <Placeholder />
  </div>
</template>

<style scoped>
html:not(.is-transitioning) {
  header {
  }
}
</style>
