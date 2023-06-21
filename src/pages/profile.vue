<script lang="ts" setup></script>

<template>
  <TopAppHeader>
    <template #leading-icons>
      <NuxtLink to="/">
        <TheLogo />
      </NuxtLink>
    </template>
    <template #title> Portfolio</template>
  </TopAppHeader>
  <div class="mx-auto w-full max-w-4xl">
    <div class="grid grid-cols-[auto,1fr] gap-3.5 px-2 py-4">
      <ProfileHero>
        <template #title> Maikel Eckelboom</template>
        <template #subtitle>
          Full-stack developer met een passie voor ontwerp en technologie.
        </template>
        <template #supportingText>
          Dagelijks bezig met ontwikkeling, ontwerp en onderhoud van
          webapplicaties.
        </template>
      </ProfileHero>
    </div>
    <div class="p-2">
      <Breadcrumbs />
    </div>
  </div>
</template>
