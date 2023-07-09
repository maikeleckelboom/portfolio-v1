<script lang="ts" setup>
const { breadcrumbs, isNotFirstCrumb, isNotCurrentCrumb } = useBreadcrumbs()

const device = useDevice()
</script>

<template>
  <div
    class="relative z-10 flex w-full flex-nowrap items-center"
    data-component="Breadcrumbs"
  >
    <ul class="flex w-full flex-row flex-wrap items-center gap-2">
      <template v-if="device.isDesktopOrTablet">
        <li
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          class="flex flex-row items-center gap-2"
        >
          <div v-if="isNotFirstCrumb(crumb)" class="flex-row items-center">
            <NuxtLink
              :to="`/${crumb.path}`"
              class="on-surface-variant hover:on-surface-variant/90 rounded-md"
            >
              <Icon class="h-4 w-4" name="fluent:divider-short-16-filled" />
            </NuxtLink>
          </div>
          <div v-if="isNotCurrentCrumb(crumb)" class="flex-row items-center">
            <NuxtLink
              :to="`/${crumb.path}`"
              class="on-surface-variant hover:on-surface-variant/90 rounded-md capitalize"
            >
              {{ crumb.name }}
            </NuxtLink>
          </div>
          <div v-else class="flex flex-row items-center">
            <span
              class="text-shadow-bold-variant rounded-md text-on-surface-variant/90 first-letter:uppercase"
            >
              {{ crumb.name }}
            </span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
