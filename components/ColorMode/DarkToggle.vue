<script lang="ts" setup>
const mode = useColorMode()

const isDark = computed({
  get: () => mode.value === 'dark',
  set() {
    mode.preference = isDark.value ? 'light' : 'dark'
  }
})

const isAppearanceTransition =
  typeof document !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function toggle(event?: MouseEvent) {
  if (!document.startViewTransition || !isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }

  const { clientX: x, clientY: y } = event
  const { innerWidth, innerHeight } = window

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  document.documentElement.classList.add('is-transitioning')

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath.reverse() : clipPath
      },
      {
        duration: 380,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
  })

  transition.finished.then(() => {
    document.documentElement.classList.remove('is-transitioning')
  })
}

const context = {
  mode,
  isDark,
  toggle
}
</script>

<template>
  <ColorScheme>
    <slot v-bind="context" />
  </ColorScheme>
</template>

<style lang="postcss">
html.is-transitioning {
  &::view-transition-old(root),
  &::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  &::view-transition-old(root) {
    z-index: 1;
  }

  &::view-transition-new(root) {
    z-index: 9999;
  }

  &.dark {
    &::view-transition-old(root) {
      z-index: 9999;
    }

    &::view-transition-new(root) {
      z-index: 1;
    }
  }
}
</style>
