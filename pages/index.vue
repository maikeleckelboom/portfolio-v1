<script lang="ts" setup>
import DomainNameLogo from '~/components/DomainNameLogo.vue'
import MaikelSignature from '~/pages/MaikelSignature.vue'
</script>

<template>
  <div
    class="bg-surface-container-lower flex h-16 w-full items-start justify-start"
  >
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-end px-4 py-4"
    >
      <DomainNameLogo />
    </div>
  </div>
  <PageContainer>
    <div class="grid gap-4 px-4 md:grid-cols-2 md:gap-8">
      <div class="mb-4 flex flex-col py-10 md:py-0">
        <ProfileHeroCard />
      </div>
      <div class="flex flex-col">
        <Experiences />
      </div>
    </div>
  </PageContainer>
</template>

<style>
html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}
</style>
