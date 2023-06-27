<script lang="ts" setup>
const { breadcrumbs, isNotFirstCrumb, isNotCurrentCrumb } = useBreadcrumbs()
</script>

<template>
  <div
    class="flex flex-nowrap items-center py-4 capitalize"
    data-component="breadcrumbs"
  >
    <ul class="flex flex-row items-center">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex flex-row items-center"
      >
        <div v-if="isNotFirstCrumb(crumb)" class="flex flex-row items-center">
          <NuxtLink
            :to="`/${crumb.path}`"
            class="on-surface-variant hover:on-surface-variant/90 rounded-md px-1"
          >
            <Icon class="h-4 w-4" name="fluent:divider-short-16-filled" />
          </NuxtLink>
        </div>
        <div v-if="isNotCurrentCrumb(crumb)" class="flex flex-row items-center">
          <NuxtLink
            :to="`/${crumb.path}`"
            class="on-surface-variant hover:on-surface-variant/90 rounded-md px-1"
          >
            {{ crumb.name }}
          </NuxtLink>
        </div>
        <div v-else class="flex flex-row items-center">
          <span class="rounded-md font-bold text-on-surface-variant/90">
            {{ crumb.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
