<script lang="ts" setup>
const props = defineProps<{
  dateStart: string
  dateEnd: string
}>()

const period = [props.dateStart, props.dateEnd]
</script>

<template>
  <div class="grid grid-cols-[auto,1fr] gap-1 p-2 pr-2 md:p-2">
    <div class="items-start justify-start py-1">
      <div
        class="mr-2 flex flex-col gap-0.5 border-r pl-2 pr-2 text-end md:gap-0"
      >
        <span
          class="text-end text-label-medium tabular-nums leading-tight text-on-surface-variant md:text-label-large"
        >
          <span class="italic opacity-70">
            {{ period.at(1).split(' ').at(0) }}
          </span>
          {{ period.at(1).split(' ').at(1) }}
        </span>
        <span
          class="text-label-small tabular-nums leading-tight text-on-surface-variant md:text-label-large"
        >
          <span class="italic opacity-70">
            {{ period.at(0).split(' ').at(0) }}
          </span>

          {{ period.at(0).split(' ').at(1) }}
        </span>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="postcss"></style>
