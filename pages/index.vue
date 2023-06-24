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
      <MaikelSignature class="relative top-0" />

      <DomainNameLogo class=" " />
    </div>
  </div>
  <PageContainer>
    <div class="grid px-4 md:grid-cols-[420px,1fr]">
      <div class="mb-4 flex flex-col">
        <ProfileHeroCard />
      </div>
      <div class="flex flex-col">
        <Experiences />
      </div>
    </div>
    <div class="mt-20 flex w-full flex-col items-center justify-start">
      <!--      <MaikelSignature />-->
    </div>
  </PageContainer>
</template>

<style>
.hand-signature {
}

html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}
</style>
