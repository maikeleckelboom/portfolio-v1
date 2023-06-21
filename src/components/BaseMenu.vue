<script lang="ts" setup>
type ComponentIcon = {
  name: string
  icon: string
  onClick: () => void
}
const { trailingIcons = [], top } = defineProps<{
  trailingIcons?: ComponentIcon[]
  top?: string
}>()

const emit = defineEmits<{
  clicked: () => void
}>()
</script>

<template>
  <div
    :style="{ top }"
    class="fixed top-[calc(var(--height)_*_0.5_+_24px)] isolate z-40 min-w-[180px] overflow-hidden rounded-md bg-surface-container-high"
    @click="emit('clicked')"
  >
    <div class="flex w-full flex-col flex-nowrap items-center">
      <slot />
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
              {{ icon.name }}
            </span>
          </button>
        </slot>
      </template>
      <DarkToggleButton v-slot="{ mode }">
        {{ mode.value === 'light' ? 'Donkere' : 'Lichte' }} modus
      </DarkToggleButton>
    </div>
  </div>
</template>
