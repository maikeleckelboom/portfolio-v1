<template>
  <button class="group flex h-12 w-12 items-center justify-center rounded-full">
    <span
      class="flex h-10 w-10 items-center justify-center rounded-full border border-transparent group-hover:bg-outline-variant/20 group-active:bg-outline-variant/30"
    >
      <slot>
        <Icon class="h-6 w-6" name="ic:round-arrow-drop-down" />
      </slot>
    </span>
  </button>
</template>
<script setup></script>
