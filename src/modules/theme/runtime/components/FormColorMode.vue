<script lang="ts" setup>
const {
  public: {
    theme: { options }
  }
} = useRuntimeConfig()
const colorMode = reactive(useColorMode())

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(
  () => colorMode.value === 'dark' || (process.server && options.dark)
)
</script>

<template>
  <button
    class="place-center grid w-fit cursor-pointer grid-flow-col gap-2 rounded-2xl border-thin border-surface-level-1 bg-surface-level-1 px-4 py-2 text-primary hover:bg-surface-level-2 active:bg-surface-level-3"
    v-on:click="toggleColorMode"
  >
    <Icon :name="isDark ? 'ci:sun' : 'ci:moon'" class="h-5 w-5" />
  </button>
</template>
