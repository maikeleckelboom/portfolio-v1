<script lang="ts" setup>
import { MenuItem } from '~/types/menu'

const { trailingIcons, top } = defineProps<{
  trailingIcons?: MenuItem[]
  top?: string
  // to be implemented
  anchorElement?: HTMLElement
  // to be implemented
  maxHeight?: number
}>()

const emit = defineEmits<{
  (ev: 'close'): void
}>()
</script>

<template>
  <div
    :style="{ top }"
    class="absolute z-40 min-w-[180px] overflow-hidden rounded-xl bg-surface-container-high"
    @click="emit('close')"
  >
    <div class="flex w-full flex-col flex-nowrap items-center">
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
        <slot />
      </template>
    </div>
  </div>
</template>
