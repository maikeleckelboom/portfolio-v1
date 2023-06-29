<script lang="ts" setup>

import {MenuItem} from "~/types/menu";

const { trailingIcons, top } = defineProps<{
  trailingIcons?: MenuItem[]
  top?: string
}>()

const emit = defineEmits<{
  (event: 'clicked'): void
}>()
</script>

<template>
  <div
    :style="{ top }"
    class="absolute top-[calc(var(--height)_*_0.5_+_24px)] isolate z-40 min-w-[180px] overflow-hidden rounded-md bg-surface-container-high"
    @click="emit('clicked')"
  >
    <div class="flex w-full flex-col flex-nowrap items-center">
      <slot name="trigger"/>
      <slot name="content"/>
      <template v-for="icon in trailingIcons">
        <slot :icon="icon" name="trailingIcon">
          <button
            class="flex w-full flex-row items-center gap-3 p-4 px-6 hover:bg-surface-level-2"
            @click="icon.onClick"
          >
            <Icon :name="icon.icon" class="h-6 w-6" />
            <span
              class="w-full flex-1 pt-0.5 text-left text-label-large text-on-surface"
            >
              {{ icon.label }}
            </span>
          </button>
        </slot>
      </template>
      <slot />
    </div>
  </div>
</template>
