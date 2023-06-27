<script lang="ts" setup></script>

<template>
  <div class="flex h-16 w-full items-start justify-start">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-end px-4 py-4"
    >
      <DomainNameLogo />
    </div>
  </div>
  <PageContainer>
    <div class="grid gap-4 px-4 md:grid-cols-2 md:gap-8">
      <div class="mb-4 flex flex-col pt-4 md:py-0">
        <TheTimeline />
      </div>
      <div class="flex flex-col">Next View</div>
    </div>
  </PageContainer>
</template>
