<template>
  <div>
    <h2 class="mb-0.5 text-headline-small md:text-headline-medium">
      <slot name="title" />
    </h2>
    <p class="text-bold mb-1.5 -skew-x-3 text-on-surface-variant">
      <slot name="subtitle" />
    </p>
    <p class="mb-4 text-on-surface-variant">
      <slot name="supportingText" />
    </p>
    <div class="flex flex-row gap-2">
      <slot name="button" />
    </div>
  </div>
</template>
