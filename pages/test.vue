<script lang="ts" setup>
const a = ref<HTMLElement>()
const b = ref<HTMLElement>()
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-end px-4 py-4"
    >
      <DomainNameLogo />
    </div>
  </div>
  <div id="connector-container" class=""></div>

  <PageContainer>
    <div class="grid gap-4 px-4">
      <div
        ref="b"
        class="absolute bottom-24 left-20 aspect-square w-40 bg-inverse-primary"
      />
      <div
        ref="a"
        class="absolute left-20 top-24 aspect-square w-40 bg-secondary-container"
      />
    </div>
  </PageContainer>
</template>
