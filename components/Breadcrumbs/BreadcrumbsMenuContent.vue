<script setup lang="ts">
const { isNotCurrentCrumb, breadcrumbs } = useBreadcrumbs()

const emit = defineEmits<{
  (ev: 'close'): void
  (ev: 'open'): void
}>()
</script>

<template>
  <div
    class="absolute left-0 top-0 z-20 flex w-fit min-w-[200px] max-w-fit transform flex-col rounded-b-xl rounded-t-xl bg-surface-container-high"
  >
    <ul class="relative flex flex-col-reverse">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex w-full flex-row items-center truncate whitespace-nowrap capitalize"
      >
        <NuxtLink
          v-if="isNotCurrentCrumb(crumb)"
          :to="`/${crumb.path}`"
          class="flex h-full w-full rounded-xl px-5 py-4 hover:bg-surface-level-1"
        >
          {{ crumb.name }}
        </NuxtLink>
        <button
          v-else
          @click="emit('close')"
          class="group flex h-12 w-fit items-center pl-4 hover:bg-surface-level-1 active:bg-surface-level-2"
        >
          <span class="text-shadow-bold">
            {{ crumb.name }}
          </span>
          <span class="flex h-10 w-10 items-center justify-center">
            <Icon
              class="mt-1 h-6 w-6 rotate-[86deg]"
              name="ic:round-arrow-drop-down"
            />
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
