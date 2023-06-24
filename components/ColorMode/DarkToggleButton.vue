<template>
  <DarkToggle v-slot="{ mode, toggle, isDark }">
    <button
      class="flex h-fit w-fit items-center justify-center rounded-full p-4 hover:bg-surface-level-2"
      @click="toggle"
    >
      <Icon v-if="isDark.value" class="h-6 w-6" name="ic:round-light-mode" />
      <Icon v-else class="h-6 w-6" name="ic:round-dark-mode" />
    </button>
  </DarkToggle>
</template>
