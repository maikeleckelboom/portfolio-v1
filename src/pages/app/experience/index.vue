<script lang="ts" setup></script>

<template>
  <TopAppHeader>
    <template #leading-icons>
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </template>
    <template #title> Portfolio</template>
  </TopAppHeader>
  <PageContainer class="py-2">
    <Experiences />
  </PageContainer>
</template>
