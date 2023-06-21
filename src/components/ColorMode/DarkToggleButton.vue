<template>
  <DarkToggle v-slot='{mode, toggle, isDark}'>
    <button
      class='flex w-full flex-row items-center gap-3 p-4 px-6 hover:bg-surface-level-2 '
      @click='toggle'
    >
      <Icon v-if='isDark.value' class='h-6 w-6' name='ic:round-light-mode' />
      <Icon v-else class='h-6 w-6' name='ic:round-dark-mode' />
      <span
        class='w-full flex-1 pt-0.5 text-left text-label-large text-on-surface'
      >
        <slot v-bind='{mode, toggle, isDark}'>
        {{ mode.value === 'light' ? 'Donkere' : 'Lichte' }} modus
        </slot>
      </span>
    </button>
  </DarkToggle>
</template>
