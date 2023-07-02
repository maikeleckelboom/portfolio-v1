<script lang="ts" setup>
const { breadcrumbs, isNotFirstCrumb, isNotCurrentCrumb } = useBreadcrumbs()

const isSmall = useMediaQuery('(min-width: 538px)')
</script>

<template>
  <div
    class="relative z-10 flex w-full flex-nowrap items-center"
    data-component="Breadcrumbs"
  >
    <BreadcrumbsMenu v-if="!isSmall" />
    <ul v-else class="flex w-full flex-row flex-wrap items-center bg-surface">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex flex-row items-center"
      >
        <div v-if="isNotFirstCrumb(crumb)" class="flex-row items-center">
          <NuxtLink
            :to="`/${crumb.path}`"
            class="on-surface-variant hover:on-surface-variant/90 rounded-md px-1"
          >
            <Icon class="h-4 w-4" name="fluent:divider-short-16-filled" />
          </NuxtLink>
        </div>
        <div v-if="isNotCurrentCrumb(crumb)" class="flex-row items-center">
          <NuxtLink
            :to="`/${crumb.path}`"
            class="on-surface-variant hover:on-surface-variant/90 rounded-md px-1"
          >
            {{ crumb.name }}
          </NuxtLink>
        </div>
        <div v-else class="flex flex-row items-center">
          <span
            class="text-shadow-bold-variant rounded-md text-on-surface-variant/90"
          >
            {{ crumb.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss">
.text-shadow-bold-variant {
  text-shadow: 0 1px var(--md-sys-color-on-surface-variant);
}

.text-shadow-bold {
  text-shadow: 0 1px var(--md-sys-color-on-surface);
}
</style>
