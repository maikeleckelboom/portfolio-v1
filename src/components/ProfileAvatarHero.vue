<template>
  <div class="grid grid-cols-[auto,1fr] gap-3.5 px-2 py-4">
    <div
      class="h-ful group relative flex flex-col items-center justify-start pr-3"
    >
      <NuxtLink to="/picture">
        <slot
          name="picture"
          v-bind="{
            classes:
              'rounded-full border border-surface-container-high bg-surface-container'
          }"
        />
      </NuxtLink>
      <slot name="after-picture">
        <div
          class="absolute right-0 top-2 flex h-[60px] w-[1px] rounded-md bg-outline-variant"
        />
      </slot>
    </div>
    <ProfileHero>
      <template #title>
        <slot name="title" />
      </template>
      <template #subtitle>
        <slot name="subtitle" />
      </template>
      <template #supportingText>
        <slot name="supportingText" />
      </template>
      <template #button>
        <slot name="button" />
      </template>
    </ProfileHero>
  </div>
</template>
