<template>
  <div class="mx-auto flex w-full max-w-2xl flex-col">
    <div>
      <NuxtImg src="/assets/img/domain.svg" />
    </div>
    <div class="grid grid-flow-col-dense grid-rows-[80px] p-4">
      <div class="aspect-square bg-secondary text-on-secondary">
        <p class="grid p-4">Secondary</p>
      </div>
      <div
        class="aspect-square bg-secondary-fixed text-center text-on-secondary-fixed"
      >
        <p class="grid p-4">Secondary Fixed</p>
      </div>
      <div
        class="aspect-square bg-secondary-container text-on-secondary-container"
      >
        <p class="grid p-4">Secondary Container</p>
      </div>
    </div>
    <div class="grid grid-flow-col-dense grid-rows-[80px] p-4">
      <div class="aspect-square bg-tertiary text-on-tertiary">
        <p class="grid p-4">Tertiary</p>
      </div>
      <div
        class="aspect-square bg-tertiary-fixed text-center text-on-tertiary-fixed"
      >
        <p class="p-4">Tertiary Fixed</p>
      </div>
      <div
        class="aspect-square bg-tertiary-container text-on-tertiary-container"
      >
        <p class="grid grid-flow-col-dense p-4">Tertiary Container</p>
      </div>
    </div>
    <div class="grid grid-flow-col-dense grid-rows-[80px] p-4">
      <div class="aspect-square bg-primary text-on-primary">
        <p class="p-4">Primary</p>
      </div>
      <div class="aspect-square bg-primary-container text-on-primary-container">
        <p class="p-4">Primary Container</p>
      </div>
      <div
        class="aspect-square bg-primary-fixed text-center text-on-primary-fixed"
      >
        <p class="p-4">Primary Fixed</p>
      </div>
    </div>
  </div>
</template>
<script setup></script>
