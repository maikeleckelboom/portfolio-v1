<template>
  <NuxtLink
    class="grid h-12 w-12 place-items-center rounded-full hover:bg-surface-level-1 focus-visible:bg-surface-level-2 active:bg-surface-level-5"
    to="/"
  >
    <slot>
      <Icon class="h-6 w-6" name="ic:outline-arrow-back" />
    </slot>
  </NuxtLink>
</template>
