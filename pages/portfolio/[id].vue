<script lang="ts" setup>
const route = useRoute()

const { params } = route
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
      <div id="detail-nav-section" class="flex flex-col">
        <TheTimeline />
      </div>
      <div id="detail-section" class="flex flex-col p-2">
        {{ params.id }}
      </div>
    </div>
  </PageContainer>
</template>

<style lang="postcss">
#detail-nav-section {
  view-transition-name: detail-nav-section;
}

#detail-section {
  view-transition-name: detail-section;
}

@keyframes slide-from-right-to-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-fade-from-right-to-left {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-fade-to-right {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
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

::view-transition-new(detail-section):only-child {
  animation: slide-fade-from-right-to-left 0.5s ease-in-out;
}

::view-transition-new(detail-nav-section):only-child {
  animation: slide-from-right-to-left 0.5s ease-in-out;
}

/** Hide the old view */
::view-transition-old(detail-section):only-child {
  animation: slide-fade-to-right 0.5s ease-in-out;
}

::view-transition-old(detail-nav-section):only-child {
  display: none;
}
</style>
