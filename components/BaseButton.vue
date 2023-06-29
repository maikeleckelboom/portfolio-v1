<template>
  <button
    class="group h-[32px] rounded-full border-thin px-2 py-1 text-label-large disabled:pointer-events-none disabled:opacity-60"
  >
    <span class="text-label-large">
      <slot />
    </span>
  </button>
</template>
<script setup></script>
