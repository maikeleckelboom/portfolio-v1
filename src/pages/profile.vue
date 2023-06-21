<script lang="ts" setup>
import ProfileHero from '~/components/ProfileHero.vue'
import BaseButton from '~/components/BaseButton.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
</script>

<template>
  <TopAppHeader>
    <template #leading-icons>
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </template>
    <template #title> Portfolio</template>
  </TopAppHeader>
  <div class="mx-auto w-full max-w-5xl">
    <div class="grid grid-cols-[auto,1fr] gap-3.5 px-2 py-4">
      <div
        class="group relative flex h-full flex-col items-center justify-start pr-3"
      >
        <NuxtLink to="/picture">
          <NuxtImg
            :modifiers="{ grayscale: true, rounded: true }"
            alt="Maikel Eckelboom"
            class="rounded-full border border-surface-container-high bg-surface-container"
            format="webp"
            src="/picture.webp"
            width="80"
          />
        </NuxtLink>
        <div
          class="absolute right-0 top-2 flex h-[60px] w-[1px] rounded-md bg-outline-variant"
        />
      </div>
      <ProfileHero>
        <template #title> Maikel Eckelboom</template>
        <template #subtitle>
          Full-stack developer met een passie voor ontwerp en technologie.
        </template>
        <template #supportingText>
          Dagelijks bezig met ontwikkeling, ontwerp en onderhoud van
          webapplicaties.
        </template>
        <template #button>
          <NuxtLink to="/">
            <BaseButton> Ga Terug</BaseButton>
          </NuxtLink>
        </template>
      </ProfileHero>
    </div>
    <div class="px-2">
      <Breadcrumbs />
    </div>
  </div>
</template>
