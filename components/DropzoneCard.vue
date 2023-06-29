<template>
  <div
    class="relative grid aspect-square w-[180px] place-content-center overflow-clip rounded-md border border-outline-variant bg-surface-level-1"
  >
    <slot />
    <div class="grid place-items-center gap-2 px-4">
      <Icon
        class="h-12 w-12 text-center text-on-surface-variant"
        name="line-md:upload-outline-loop"
      />
      <p
        class="text-wrap-balance -skew-x-3 text-center text-body-small text-on-surface-variant"
      >
        Click or drop your files here
      </p>
    </div>
  </div>
</template>
