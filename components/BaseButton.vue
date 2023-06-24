<template>
  <button
    class="group h-fit rounded-full border-thin border-outline-variant px-4 py-2 text-label-large hover:bg-surface-level-2 focus-visible:bg-surface-level-4 focus-visible:outline-none active:bg-surface-level-5"
  >
    <span
      class="text-label-large text-on-surface-variant group-hover:text-on-secondary-container"
    >
      <slot />
    </span>
  </button>
</template>
<script setup></script>
