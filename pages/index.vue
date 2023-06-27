<script lang="ts" setup></script>

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
      <div
        id="profile-section"
        class="mb-4 flex flex-col pt-4 md:py-0"
        data-dir="backwards"
      >
        <ProfileHeroCard />
      </div>
      <div id="work-section" class="flex flex-col">
        <TheTimeline />
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
html:not(.is-transitioning) img.selected {
  view-transition-name: picture;
}

html:not(.is-transitioning) #profile-section {
  view-transition-name: profile-section;
}

html:not(.is-transitioning) #work-section {
  view-transition-name: work-section;
}
</style>

<style lang="postcss">
@keyframes slide-to-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes slide-fade-to-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes move-to-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

::view-transition-old(profile-section):only-child {
  animation: slide-fade-to-left 0.5s ease-in-out;
}

::view-transition-new(profile-section):only-child {
  animation: slide-fade-to-left reverse 0.5s ease-in-out;
}

::view-transition-old(work-section):only-child {
  display: none;
}

::view-transition-new(work-section):only-child {
  animation: move-to-right 0.5s ease-in-out;
}

/*::view-transition-new(profile-section) {
  animation: slide-to-left 0.5s ease-in-out;
}*/
</style>
